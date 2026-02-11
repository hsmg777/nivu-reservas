import { NavLink } from "react-router-dom";
import { Instagram } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-900 font-['Poppins']">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/nuvem.png"
                alt="NivuGate"
                className="h-9 w-9 object-contain"
                draggable={false}
              />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-900">NivuGate</p>
                <p className="text-xs text-slate-500">Reservas con QR</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Reservas rápidas con QR para eventos y locales.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">
              Enlaces
            </p>
            <div className="mt-3 grid gap-2">
              <FooterLink to="/eventos" label="Eventos" />
              <FooterLink to="/pricing" label="Precios" />
              <FooterLink to="/nosotros" label="Nosotros" />
              <FooterLink to="/politicas" label="Políticas" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">
              Síguenos
            </p>
            <div className="mt-3 grid gap-2">
              <ExternalLink
                href="https://www.instagram.com/nivu.soft/"
                label="Instagram"
                icon={<Instagram className="h-4 w-4 text-fuchsia-600" />}
              />
            </div>
            <p className="mt-3 text-xs text-slate-500">DM para demo.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm text-slate-500">
            © {new Date().getFullYear()} NIVUGATE TODOS LOS DERECHOS RESERVADOS
          </p>

          <a
            href="https://nivusoftware.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-700 transition"
          >
            <img
              src="/images/logo_nube.png"
              alt="Nivusoftware"
              className="h-4 w-4 object-contain"
              draggable={false}
            />
            <span>Desarrollado por Nivusoftware</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to} className="text-sm text-slate-600 hover:text-slate-900 transition">
      {label}
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
      className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition"
    >
      {icon}
      {label}
    </a>
  );
}
