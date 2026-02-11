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
      confirmButtonColor: "#0f172a", // slate-900
      cancelButtonColor: "#e2e8f0", // slate-200
      background: "#ffffff",
      color: "#0f172a",
    });

    if (!res.isConfirmed) return;

    authService.logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 font-['Poppins']">
      {/* Light background */}
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
                  <p className="text-sm font-bold tracking-tight text-slate-900">
                    Panel administrativo
                  </p>
                  <p className="text-xs text-slate-500">
                    Nivugate <span className="text-fuchsia-600">by Nivusoftware</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                <Sparkles className="h-3.5 w-3.5 text-fuchsia-600" />
                Accesos rápidos
              </div>

              <button
                onClick={handleLogout}
                className="
                  inline-flex items-center gap-2 rounded-xl
                  border border-slate-200 bg-white
                  px-3 py-2 text-sm font-semibold text-slate-700
                  hover:bg-slate-50 hover:text-slate-900
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
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-7 sm:p-9 shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
                  <span className="text-xs font-extrabold tracking-[0.25em] text-slate-500 uppercase">
                    Dashboard
                  </span>
                </div>

                <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  ¿Qué quieres hacer hoy?
                </h1>
                <p className="mt-2 text-slate-600">
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
                    shadow-[0_18px_45px_rgba(236,72,153,0.35)]
                  "
                >
                  Crear / Ver eventos
                  <span>→</span>
                </NavLink>

                <NavLink
                  to="/admin/reservas"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-2xl border border-slate-200 bg-white
                    px-5 py-3 text-sm font-semibold text-slate-700
                    hover:bg-slate-50 hover:text-slate-900 transition
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
              icon={<CalendarPlus className="h-5 w-5 text-fuchsia-600" />}
              badge="Gestión"
            />

            <ActionCard
              to="/admin/reservas"
              title="Reservas"
              desc="Revisa reservas, estado y control de ingreso."
              icon={<Ticket className="h-5 w-5 text-fuchsia-600" />}
              badge="Operación"
            />

            <ActionCard
              to="/admin/usuarios"
              title="Usuarios"
              desc="Crea usuarios y asigna roles / permisos."
              icon={<Users className="h-5 w-5 text-fuchsia-600" />}
              badge="Seguridad"
            />

            <ActionCard
              href="https://wa.me/0994993430"
              title="Ayuda"
              desc="Guía rápida, flujos y soporte."
              icon={<HelpCircle className="h-5 w-5 text-fuchsia-600" />}
              badge="Soporte"
            />
          </div>

          {/* Footer note */}
          <div className="mt-10 text-xs text-slate-500">
            © 2025 Nivugate · Nivusoftware · Admin
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- UI ---------- */

function ActionCard({
  to,
  href,
  title,
  desc,
  icon,
  badge,
}: {
  to?: string;
  href?: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
}) {
  const className = `
  group relative overflow-hidden rounded-[1.6rem]
  border border-slate-200/80 bg-white p-6
  shadow-[0_14px_35px_rgba(15,23,42,0.10)]
  hover:shadow-[0_18px_50px_rgba(15,23,42,0.15)]
  hover:-translate-y-0.5
  transition
  flex flex-col gap-4
`.trim();


  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-fuchsia-200/40 blur-2xl" />

        <div className="flex items-start justify-between gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white">
            {icon}
          </div>

          <div className="flex items-center gap-2">
            {badge ? (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                {badge}
              </span>
            ) : null}

            <span className="text-slate-400 transition group-hover:text-slate-600 group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </div>

        <div>
          <p className="text-lg font-extrabold tracking-tight text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">{desc}</p>
        </div>
      </a>
    );
  }

  return (
    <NavLink to={to ?? "/admin"} className={className}>
      <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-fuchsia-200/40 blur-2xl" />

      <div className="flex items-start justify-between gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white">
          {icon}
        </div>

        <div className="flex items-center gap-2">
          {badge ? (
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
              {badge}
            </span>
          ) : null}

          <span className="text-slate-400 transition group-hover:text-slate-600 group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>

      <div>
        <p className="text-lg font-extrabold tracking-tight text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </NavLink>
  );
}
