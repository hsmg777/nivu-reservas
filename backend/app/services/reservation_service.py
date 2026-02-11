import io
import secrets
import smtplib
from datetime import datetime
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import qrcode
from flask import current_app
from sqlalchemy import update

from ..extensions import db
from ..models import Event, Reservation, ReservationStatus


class ReservationService:
    @staticmethod
    def _generate_code() -> str:
        return secrets.token_hex(16)

    @staticmethod
    def _checkin_url(reservation_code: str) -> str:
        base = (current_app.config.get("PUBLIC_BASE_URL") or "").rstrip("/")
        return f"{base}/checkin/{reservation_code}"

    @staticmethod
    def _qr_png_bytes(data: str) -> bytes:
        img = qrcode.make(data)
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        return buf.getvalue()

    @staticmethod
    def _send_email_with_qr(to_email: str, subject: str, html: str, qr_png: bytes):
        """
        Gmail + Outlook friendly:
        - multipart/related (inline images)
        - multipart/alternative (plain + html)
        - QR inline via CID and also attached as file
        """
        cfg = current_app.config

        server = cfg.get("MAIL_SERVER")
        port = int(cfg.get("MAIL_PORT", 587))
        use_tls = bool(cfg.get("MAIL_USE_TLS", True))
        username = cfg.get("MAIL_USERNAME")
        password = cfg.get("MAIL_PASSWORD")
        sender = cfg.get("MAIL_DEFAULT_SENDER") or username

        if not (server and port and username and password and sender):
            raise RuntimeError("MAIL_CONFIG_MISSING")

        # Root container
        msg = MIMEMultipart("related")
        msg["Subject"] = subject
        msg["From"] = sender
        msg["To"] = to_email

        # Alternative (text + html)
        alt = MIMEMultipart("alternative")
        msg.attach(alt)

        alt.attach(
            MIMEText(
                "Tu invitación está lista. Si no ves el contenido, abre el correo en HTML.",
                "plain",
                "utf-8",
            )
        )
        alt.attach(MIMEText(html, "html", "utf-8"))

        # Inline QR (CID)
        qr_cid = "qr-image"
        img = MIMEImage(qr_png, _subtype="png")
        img.add_header("Content-ID", f"<{qr_cid}>")
        img.add_header("Content-Disposition", "inline", filename="qr.png")
        msg.attach(img)

        # Also attach QR as file (for clients that block inline)
        attach = MIMEImage(qr_png, _subtype="png")
        attach.add_header("Content-Disposition", "attachment", filename="qr.png")
        msg.attach(attach)

        with smtplib.SMTP(server, port) as smtp:
            smtp.ehlo()
            if use_tls:
                smtp.starttls()
                smtp.ehlo()
            smtp.login(username, password)
            smtp.sendmail(sender, [to_email], msg.as_string())

    @staticmethod
    def create_public_reservation(public_code: str, data: dict) -> Reservation:
        ev: Event | None = Event.query.filter_by(public_code=public_code).first()
        if not ev:
            raise ValueError("EVENT_NOT_FOUND")

        now = datetime.utcnow()
        if ev.end_at <= now:
            raise ValueError("EVENT_ENDED")

        if getattr(ev, "status", None) and ev.status.value in ("ended", "cancelled"):
            raise ValueError("EVENT_NOT_AVAILABLE")

        # reservation_code único
        for _ in range(8):
            code = ReservationService._generate_code()
            exists = Reservation.query.filter_by(reservation_code=code).first()
            if not exists:
                break
        else:
            raise ValueError("RESERVATION_CODE_GENERATION_FAILED")

        r = Reservation(
            event_id=ev.id,
            first_name=data["first_name"].strip(),
            last_name=data["last_name"].strip(),
            email=data["email"].strip().lower(),
            phone=data["phone"].strip(),
            instagram=(data.get("instagram") or None),
            reservation_code=code,
            status=ReservationStatus.created,
        )
        db.session.add(r)
        db.session.commit()

        checkin_url = ReservationService._checkin_url(r.reservation_code)
        qr_png = ReservationService._qr_png_bytes(checkin_url)

        # IMPORTANTE: CID fijo que coincide con _send_email_with_qr (qr-image)
        html = f"""
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6fb;padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:640px;max-width:92%;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">

                <!-- Header -->
                <tr>
                  <td style="padding:20px 22px;border-bottom:1px solid #eef2f7;background:#ffffff;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="left">
                          <div style="font-size:18px;font-weight:900;color:#0f172a;line-height:1;">
                            NivuGate 
                          </div>
                          <div style="font-size:12px;color:#64748b;margin-top:4px;">
                            Reservas con QR - by Nivusoftware
                          </div>
                        </td>
                        <td align="right">
                          <div style="display:inline-block;background:#f5f3ff;color:#7c3aed;font-weight:800;font-size:11px;padding:6px 10px;border-radius:999px;border:1px solid #e9d5ff;">
                            QR - 1 SOLO USO
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:22px 22px 10px 22px;color:#0f172a;">
                    <p style="margin:0 0 10px 0;font-size:15px;line-height:1.6;color:#334155;">
                      Hola <b style="color:#0f172a;">{r.first_name} {r.last_name}</b>, tu reserva fue registrada.
                    </p>
                    <p style="margin:0 0 10px 0;font-size:15px;line-height:1.6;color:#334155;">
                      Este es un correo de prueba, al contratar tu plan, el correo será personalizado con los colores y textos de tu marca.
                    </p>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
                      <tr>
                        <td style="padding:14px 14px;">
                          <div style="font-size:11px;letter-spacing:2px;font-weight:800;color:#7c3aed;text-transform:uppercase;">
                            Evento
                          </div>
                          <div style="font-size:18px;font-weight:900;color:#0f172a;margin-top:4px;line-height:1.3;">
                            {ev.name}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:16px 0 12px 0;font-size:14px;line-height:1.6;color:#475569;">
                      Presenta este QR en la entrada:
                    </p>

                    <!-- QR box -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;">
                      <tr>
                        <td align="center" style="padding:16px;">
                          <img src="cid:qr-image" alt="QR NivuGate"
                               width="260" height="260"
                               style="display:block;width:260px;height:260px;border-radius:12px;border:1px solid #e2e8f0;background:#ffffff;padding:10px;" />
                        </td>
                      </tr>
                    </table>

                    <p style="margin:12px 0 0 0;font-size:12px;color:#64748b;line-height:1.5;">
                      *El QR es de un solo uso. Una vez escaneado, queda marcado como utilizado.
                    </p>

                    <!-- Notes -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
                      <tr>
                        <td style="padding:14px 14px;">
                          <div style="font-size:13px;font-weight:900;color:#0f172a;">
                            Recordatorio
                          </div>

                          <div style="margin-top:8px;font-size:13px;line-height:1.6;color:#475569;">
                            - Presenta tu QR al ingreso.<br/>
                            - Tu reserva no garantiza el ingreso si el evento esta a capacidad.<br/>
                            - Cumple las politicas del organizador del evento.
                          </div>

                          <div style="margin-top:10px;color:#334155;">
                            Gracias por confiar en NivuGate.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:14px 22px 18px 22px;">
                    <div style="border-top:1px solid #e2e8f0;padding-top:12px;color:#94a3b8;font-size:11px;line-height:1.5;text-align:center;">
                      Desarrollado por <b style="color:#64748b;">Nivusoftware</b> - @nivu.soft
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
        """

        try:
            ReservationService._send_email_with_qr(
                to_email=r.email,
                subject=f"Tu invitación - {ev.name}",
                html=html,
                qr_png=qr_png,
            )
            r.email_sent_at = datetime.utcnow()
            r.email_send_status = "sent"
            r.email_error = None
        except Exception as e:
            r.email_send_status = "failed"
            r.email_error = str(e)

        db.session.commit()
        return r

    @staticmethod
    def serialize(r: Reservation) -> dict:
        return {
            **r.to_dict(),
            "checkin_url": ReservationService._checkin_url(r.reservation_code),
            "qr_url": f"/api/reservations/{r.id}/qr",
        }

    @staticmethod
    def qr_png_for_reservation(reservation_id: int) -> bytes:
        r: Reservation | None = db.session.get(Reservation, reservation_id)
        if not r:
            raise ValueError("NOT_FOUND")
        checkin_url = ReservationService._checkin_url(r.reservation_code)
        return ReservationService._qr_png_bytes(checkin_url)

    @staticmethod
    def list_by_event(event_id: int) -> list[Reservation]:
        ev = db.session.get(Event, event_id)
        if not ev:
            raise ValueError("EVENT_NOT_FOUND")

        return (
            Reservation.query
            .filter_by(event_id=event_id)
            .order_by(Reservation.created_at.desc())
            .all()
        )

    @staticmethod
    def checkin_atomic(
        reservation_code: str, scanned_by_user_id: int | None
    ) -> tuple[bool, Reservation | None, str]:
        """
        Solo 1 uso:
        UPDATE reservations
        SET used_at=now, status='checked_in'
        WHERE reservation_code=:code AND used_at IS NULL AND status='created'
        """
        now = datetime.utcnow()

        r = Reservation.query.filter_by(reservation_code=reservation_code).first()
        if not r:
            return False, None, "NOT_FOUND"

        ev = db.session.get(Event, r.event_id)
        if not ev:
            return False, r, "EVENT_NOT_FOUND"

        if ev.end_at <= now:
            return False, r, "EVENT_ENDED"

        if getattr(ev, "status", None) and ev.status.value in ("ended", "cancelled"):
            return False, r, "EVENT_NOT_AVAILABLE"

        stmt = (
            update(Reservation)
            .where(Reservation.reservation_code == reservation_code)
            .where(Reservation.used_at.is_(None))
            .where(Reservation.status == ReservationStatus.created)
            .values(
                used_at=now,
                status=ReservationStatus.checked_in,
                scanned_by_user_id=scanned_by_user_id,
                scan_count=Reservation.scan_count + 1,
                last_scan_at=now,
            )
        )

        result = db.session.execute(stmt)
        db.session.commit()

        if result.rowcount == 1:
            updated = Reservation.query.filter_by(reservation_code=reservation_code).first()
            return True, updated, "OK"

        r = Reservation.query.filter_by(reservation_code=reservation_code).first()
        return False, r, "ALREADY_USED"
