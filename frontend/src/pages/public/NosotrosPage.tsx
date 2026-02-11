import { NavLink } from "react-router-dom";
import {
  CheckCircle2,
  Globe2,
  QrCode,
  BarChart3,
  ShieldCheck,
  Zap,
  Sparkles,
  PartyPopper,
  Music,
  Utensils,
} from "lucide-react";

export default function NosotrosPage() {
  return (
    <section className="bg-white text-slate-900 font-['Poppins'] py-10">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-14">
        {/* Hero */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase">
            Nosotros
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            NivuGate
            <span className="ml-2 align-top text-base sm:text-lg font-bold text-sky-500">
              by Nivusoftware
            </span>
          </h1>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Reservas con QR para eventos y locales. Rápido, claro y listo para operar.
          </p>
        </div>

        {/* Value cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <StatCard
            title="Reservas con QR"
            desc="Del formulario al control en puerta."
            icon={<QrCode className="h-5 w-5 text-fuchsia-600" />}
          />
          <StatCard
            title="Olvídate de papeles y excel"
            desc="Validación rápida, sin filas ni caos."
            icon={<ShieldCheck className="h-5 w-5 text-fuchsia-600" />}
          />
          <StatCard
            title="Reportería"
            desc="Métricas claras para mejorar eventos."
            icon={<BarChart3 className="h-5 w-5 text-fuchsia-600" />}
          />
        </div>

        {/* Personalization (no card) */}
        <div className="mt-10 max-w-3xl">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Totalmente personalizado a la imagen de tu negocio
          </h2>
          <p className="mt-2 text-slate-600">
            Colores, tipografías y mensajes alineados a tu marca.
          </p>

          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
            <NavLink
              to="/pricing"
              className="
                inline-flex items-center justify-center gap-2
                rounded-xl px-6 py-3
                bg-fuchsia-600 text-white
                text-sm sm:text-base font-extrabold tracking-wide
                hover:bg-fuchsia-500 transition
              "
            >
              Ver planes
              <span className="inline-block">→</span>
            </NavLink>

            <a
              href="https://nivusoftware.com/"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                rounded-xl px-6 py-3
                border border-slate-200 bg-white
                text-sm sm:text-base font-semibold text-slate-700
                hover:bg-slate-50 hover:text-slate-900 transition
              "
            >
              Conoce Nivusoftware
              <span className="inline-block">→</span>
            </a>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-sm font-extrabold tracking-[0.25em] text-slate-500 uppercase">
                Cómo funciona
              </h3>
              <p className="mt-2 text-slate-600">
                Un flujo simple, listo para usar.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Step n="1" title="Formulario" desc="Datos del cliente." />
            <Step n="2" title="QR + Email" desc="Confirmación inmediata." />
            <Step n="3" title="Escaneo" desc="Entrada segura." />
            <Step n="4" title="Control" desc="Reportes clave." />
          </div>
        </div>

        {/* Resto */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-extrabold tracking-[0.25em] text-slate-500 uppercase">
                Hecho para vender más con mejor experiencia
              </h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Feature
                  icon={<PartyPopper className="h-5 w-5 text-fuchsia-600" />}
                  title="Discotecas"
                  desc="Más entradas, menos filas, más exclusividad."
                />
                <Feature
                  icon={<Zap className="h-5 w-5 text-fuchsia-600" />}
                  title="Bares y lounges"
                  desc="Reservas claras, operación rápida."
                />
                <Feature
                  icon={<Music className="h-5 w-5 text-fuchsia-600" />}
                  title="Conciertos y convenciones"
                  desc="Aforo controlado en segundos, entrada rápida."
                />
                <Feature
                  icon={<Zap className="h-5 w-5 text-fuchsia-600" />}
                  title="Festivales y ferias"
                  desc="Accesos por turnos sin caos."
                />
                <Feature
                  icon={<ShieldCheck className="h-5 w-5 text-fuchsia-600" />}
                  title="Fiestas y eventos"
                  desc="Invitados listos, ingreso fluido y privado."
                />
                <Feature
                  icon={<Utensils className="h-5 w-5 text-fuchsia-600" />}
                  title="Restaurantes con eventos"
                  desc="Mejor ocupación y experiencia."
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-extrabold tracking-[0.25em] text-slate-500 uppercase">
                Info rápida
              </h3>

              <div className="mt-5 grid gap-3">
                <InfoRow
                  label="Producto"
                  value="Reservas con QR"
                  icon={<QrCode className="h-4 w-4 text-fuchsia-600" />}
                />
                <InfoRow
                  label="Incluye"
                  value="Hosting + web personalizada"
                  icon={<CheckCircle2 className="h-4 w-4 text-fuchsia-600" />}
                />
                <InfoRow
                  label="Entrega"
                  value="Subdominio / dominio"
                  icon={<Globe2 className="h-4 w-4 text-fuchsia-600" />}
                />
                <InfoRow
                  label="Branding"
                  value="100% a tu marca"
                  icon={<Sparkles className="h-4 w-4 text-fuchsia-600" />}
                />
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <NavLink
                  to="/eventos"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl border border-slate-200 bg-white
                    px-4 py-3 text-sm font-semibold text-slate-700
                    hover:bg-slate-50 hover:text-slate-900 transition
                  "
                >
                  Simular reserva de evento
                  <span>→</span>
                </NavLink>

                <NavLink
                  to="/pricing"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl bg-slate-900 text-white
                    px-4 py-3 text-sm font-extrabold
                    hover:bg-slate-800 transition
                  "
                >
                  Ver precios
                  <span>→</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- UI bits ---------- */

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 hover:bg-slate-50 transition">
      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-slate-200 bg-white p-2">
          {icon}
        </div>
        <div>
          <p className="font-bold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <span className="inline-flex items-center gap-2 text-sm text-slate-600">
        {icon}
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-900 text-right">{value}</span>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-600 text-white font-extrabold">
          {n}
        </div>
        <div className="leading-tight">
          <p className="font-semibold text-slate-900">{title}</p>
          <p className="text-sm text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-slate-200 bg-white p-2">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}
