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
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 font-['Poppins']">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100" />
        <div className="absolute -top-32 left-[-60px] h-[30rem] w-[30rem] rounded-full bg-fuchsia-200/35 blur-3xl" />
        <div className="absolute -bottom-40 right-[-80px] h-[28rem] w-[28rem] rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute top-14 right-20 h-56 w-56 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
      </div>

      <div className="relative">
        {/* Topbar */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white">
                <LayoutDashboard className="h-5 w-5 text-slate-700" />
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="/images/nuvem.png"
                  alt="Nivugate"
                  className="h-9 w-9 object-contain drop-shadow-[0_8px_16px_rgba(15,23,42,0.12)]"
                  draggable={false}
                />
                <div className="leading-tight">
                  <p className="text-sm font-bold tracking-tight text-slate-900">Admin · Eventos</p>
                  <p className="text-xs text-slate-500">
                    Nivugate <span className="text-fuchsia-600">by Nivusoftware</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={load}
                className="
                  inline-flex items-center gap-2 rounded-xl
                  border border-slate-200 bg-white
                  px-3 py-2 text-sm font-semibold text-slate-700
                  hover:bg-slate-50 hover:text-slate-900 transition
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
                  shadow-[0_16px_40px_rgba(236,72,153,0.35)]
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
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Eventos</h1>
              <p className="mt-2 text-slate-600">
                Listado de eventos creados en el sistema.
              </p>
            </div>

            <NavLink
              to="/admin"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              ← Volver al panel
            </NavLink>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
            <div className="border-b border-slate-200/80 px-6 py-4 flex items-center justify-between">
              <p className="font-extrabold text-slate-900">Listado</p>
              <span className="text-xs text-slate-500">
                {loading ? "Cargando..." : `${items.length} evento(s)`}
              </span>
            </div>

            <div className="p-6">
              {items.length === 0 && !loading ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
                  No hay eventos todavía. Crea el primero.
                </div>
              ) : (
                <div className="grid gap-4">
                  {items.map((ev) => (
                    <div
                      key={ev.id}
                      className="
                        rounded-2xl border border-slate-200/80 bg-white
                        p-5 flex flex-col gap-3
                        sm:flex-row sm:items-center sm:justify-between
                        hover:bg-slate-50 transition
                      "
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold truncate text-slate-900">{ev.name}</p>
                          <StatusBadge status={ev.status} />
                        </div>

                        <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                          {ev.description ?? "—"}
                        </p>

                        <div className="mt-2 text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
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
                            border border-slate-200 bg-white
                            px-3 py-2 text-sm font-semibold text-slate-700
                            hover:bg-slate-50 hover:text-slate-900 transition
                          "
                        >
                          <Pencil className="h-4 w-4" />
                          Editar
                        </button>

                        <button
                          onClick={() => onDelete(ev)}
                          className="
                            inline-flex items-center gap-2 rounded-xl
                            border border-rose-200 bg-rose-50
                            px-3 py-2 text-sm font-semibold text-rose-700
                            hover:bg-rose-100 transition
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

          <div className="mt-10 text-xs text-slate-500">© 2025 Nivugate · Nivusoftware · Admin</div>
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
    draft: "bg-slate-100 text-slate-600 border-slate-200",
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ended: "bg-sky-50 text-sky-700 border-sky-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
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
            <div style="padding:14px;border-radius:18px;border:1px solid rgba(226,232,240,0.9);background:#fff;">
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
        border border-slate-200 bg-white
        px-3 py-2 text-sm font-semibold text-slate-700
        hover:bg-slate-50 hover:text-slate-900 transition
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
            <div style="padding:14px;border-radius:18px;border:1px solid rgba(226,232,240,0.9);background:#fff;">
              <img alt="QR" src="${url}" style="width:260px;height:260px;border-radius:14px;"/>
            </div>

            <div style="width:100%;text-align:left;font-size:12px;color:#475569;">
              <div><b style="color:#0f172a;">label:</b> ${access.label ?? "—"}</div>
              <div style="margin-top:4px;">
                <b style="color:#0f172a;">code:</b>
                <span style="font-family:ui-monospace, SFMono-Regular, Menlo, monospace;">
                  ${access.access_code}
                </span>
              </div>

              <div style="margin-top:10px;"><b style="color:#0f172a;">url:</b></div>
              <div style="word-break:break-all;color:#0f172a;opacity:0.92;">${accessUrlToCopy}</div>

              <button id="copy-access-url"
                style="margin-top:12px;padding:10px 12px;border-radius:12px;border:1px solid #e2e8f0;background:#fff;color:#0f172a;font-weight:800;cursor:pointer;">
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
        border border-slate-200 bg-white
        px-3 py-2 text-sm font-semibold text-slate-700
        hover:bg-slate-50 hover:text-slate-900 transition
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
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />

      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-2xl rounded-[1.6rem] border border-slate-200/80 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.20)]">
          <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between">
            <p className="font-extrabold text-slate-900">{title}</p>
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
            >
              Cerrar
            </button>
          </div>

          <div className="p-6 grid gap-4">
            <div>
              <label className="text-sm font-bold text-slate-700">Nombre</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  mt-1 w-full rounded-xl border border-slate-200/80 bg-white
                  px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none
                  focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-200/50 transition
                "
                placeholder="Concierto..."
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">Descripción</label>
              <textarea
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
                className="
                  mt-1 w-full min-h-[90px] rounded-xl border border-slate-200/80 bg-white
                  px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none
                  focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-200/50 transition
                "
                placeholder="Detalles del evento..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-bold text-slate-700">Fecha inicio</label>
                <input
                  type="datetime-local"
                  value={startAt}
                  onChange={(e) => setStartAt(e.target.value)}
                  className="
                    mt-1 w-full rounded-xl border border-slate-200/80 bg-white
                    px-3 py-2 text-slate-900 outline-none
                    focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-200/50 transition
                  "
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">Fecha fin</label>
                <input
                  type="datetime-local"
                  value={endAt}
                  onChange={(e) => setEndAt(e.target.value)}
                  className="
                    mt-1 w-full rounded-xl border border-slate-200/80 bg-white
                    px-3 py-2 text-slate-900 outline-none
                    focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-200/50 transition
                  "
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-bold text-slate-700">Estado</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="
                    mt-1 w-full rounded-xl border border-slate-200/80 bg-white
                    px-3 py-2 text-slate-900 outline-none
                    focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-200/50 transition
                  "
                >
                  <option value="draft">draft</option>
                  <option value="active">active</option>
                  <option value="ended">ended</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>

              <div className="text-xs text-slate-500 flex items-end">
                <p>
                  El QR se genera desde el backend usando el <b className="text-slate-700">public_code</b>.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-200/80 flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="
                rounded-xl border border-slate-200 bg-white
                px-4 py-2 text-sm font-semibold text-slate-700
                hover:bg-slate-50 hover:text-slate-900 transition
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
