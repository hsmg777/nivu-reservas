import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  CalendarPlus,
  Ticket,
  HelpCircle,
  LayoutDashboard,
  Users,
  LogOut,
  Sparkles,
} from "lucide-react";

import { authService } from "../../services/auth";

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  async function handleLogout() {
    const res = await Swal.fire({
      title: "Cerrar sesión",
      text: "¿Seguro que deseas salir del panel?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d946ef", // fuchsia-500
      cancelButtonColor: "#334155", // slate-700
      background: "#0b0620",
      color: "#ffffff",
    });

    if (!res.isConfirmed) return;

    authService.logout();
    navigate("/login", { replace: true });
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
                  <p className="text-sm font-bold tracking-tight">
                    Panel administrativo
                  </p>
                  <p className="text-xs text-white/60">
                    NuvemGate <span className="text-fuchsia-200">by Nivusoftware</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70">
                <Sparkles className="h-3.5 w-3.5 text-fuchsia-200" />
                Accesos rápidos
              </div>

              <button
                onClick={handleLogout}
                className="
                  inline-flex items-center gap-2 rounded-xl
                  border border-white/10 bg-white/5
                  px-3 py-2 text-sm font-semibold text-white/85
                  hover:bg-white/10 hover:text-white
                  transition
                "
                title="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto max-w-6xl px-6 py-10">
          {/* Hero */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 sm:p-9 backdrop-blur-2xl shadow-[0_18px_55px_rgba(0,0,0,0.55)]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <span className="text-xs font-extrabold tracking-[0.25em] text-white/70 uppercase">
                    Dashboard
                  </span>
                </div>

                <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
                  ¿Qué quieres hacer hoy?
                </h1>
                <p className="mt-2 text-white/65">
                  Gestiona eventos, reservas y usuarios desde un solo lugar.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <NavLink
                  to="/admin/eventos"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-2xl bg-fuchsia-600 px-5 py-3
                    text-sm font-extrabold text-white
                    hover:bg-fuchsia-500 transition
                    shadow-[0_18px_55px_rgba(0,0,0,0.45)]
                  "
                >
                  Crear / Ver eventos
                  <span>→</span>
                </NavLink>

                <NavLink
                  to="/admin/reservas"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-2xl border border-white/10 bg-white/5
                    px-5 py-3 text-sm font-semibold text-white/85
                    hover:bg-white/10 hover:text-white transition
                  "
                >
                  Ver reservas
                  <span>→</span>
                </NavLink>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ActionCard
              to="/admin/eventos"
              title="Eventos"
              desc="Crea y gestiona eventos, fechas y estado."
              icon={<CalendarPlus className="h-5 w-5 text-fuchsia-200" />}
              badge="Gestión"
            />

            <ActionCard
              to="/admin/reservas"
              title="Reservas"
              desc="Revisa reservas, estado y control de ingreso."
              icon={<Ticket className="h-5 w-5 text-fuchsia-200" />}
              badge="Operación"
            />

            <ActionCard
              to="/admin/usuarios"
              title="Usuarios"
              desc="Crea usuarios y asigna roles / permisos."
              icon={<Users className="h-5 w-5 text-fuchsia-200" />}
              badge="Seguridad"
            />

            <ActionCard
              to="/admin/ayuda"
              title="Ayuda"
              desc="Guía rápida, flujos y soporte."
              icon={<HelpCircle className="h-5 w-5 text-fuchsia-200" />}
              badge="Soporte"
            />
          </div>

          {/* Footer note */}
          <div className="mt-10 text-xs text-white/45">
            © 2025 NuvemGate · Nivusoftware · Admin
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- UI ---------- */

function ActionCard({
  to,
  title,
  desc,
  icon,
  badge,
}: {
  to: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
}) {
  return (
    <NavLink
      to={to}
      className="
        group relative overflow-hidden rounded-[1.6rem]
        border border-white/10 bg-white/[0.06] p-6
        backdrop-blur-2xl
        shadow-[0_14px_35px_rgba(0,0,0,0.55)]
        hover:shadow-[0_18px_50px_rgba(0,0,0,0.65)]
        hover:-translate-y-0.5
        transition
        flex flex-col gap-4
      "
    >
      {/* subtle inner glow */}
      <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-2xl" />

      <div className="flex items-start justify-between gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
          {icon}
        </div>

        <div className="flex items-center gap-2">
          {badge ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-extrabold tracking-widest text-white/70 uppercase">
              {badge}
            </span>
          ) : null}

          <span className="text-white/40 transition group-hover:text-white group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>

      <div>
        <p className="text-lg font-extrabold tracking-tight text-white">{title}</p>
        <p className="mt-1 text-sm text-white/65 leading-relaxed">{desc}</p>
      </div>
    </NavLink>
  );
}
