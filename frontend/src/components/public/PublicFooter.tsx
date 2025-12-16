import { NavLink } from "react-router-dom";
import { Instagram } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#070312] text-white">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0620] via-[#070312] to-[#05010e]" />

        {/* glow blobs */}
        <div className="absolute -top-32 left-[-40px] h-80 w-80 rounded-full bg-fuchsia-500/14 blur-3xl" />
        <div className="absolute -bottom-40 right-[-60px] h-[26rem] w-[26rem] rounded-full bg-purple-500/16 blur-3xl" />
        <div className="absolute top-10 right-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* soft noise-ish grid */}
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>

        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/40" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-10">
        {/* Top callout bar */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
          <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/nuvem.png"
                alt="NivumGate"
                className="h-10 w-10 object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.55)]"
                draggable={false}
              />
              <div className="leading-tight">
                <p className="text-base font-extrabold tracking-tight text-white">
                  NivumGate
                </p>
                <p className="text-xs font-semibold tracking-wide text-fuchsia-200/90">
                  Reservas con QR
                </p>
              </div>
            </div>

            <p className="text-sm text-white/70 sm:max-w-md sm:text-right">
              Reservas rápidas, QR único y control de acceso sin fricción: del
              celular a la puerta.
            </p>
          </div>
        </div>

        {/* Main layout: left content + right brand card */}
        <div className="mt-7 grid gap-6 lg:grid-cols-12">
          {/* Left: links + social */}
          <div className="lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Quick links */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
                <p className="text-xs font-extrabold tracking-[0.25em] text-white/75 uppercase">
                  Enlaces
                </p>

                <div className="mt-4 grid gap-2">
                  <FooterLink to="/eventos" label="Eventos" />
                  <FooterLink to="/pricing" label="Precios" />
                  <FooterLink to="/nosotros" label="Nosotros" />
                  <FooterLink to="/politicas" label="Políticas" />
                </div>
              </div>

              {/* Follow */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
                <p className="text-xs font-extrabold tracking-[0.25em] text-white/75 uppercase">
                  Síguenos
                </p>

                <div className="mt-4 grid gap-2">
                  <ExternalLink
                    href="https://www.instagram.com/nivu.soft/"
                    label="Instagram"
                    icon={<Instagram className="h-4 w-4 text-fuchsia-200" />}
                  />
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm font-semibold text-white/80">
                    ¿Quieres una demo?
                  </p>
                  <p className="mt-1 text-sm text-white/65">
                    Escríbenos y te armamos el flujo completo: formulario → QR →
                    correo → escaneo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: big brand card */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
              {/* inner glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

              <p className="text-xs font-extrabold tracking-[0.25em] text-white/75 uppercase">
                Sobre NivumGate
              </p>

              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Reservas con QR para discotecas, bares, eventos y empresas.
                Genera un QR único por cliente, envíalo por correo y valida el
                acceso escaneando en la entrada.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Badge>QR único</Badge>
                <Badge>Email automático</Badge>
                <Badge>Escaneo en puerta</Badge>
                <Badge>Métricas (según plan)</Badge>
              </div>

              <div className="mt-6">
                <a
                  href="https://nivusoftware.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex w-full items-center justify-center gap-2
                    rounded-2xl border border-white/10
                    bg-white/10 px-4 py-3
                    text-sm font-semibold text-white/90
                    hover:bg-white/15 transition
                  "
                >
                  <span>Desarrollado por Nivusoftware</span>
                  <img
                    src="/images/nuvem.png"
                    alt="Nivusoftware"
                    className="h-4 w-auto opacity-90"
                    draggable={false}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm text-white/65">
            © 2025 Nivusoftware. Todos los derechos reservados.
          </p>

          <div className="text-xs sm:text-sm text-white/55">
            NivumGate · Reservas con QR
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className="
        group inline-flex items-center justify-between
        rounded-2xl border border-white/10
        bg-white/5 px-4 py-3
        text-sm font-semibold text-white/80
        hover:bg-white/10 hover:text-white
        transition
      "
    >
      <span>{label}</span>
      <span className="text-fuchsia-200/80 transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </NavLink>
  );
}

function ExternalLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="
        group inline-flex items-center justify-between
        rounded-2xl border border-white/10
        bg-white/5 px-4 py-3
        text-sm font-semibold text-white/80
        hover:bg-white/10 hover:text-white
        transition
      "
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>

      <span className="text-fuchsia-200/80 transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 px-3 py-2 text-xs font-semibold text-white/75">
      {children}
    </div>
  );
}
