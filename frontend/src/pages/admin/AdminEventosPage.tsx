import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import {
  CalendarPlus,
  Pencil,
  Trash2,
  QrCode,
  RefreshCcw,
  LayoutDashboard,
} from "lucide-react";

import type { EventDTO, EventCreatePayload, EventUpdatePayload } from "../../types/event";
import { EventsService } from "../../services/events.service";
import { qrBlobToObjectUrl, revokeObjectUrl } from "../../utils/qr";
import { EventAccessService } from "../../services/event-access.service";
import type { EventAccessCodeDTO } from "../../types/event-access";

type Mode = "create" | "edit";

const swalDark = {
  background: "#0b0620",
  color: "#ffffff",
  confirmButtonColor: "#d946ef", // fuchsia-500
  cancelButtonColor: "#334155", // slate-700
};

export default function AdminEventosPage() {
  const [items, setItems] = useState<EventDTO[]>([]);
  const [loading, setLoading] = useState(false);

  // modal state
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("create");
  const [selected, setSelected] = useState<EventDTO | null>(null);

  const title = useMemo(
    () => (mode === "create" ? "Crear evento" : "Editar evento"),
    [mode]
  );

  async function load() {
    setLoading(true);
    try {
      const res = await EventsService.listPublic();
      setItems(res.items);
    } catch (e: any) {
      Swal.fire({ ...swalDark, title: "Error", text: e?.message ?? "No se pudo cargar eventos", icon: "error" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setMode("create");
    setSelected(null);
    setOpen(true);
  }

  function openEdit(ev: EventDTO) {
    setMode("edit");
    setSelected(ev);
    setOpen(true);
  }

  async function onSubmit(payload: EventCreatePayload | EventUpdatePayload) {
    try {
      if (mode === "create") {
        await EventsService.create(payload as EventCreatePayload);
        Swal.fire({ ...swalDark, title: "Listo", text: "Evento creado correctamente", icon: "success" });
      } else if (selected) {
        await EventsService.update(selected.id, payload as EventUpdatePayload);
        Swal.fire({ ...swalDark, title: "Listo", text: "Evento actualizado correctamente", icon: "success" });
      }
      setOpen(false);
      await load();
    } catch (e: any) {
      Swal.fire({ ...swalDark, title: "Error", text: e?.message ?? "No se pudo guardar", icon: "error" });
    }
  }

  async function onDelete(ev: EventDTO) {
    const res = await Swal.fire({
      ...swalDark,
      title: "¿Eliminar evento?",
      text: `Se eliminará: ${ev.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!res.isConfirmed) return;

    try {
      await EventsService.remove(ev.id);
      Swal.fire({ ...swalDark, title: "Eliminado", text: "Evento eliminado correctamente", icon: "success" });
      await load();
    } catch (e: any) {
      Swal.fire({ ...swalDark, title: "Error", text: e?.message ?? "No se pudo eliminar", icon: "error" });
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080414] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0620] via-[#080414] to-[#06020f]" />
        <div className="absolute -top-40 left-[-140px] h-[34rem] w-[34rem] rounded-full bg-purple-500/18 blur-3xl" />
        <div className="absolute -bottom-44 right-[-160px] h-[36rem] w-[36rem] rounded-full bg-fuchsia-500/14 blur-3xl" />
        <div className="absolute top-14 right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      </div>

      <div className="relative">
        {/* Topbar */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080414]/65 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl">
                <LayoutDashboard className="h-5 w-5 text-white/85" />
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="/images/nuvem.png"
                  alt="NuvemGate"
                  className="h-9 w-9 object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.55)]"
                  draggable={false}
                />
                <div className="leading-tight">
                  <p className="text-sm font-bold tracking-tight">Admin · Eventos</p>
                  <p className="text-xs text-white/60">
                    NuvemGate <span className="text-fuchsia-200">by Nivusoftware</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={load}
                className="
                  inline-flex items-center gap-2 rounded-xl
                  border border-white/10 bg-white/5
                  px-3 py-2 text-sm font-semibold text-white/85
                  hover:bg-white/10 hover:text-white transition
                "
                title="Refrescar"
              >
                <RefreshCcw className="h-4 w-4" />
                Refrescar
              </button>

              <button
                onClick={openCreate}
                className="
                  inline-flex items-center gap-2 rounded-xl
                  bg-fuchsia-600 px-3 py-2 text-sm font-extrabold text-white
                  hover:bg-fuchsia-500 transition
                  shadow-[0_18px_55px_rgba(0,0,0,0.45)]
                "
              >
                <CalendarPlus className="h-4 w-4" />
                Nuevo evento
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Eventos</h1>
              <p className="mt-2 text-white/65">
                Listado de eventos creados en el sistema.
              </p>
            </div>

            <NavLink
              to="/admin"
              className="text-sm font-semibold text-white/70 hover:text-white transition"
            >
              ← Volver al panel
            </NavLink>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_18px_55px_rgba(0,0,0,0.55)]">
            <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <p className="font-extrabold">Listado</p>
              <span className="text-xs text-white/55">
                {loading ? "Cargando..." : `${items.length} evento(s)`}
              </span>
            </div>

            <div className="p-6">
              {items.length === 0 && !loading ? (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center text-white/65">
                  No hay eventos todavía. Crea el primero.
                </div>
              ) : (
                <div className="grid gap-4">
                  {items.map((ev) => (
                    <div
                      key={ev.id}
                      className="
                        rounded-2xl border border-white/10 bg-white/[0.05]
                        p-5 flex flex-col gap-3
                        sm:flex-row sm:items-center sm:justify-between
                        hover:bg-white/[0.07] transition
                      "
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold truncate">{ev.name}</p>
                          <StatusBadge status={ev.status} />
                        </div>

                        <p className="mt-1 text-sm text-white/65 line-clamp-2">
                          {ev.description ?? "—"}
                        </p>

                        <div className="mt-2 text-xs text-white/55 flex flex-wrap gap-x-4 gap-y-1">
                          <span>Inicio: {formatDate(ev.start_at)}</span>
                          <span>Fin: {formatDate(ev.end_at)}</span>
                          <span className="font-mono">code: {ev.public_code}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <QrButton eventId={ev.id} />
                        <AccessQrButton eventId={ev.id} />

                        <button
                          onClick={() => openEdit(ev)}
                          className="
                            inline-flex items-center gap-2 rounded-xl
                            border border-white/10 bg-white/5
                            px-3 py-2 text-sm font-semibold text-white/85
                            hover:bg-white/10 hover:text-white transition
                          "
                        >
                          <Pencil className="h-4 w-4" />
                          Editar
                        </button>

                        <button
                          onClick={() => onDelete(ev)}
                          className="
                            inline-flex items-center gap-2 rounded-xl
                            border border-rose-400/25 bg-rose-500/10
                            px-3 py-2 text-sm font-semibold text-rose-100
                            hover:bg-rose-500/15 transition
                          "
                        >
                          <Trash2 className="h-4 w-4" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 text-xs text-white/45">© 2025 NuvemGate · Nivusoftware · Admin</div>
        </main>

        {open && (
          <EventModal
            title={title}
            mode={mode}
            initial={selected}
            onClose={() => setOpen(false)}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
}

/* ----------------- Components ----------------- */

function StatusBadge({ status }: { status: EventDTO["status"] }) {
  const map: Record<string, string> = {
    draft: "bg-white/5 text-white/75 border-white/10",
    active: "bg-emerald-500/10 text-emerald-100 border-emerald-400/20",
    ended: "bg-sky-500/10 text-sky-100 border-sky-400/20",
    cancelled: "bg-rose-500/10 text-rose-100 border-rose-400/20",
  };

  return (
    <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${map[status] ?? map.draft}`}>
      {status}
    </span>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function QrButton({ eventId }: { eventId: number }) {
  const [busy, setBusy] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => revokeObjectUrl(imgUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function openQr() {
    setBusy(true);
    try {
      const blob = await EventsService.getQrBlob(eventId);
      const url = qrBlobToObjectUrl(blob);

      revokeObjectUrl(imgUrl);
      setImgUrl(url);

      await Swal.fire({
        ...swalDark,
        title: "QR del evento",
        html: `
          <div style="display:flex;justify-content:center;">
            <div style="padding:14px;border-radius:18px;border:1px solid rgba(255,255,255,0.10);background:rgba(255,255,255,0.05);">
              <img alt="QR" src="${url}" style="width:260px;height:260px;border-radius:14px;"/>
            </div>
          </div>
        `,
        showCloseButton: true,
        confirmButtonText: "Cerrar",
      });
    } catch (e: any) {
      Swal.fire({ ...swalDark, title: "Error", text: e?.message ?? "No se pudo generar QR", icon: "error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={openQr}
      disabled={busy}
      className="
        inline-flex items-center gap-2 rounded-xl
        border border-white/10 bg-white/5
        px-3 py-2 text-sm font-semibold text-white/85
        hover:bg-white/10 hover:text-white transition
        disabled:opacity-60
      "
      title="Ver QR"
    >
      <QrCode className="h-4 w-4" />
      {busy ? "QR..." : "QR"}
    </button>
  );
}

function AccessQrButton({ eventId }: { eventId: number }) {
  const [busy, setBusy] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => revokeObjectUrl(imgUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function openAccessQr() {
    setBusy(true);

    try {
      const list = await EventAccessService.listByEvent(eventId);
      const access: EventAccessCodeDTO =
        list.items?.[0] ??
        (await EventAccessService.create(eventId, { label: "Acceso ilimitado" }));

      const blob = await EventAccessService.getQrBlob(eventId, access.id);
      const url = qrBlobToObjectUrl(blob);

      revokeObjectUrl(imgUrl);
      setImgUrl(url);

      const accessUrlToCopy = access.access_url;

      await Swal.fire({
        ...swalDark,
        title: "QR acceso ilimitado",
        html: `
          <div style="display:grid;gap:12px;justify-items:center;">
            <div style="padding:14px;border-radius:18px;border:1px solid rgba(255,255,255,0.10);background:rgba(255,255,255,0.05);">
              <img alt="QR" src="${url}" style="width:260px;height:260px;border-radius:14px;"/>
            </div>

            <div style="width:100%;text-align:left;font-size:12px;color:rgba(255,255,255,0.75);">
              <div><b style="color:#fff;">label:</b> ${access.label ?? "—"}</div>
              <div style="margin-top:4px;">
                <b style="color:#fff;">code:</b>
                <span style="font-family:ui-monospace, SFMono-Regular, Menlo, monospace;">
                  ${access.access_code}
                </span>
              </div>

              <div style="margin-top:10px;"><b style="color:#fff;">url:</b></div>
              <div style="word-break:break-all;color:#fff;opacity:0.92;">${accessUrlToCopy}</div>

              <button id="copy-access-url"
                style="margin-top:12px;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.10);background:rgba(255,255,255,0.06);color:#fff;font-weight:800;cursor:pointer;">
                Copiar link
              </button>
            </div>
          </div>
        `,
        showCloseButton: true,
        confirmButtonText: "Cerrar",
        didOpen: () => {
          const btn = document.getElementById("copy-access-url");
          if (!btn) return;

          const handler = async () => {
            try {
              await navigator.clipboard.writeText(accessUrlToCopy);
              Swal.showValidationMessage("✅ Link copiado");
              setTimeout(() => Swal.resetValidationMessage(), 900);
            } catch {
              Swal.showValidationMessage("No se pudo copiar automáticamente 😅");
              setTimeout(() => Swal.resetValidationMessage(), 900);
            }
          };

          btn.addEventListener("click", handler);

          Swal.getPopup()?.addEventListener(
            "remove",
            () => btn.removeEventListener("click", handler),
            { once: true }
          );
        },
      });
    } catch (e: any) {
      Swal.fire({ ...swalDark, title: "Error", text: e?.message ?? "No se pudo generar el QR ilimitado", icon: "error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={openAccessQr}
      disabled={busy}
      className="
        inline-flex items-center gap-2 rounded-xl
        border border-white/10 bg-white/5
        px-3 py-2 text-sm font-semibold text-white/85
        hover:bg-white/10 hover:text-white transition
        disabled:opacity-60
      "
      title="QR ilimitado (acceso)"
    >
      <QrCode className="h-4 w-4" />
      {busy ? "Acceso..." : "QR Acceso"}
    </button>
  );
}

/* ----------------- Modal ----------------- */

function EventModal({
  title,
  mode,
  initial,
  onClose,
  onSubmit,
}: {
  title: string;
  mode: Mode;
  initial: EventDTO | null;
  onClose: () => void;
  onSubmit: (payload: EventCreatePayload | EventUpdatePayload) => Promise<void>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [startAt, setStartAt] = useState(toLocalInput(initial?.start_at) ?? "");
  const [endAt, setEndAt] = useState(toLocalInput(initial?.end_at) ?? "");
  const [status, setStatus] = useState<EventDTO["status"]>(initial?.status ?? "draft");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (name.trim().length < 2) {
      Swal.fire({ ...swalDark, title: "Validación", text: "El nombre es obligatorio (min 2).", icon: "warning" });
      return;
    }
    if (!startAt || !endAt) {
      Swal.fire({ ...swalDark, title: "Validación", text: "start_at y end_at son obligatorios.", icon: "warning" });
      return;
    }
    if (new Date(endAt) <= new Date(startAt)) {
      Swal.fire({ ...swalDark, title: "Validación", text: "La fecha fin debe ser mayor a la de inicio.", icon: "warning" });
      return;
    }

    setSaving(true);
    try {
      const payloadBase = {
        name: name.trim(),
        description: description.trim() ? description.trim() : null,
        start_at: new Date(startAt).toISOString(),
        end_at: new Date(endAt).toISOString(),
        status,
      };

      if (mode === "create") await onSubmit(payloadBase as EventCreatePayload);
      else await onSubmit(payloadBase as EventUpdatePayload);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/55" onClick={onClose} />

      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-2xl rounded-[1.6rem] border border-white/10 bg-[#0b0620]/95 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.70)]">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <p className="font-extrabold text-white">{title}</p>
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              Cerrar
            </button>
          </div>

          <div className="p-6 grid gap-4">
            <div>
              <label className="text-sm font-bold text-white/85">Nombre</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  mt-1 w-full rounded-xl border border-white/10 bg-black/30
                  px-3 py-2 text-white placeholder:text-white/35 outline-none
                  focus:border-fuchsia-300/40 focus:ring-2 focus:ring-fuchsia-300/10 transition
                "
                placeholder="Concierto..."
              />
            </div>

            <div>
              <label className="text-sm font-bold text-white/85">Descripción</label>
              <textarea
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
                className="
                  mt-1 w-full min-h-[90px] rounded-xl border border-white/10 bg-black/30
                  px-3 py-2 text-white placeholder:text-white/35 outline-none
                  focus:border-fuchsia-300/40 focus:ring-2 focus:ring-fuchsia-300/10 transition
                "
                placeholder="Detalles del evento..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-bold text-white/85">Fecha inicio</label>
                <input
                  type="datetime-local"
                  value={startAt}
                  onChange={(e) => setStartAt(e.target.value)}
                  className="
                    mt-1 w-full rounded-xl border border-white/10 bg-black/30
                    px-3 py-2 text-white outline-none
                    focus:border-fuchsia-300/40 focus:ring-2 focus:ring-fuchsia-300/10 transition
                  "
                />
              </div>

              <div>
                <label className="text-sm font-bold text-white/85">Fecha fin</label>
                <input
                  type="datetime-local"
                  value={endAt}
                  onChange={(e) => setEndAt(e.target.value)}
                  className="
                    mt-1 w-full rounded-xl border border-white/10 bg-black/30
                    px-3 py-2 text-white outline-none
                    focus:border-fuchsia-300/40 focus:ring-2 focus:ring-fuchsia-300/10 transition
                  "
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-bold text-white/85">Estado</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="
                    mt-1 w-full rounded-xl border border-white/10 bg-black/30
                    px-3 py-2 text-white outline-none
                    focus:border-fuchsia-300/40 focus:ring-2 focus:ring-fuchsia-300/10 transition
                  "
                >
                  <option value="draft">draft</option>
                  <option value="active">active</option>
                  <option value="ended">ended</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>

              <div className="text-xs text-white/55 flex items-end">
                <p>
                  El QR se genera desde el backend usando el <b className="text-white">public_code</b>.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="
                rounded-xl border border-white/10 bg-white/5
                px-4 py-2 text-sm font-semibold text-white/80
                hover:bg-white/10 hover:text-white transition
              "
            >
              Cancelar
            </button>

            <button
              onClick={submit}
              disabled={saving}
              className="
                rounded-xl bg-fuchsia-600 px-4 py-2 text-sm font-extrabold text-white
                hover:bg-fuchsia-500 transition disabled:opacity-60
              "
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function toLocalInput(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}
