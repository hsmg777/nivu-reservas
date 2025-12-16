import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  Users,
  UserPlus,
  Trash2,
  Search,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { authService } from "../../services/auth";

// Roles backend: "admin" | "user" | "seguridad"
type Role = "admin" | "user" | "seguridad";

type AdminUserDTO = {
  id: number;
  name: string;
  email: string;
  role: Role;
  is_active: boolean;
  created_at?: string;
};

type Mode = "create" | "edit";

const swalDark = {
  background: "#0b0620",
  color: "#ffffff",
  confirmButtonColor: "#d946ef",
  cancelButtonColor: "#334155",
};

export default function AdminUsuariosPage() {
  const [items, setItems] = useState<AdminUserDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  // modal
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("create");
  const [selected, setSelected] = useState<AdminUserDTO | null>(null);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return items;
    return items.filter(
      (u) =>
        u.name.toLowerCase().includes(qq) ||
        u.email.toLowerCase().includes(qq) ||
        u.role.toLowerCase().includes(qq)
    );
  }, [items, q]);

  const title = useMemo(
    () => (mode === "create" ? "Crear usuario" : "Editar usuario"),
    [mode]
  );

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function mapUser(u: any): AdminUserDTO {
    return {
      id: Number(u.id),
      name: String(u.name ?? ""),
      email: String(u.email ?? ""),
      role: (u.role ?? "user") as Role,
      is_active: Boolean(u.is_active ?? true),
      created_at: u.created_at ?? u.createdAt ?? undefined,
    };
  }

  function parseErr(e: any) {
    return e?.message || "Ocurrió un error";
  }

  async function refresh() {
    setLoading(true);
    try {
      const res = await authService.listUsers();

      const list =
        Array.isArray((res as any)?.items)
          ? (res as any).items
          : Array.isArray((res as any)?.users)
          ? (res as any).users
          : Array.isArray(res)
          ? (res as any)
          : [];

      setItems(list.map(mapUser));
    } catch (e: any) {
      Swal.fire({ ...swalDark, title: "Error", text: parseErr(e), icon: "error" });
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setMode("create");
    setSelected(null);
    setOpen(true);
  }

  function openEdit(u: AdminUserDTO) {
    setMode("edit");
    setSelected(u);
    setOpen(true);
  }

  async function onDelete(u: AdminUserDTO) {
    const res = await Swal.fire({
      ...swalDark,
      title: "¿Eliminar usuario?",
      text: `Se eliminará: ${u.name} (${u.email})`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!res.isConfirmed) return;

    try {
      await authService.deleteUser(u.id);
      setItems((prev) => prev.filter((x) => x.id !== u.id));
      Swal.fire({ ...swalDark, title: "Eliminado", text: "Usuario eliminado correctamente", icon: "success" });
    } catch (e: any) {
      Swal.fire({ ...swalDark, title: "Error", text: parseErr(e), icon: "error" });
    }
  }

  async function onSubmit(payload: {
    name: string;
    email: string;
    password?: string;
    role: Role;
    is_active: boolean;
  }) {
    if (mode === "create") {
      try {
        const res = await authService.register({
          name: payload.name,
          email: payload.email,
          password: payload.password || "",
          role: payload.role,
        });

        const created = (res as any)?.user ? (res as any).user : res;
        const mapped = mapUser(created);

        setItems((prev) => [mapped, ...prev]);
        Swal.fire({ ...swalDark, title: "Listo", text: "Usuario creado correctamente", icon: "success" });
        setOpen(false);
        return;
      } catch (e: any) {
        const msg = parseErr(e);
        if (msg === "EMAIL_EXISTS") {
          Swal.fire({ ...swalDark, title: "Error", text: "Ese correo ya existe.", icon: "error" });
        } else if (msg === "FORBIDDEN") {
          Swal.fire({ ...swalDark, title: "Error", text: "No tienes permisos (solo admin).", icon: "error" });
        } else {
          Swal.fire({ ...swalDark, title: "Error", text: msg, icon: "error" });
        }
        return;
      }
    }

    // edit demo
    if (mode === "edit" && selected) {
      setItems((prev) =>
        prev.map((x) =>
          x.id === selected.id
            ? {
                ...x,
                name: payload.name,
                email: payload.email,
                role: payload.role,
                is_active: payload.is_active,
              }
            : x
        )
      );
      Swal.fire({ ...swalDark, title: "Listo", text: "Usuario actualizado (demo)", icon: "info" });
      setOpen(false);
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
                <Users className="h-5 w-5 text-white/85" />
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="/images/nuvem.png"
                  alt="NuvemGate"
                  className="h-9 w-9 object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.55)]"
                  draggable={false}
                />
                <div className="leading-tight">
                  <p className="text-sm font-extrabold tracking-tight">Admin · Usuarios</p>
                  <p className="text-xs text-white/60">
                    NuvemGate <span className="text-fuchsia-200">by Nivusoftware</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={refresh}
                disabled={loading}
                className="
                  inline-flex items-center gap-2 rounded-xl
                  border border-white/10 bg-white/5
                  px-3 py-2 text-sm font-semibold text-white/85
                  hover:bg-white/10 hover:text-white transition
                  disabled:opacity-60
                "
                title="Refrescar"
              >
                <RefreshCcw className="h-4 w-4" />
                {loading ? "..." : "Refrescar"}
              </button>

              <button
                onClick={openCreate}
                className="
                  inline-flex items-center gap-2 rounded-xl
                  border border-fuchsia-300/25 bg-fuchsia-500/15
                  px-3 py-2 text-sm font-extrabold text-white
                  hover:bg-fuchsia-500/20 transition
                "
              >
                <UserPlus className="h-4 w-4" />
                Nuevo usuario
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Usuarios</h1>
              <p className="mt-2 text-white/65">
                Crea usuarios y asigna roles (admin / seguridad / user).
              </p>
            </div>

            <NavLink to="/admin" className="text-sm font-semibold text-white/70 hover:text-white transition">
              ← Volver al panel
            </NavLink>
          </div>

          {/* Search */}
          <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_18px_55px_rgba(0,0,0,0.55)] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <Search className="h-4 w-4 text-white/80" />
                </div>
                <div className="min-w-0">
                  <p className="font-extrabold">Buscar</p>
                  <p className="text-xs text-white/55">Nombre, correo o rol</p>
                </div>
              </div>

              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ej: seguridad, admin@..."
                className="
                  w-full sm:w-[380px]
                  rounded-xl border border-white/10 bg-black/30
                  px-3 py-2 text-sm text-white
                  placeholder:text-white/35
                  outline-none
                  focus:border-fuchsia-300/40 focus:ring-2 focus:ring-fuchsia-300/10
                "
              />
            </div>
          </div>

          {/* List */}
          <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_18px_55px_rgba(0,0,0,0.55)]">
            <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <p className="font-extrabold">Listado</p>
              <span className="text-xs text-white/50">
                {loading ? "Cargando..." : `${filtered.length} usuario(s)`}
              </span>
            </div>

            <div className="p-6">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-8 text-center text-white/60">
                  {loading ? "Cargando..." : "No hay resultados."}
                </div>
              ) : (
                <div className="grid gap-4">
                  {filtered.map((u) => (
                    <div
                      key={u.id}
                      className="
                        rounded-2xl border border-white/10 bg-black/20
                        p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between
                        hover:bg-white/[0.04] transition
                      "
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold truncate text-white">{u.name}</p>
                          <RoleBadge role={u.role} />
                          {!u.is_active && (
                            <span className="text-xs font-bold px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white/70">
                              inactivo
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm text-white/70 truncate">{u.email}</p>

                        <div className="mt-2 text-xs text-white/50 flex flex-wrap gap-x-4 gap-y-1">
                          <span className="inline-flex items-center gap-1">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            permisos por rol
                          </span>
                          <span className="font-mono">id: {u.id}</span>
                          {u.created_at ? (
                            <span>creado: {formatDate(u.created_at)}</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openEdit(u)}
                          className="
                            inline-flex items-center gap-2 rounded-xl
                            border border-white/10 bg-white/5
                            px-3 py-2 text-sm font-semibold text-white/85
                            hover:bg-white/10 hover:text-white transition
                          "
                          title="Editar (demo)"
                        >
                          {/* icon opcional: no importamos Pencil para mantenerlo simple */}
                          Editar
                        </button>

                        <button
                          onClick={() => onDelete(u)}
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
          <UserModal
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

/* ---------- UI bits ---------- */

function RoleBadge({ role }: { role: Role }) {
  const map: Record<Role, { cls: string; label: string }> = {
    admin: {
      cls: "border-fuchsia-300/25 bg-fuchsia-500/12 text-fuchsia-100",
      label: "admin",
    },
    seguridad: {
      cls: "border-amber-300/25 bg-amber-500/12 text-amber-100",
      label: "seguridad",
    },
    user: {
      cls: "border-sky-300/25 bg-sky-500/12 text-sky-100",
      label: "user",
    },
  };

  const tone = map[role] ?? map.user;

  return (
    <span className={`text-xs font-bold px-2 py-1 rounded-full border ${tone.cls}`}>
      {tone.label}
    </span>
  );
}

/* ---------- Modal ---------- */

function UserModal({
  title,
  mode,
  initial,
  onClose,
  onSubmit,
}: {
  title: string;
  mode: Mode;
  initial: AdminUserDTO | null;
  onClose: () => void;
  onSubmit: (payload: {
    name: string;
    email: string;
    password?: string;
    role: Role;
    is_active: boolean;
  }) => Promise<void>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>(initial?.role ?? "user");
  const [isActive, setIsActive] = useState<boolean>(initial?.is_active ?? true);
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (name.trim().length < 2) {
      Swal.fire({ ...swalDark, title: "Validación", text: "Nombre obligatorio (min 2).", icon: "warning" });
      return;
    }
    if (!email.trim().includes("@")) {
      Swal.fire({ ...swalDark, title: "Validación", text: "Correo no válido.", icon: "warning" });
      return;
    }
    if (mode === "create" && password.trim().length < 6) {
      Swal.fire({ ...swalDark, title: "Validación", text: "Contraseña (min 6).", icon: "warning" });
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim() ? password.trim() : undefined,
        role,
        is_active: isActive,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/55" onClick={onClose} />

      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-2xl overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0b0620] text-white shadow-[0_22px_70px_rgba(0,0,0,0.65)]">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <p className="font-extrabold">{title}</p>
            <button
              onClick={onClose}
              className="
                rounded-xl border border-white/10 bg-white/5
                px-3 py-1.5 text-sm font-semibold text-white/85
                hover:bg-white/10 hover:text-white transition
              "
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
                  focus:border-fuchsia-300/40 focus:ring-2 focus:ring-fuchsia-300/10
                "
                placeholder="Nombre..."
              />
            </div>

            <div>
              <label className="text-sm font-bold text-white/85">Correo</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  mt-1 w-full rounded-xl border border-white/10 bg-black/30
                  px-3 py-2 text-white placeholder:text-white/35 outline-none
                  focus:border-fuchsia-300/40 focus:ring-2 focus:ring-fuchsia-300/10
                "
                placeholder="correo@..."
              />
            </div>

            {mode === "create" && (
              <div>
                <label className="text-sm font-bold text-white/85">Contraseña</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="
                    mt-1 w-full rounded-xl border border-white/10 bg-black/30
                    px-3 py-2 text-white placeholder:text-white/35 outline-none
                    focus:border-fuchsia-300/40 focus:ring-2 focus:ring-fuchsia-300/10
                  "
                  placeholder="******"
                />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-bold text-white/85">Rol</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="
                    mt-1 w-full rounded-xl border border-white/10 bg-black/30
                    px-3 py-2 text-white outline-none
                    focus:border-fuchsia-300/40 focus:ring-2 focus:ring-fuchsia-300/10
                  "
                >
                  <option value="admin">admin</option>
                  <option value="seguridad">seguridad</option>
                  <option value="user">user</option>
                </select>
              </div>

              <div className="flex items-end gap-3">
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4 w-4 accent-fuchsia-500"
                  />
                  Activo
                </label>
              </div>
            </div>

            {mode === "edit" && (
              <div className="text-xs text-white/55">
                Editar aún es <b>demo</b>. Si quieres, hacemos endpoint PUT{" "}
                <span className="font-mono">/api/auth/users/:id</span> para actualizar real.
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="
                rounded-xl border border-white/10 bg-white/5
                px-4 py-2 text-sm font-semibold text-white/85
                hover:bg-white/10 hover:text-white transition
              "
            >
              Cancelar
            </button>

            <button
              onClick={submit}
              disabled={saving}
              className="
                rounded-xl border border-fuchsia-300/25 bg-fuchsia-500/15
                px-4 py-2 text-sm font-extrabold text-white
                hover:bg-fuchsia-500/20 transition
                disabled:opacity-60
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

/* ---------- helpers ---------- */

function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}
