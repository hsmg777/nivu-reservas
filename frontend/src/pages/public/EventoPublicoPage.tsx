import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import type { EventDTO } from "../../types/event";
import { EventsService } from "../../services/events.service";
import PublicReservaForm from "../../components/public/PublicReservaForm";

import type { ReservationCreatePayload } from "../../types/reservation";
import { ReservationsService } from "../../services/reservations.service";
import { qrBlobToObjectUrl, revokeObjectUrl } from "../../utils/qr";

export default function EventoPublicoPage() {
  const { publicCode } = useParams<{ publicCode: string }>();

  const [event, setEvent] = useState<EventDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      if (!publicCode) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const ev = await EventsService.getPublicByCode(publicCode);
        setEvent(ev);
      } catch (e: any) {
        setEvent(null);
        Swal.fire("Error", e?.message ?? "Evento no encontrado", "error");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [publicCode]);

  async function handleCreateReservation(payload: ReservationCreatePayload) {
    if (!publicCode) return;

    try {
      const reservation = await ReservationsService.createPublic(publicCode, payload);
      const blob = await ReservationsService.getQrBlob(reservation.id);
      const url = qrBlobToObjectUrl(blob);

      await Swal.fire({
        title: "Reserva creada ✅",
        html: `
          <p style="margin:0 0 10px 0;opacity:.85">
            Te enviamos tu QR al correo. También lo tienes aquí:
          </p>
          <div style="display:flex;justify-content:center;">
            <img alt="QR" src="${url}"
              style="width:260px;height:260px;border-radius:16px;border:1px solid #e2e8f0;background:#fff;padding:10px;" />
          </div>
          <p style="margin:10px 0 0 0;font-size:12px;opacity:.7">
            Código: <span style="font-family:monospace;">${reservation.reservation_code}</span>
          </p>
        `,
        showCloseButton: true,
        confirmButtonText: "Cerrar",
        didClose: () => revokeObjectUrl(url),
      });
    } catch (e: any) {
      Swal.fire("Error", e?.message ?? "No se pudo crear la reserva", "error");
    }
  }

  return (
    <section className="relative overflow-hidden bg-white text-slate-900 py-6 font-['Poppins']">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100" />
        <div className="absolute -top-32 left-[-60px] h-80 w-80 rounded-full bg-fuchsia-200/40 blur-3xl" />
        <div className="absolute -bottom-40 right-[-80px] h-[26rem] w-[26rem] rounded-full bg-indigo-200/35 blur-3xl" />
        <div className="absolute top-14 right-20 h-56 w-56 rounded-full bg-purple-200/35 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-12">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 backdrop-blur-2xl shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
              <span className="text-xs font-extrabold tracking-[0.25em] text-slate-500 uppercase">
                Reserva
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              {loading ? "Cargando..." : event?.name ?? "Evento"}
            </h1>

            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              {loading
                ? "Obteniendo datos del evento..."
                : event?.description ??
                  "Escaneaste el QR correcto. Completa el formulario para continuar."}
            </p>

            <div className="mt-4 grid gap-1 text-sm text-slate-500">
              <p className="mt-2 text-xs text-slate-400">
                Recuerda: la reserva no garantiza tu entrada al evento.
              </p>
            </div>
          </div>

          <NavLink
            to="/eventos"
            className="
              shrink-0 inline-flex items-center justify-center
              rounded-2xl px-5 py-3
              border border-slate-200/70
              bg-white/80
              backdrop-blur-2xl
              text-sm font-semibold text-slate-700
              hover:bg-white hover:text-slate-900
              transition
            "
          >
            Volver
          </NavLink>
        </div>

        {/* FORM: protagonista */}
        <div className="mt-10">
          <div className="mx-auto max-w-2xl">
            <Card>
              <h2 className="text-sm font-extrabold tracking-[0.25em] text-slate-600 uppercase">
                Completa tu reserva
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Completa tus datos para generar tu reserva y obtener tu QR.
              </p>

              <div className="mt-6">
                <PublicReservaForm
                  disabled={loading || !event}
                  onSubmit={handleCreateReservation}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- UI bits ---------- */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        rounded-3xl
        border border-slate-200/70
        bg-white/85
        p-6
        backdrop-blur-2xl
        shadow-[0_18px_55px_rgba(15,23,42,0.12)]
      "
    >
      {children}
    </div>
  );
}
