import { NavLink } from "react-router-dom";

export default function PublicFooter() {
  return (
    <footer className="relative overflow-hidden bg-purple-900 text-slate-950">
      {/* Soft glows */}
      <div className="pointer-events-none absolute -top-24 left-10 h-72 w-72 rounded-full bg-fuchsia-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-indigo-300/25 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-10">
        {/* Top grid */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="rounded-3xl border border-purple-200/70 bg-white/70 p-6 backdrop-blur-xl shadow-[0_14px_40px_rgba(2,6,23,0.08)]">
              <div className="flex items-center gap-3">
                <img
                  src="/images/nuvem.png"
                  alt="NuvemGate"
                  className="h-12 w-12 object-contain drop-shadow-[0_10px_18px_rgba(2,6,23,0.15)]"
                  draggable={false}
                />
                <div className="leading-tight">
                  <p className="text-lg font-extrabold tracking-tight text-slate-900">
                    NuvemGate
                  </p>
                  <p className="text-xs text-purple-700/80 font-semibold tracking-wide">
                    Reservas con QR
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Reservas rápidas, acceso con QR y una experiencia fluida desde el
                celular hasta la puerta.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-4">
            <div className="rounded-3xl border border-purple-200/70 bg-white/70 p-6 backdrop-blur-xl shadow-[0_14px_40px_rgba(2,6,23,0.08)]">
              <p className="text-sm font-extrabold tracking-[0.2em] text-purple-800/80 uppercase">
                Enlaces rápidos
              </p>

              <div className="mt-4 grid gap-2">
                <FooterLink to="/eventos" label="Eventos" />
                <FooterLink to="/nosotros" label="Nosotros" />
                <FooterLink to="/conciertos" label="Conciertos" />
                <FooterLink to="/politicas" label="Políticas" />
              </div>
            </div>
          </div>

          {/* Follow */}
          <div className="md:col-span-3">
            <div className="rounded-3xl border border-purple-200/70 bg-white/70 p-6 backdrop-blur-xl shadow-[0_14px_40px_rgba(2,6,23,0.08)]">
              <p className="text-sm font-extrabold tracking-[0.2em] text-purple-800/80 uppercase">
                Síguenos
              </p>

              <div className="mt-4 grid gap-2">
                <ExternalLink
                  href="https://www.instagram.com/nivu.soft/"
                  label="Instagram"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div
          className="
            mt-8 flex flex-col gap-3 border-t border-purple-200/70 pt-6
            items-center text-center
            sm:flex-row sm:items-center sm:justify-between sm:text-left
          "
        >
          <p className="text-xs sm:text-sm text-white">
            © 2025 Nivusoftware. Todos los derechos reservados.
          </p>

          <a
            href="https://nivusoftware.com/"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              rounded-full border border-purple-200/70
              bg-white/70 px-4 py-2
              text-xs sm:text-sm text-purple-800/80 font-semibold
              hover:bg-white hover:text-purple-900
              transition
              shadow-[0_10px_26px_rgba(2,6,23,0.08)]
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
    </footer>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className="
        group inline-flex items-center justify-between
        rounded-2xl border border-purple-200/70
        bg-white/60 px-4 py-3
        text-sm font-semibold text-slate-700
        hover:bg-white hover:text-slate-900
        transition
      "
    >
      <span>{label}</span>
      <span className="text-purple-700/70 transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </NavLink>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="
        group inline-flex items-center justify-between
        rounded-2xl border border-purple-200/70
        bg-white/60 px-4 py-3
        text-sm font-semibold text-slate-700
        hover:bg-white hover:text-slate-900
        transition
      "
    >
      <span>{label}</span>
      <span className="text-purple-700/70 transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}
