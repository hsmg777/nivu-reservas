import { NavLink } from "react-router-dom";
import {
  CheckCircle2,
  Globe2,
  QrCode,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function NosotrosPage() {
  return (
    <section className="py-10 overflow-hidden bg-[#080414] text-white">
      {/* background (dark, no iOS mirror) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0620] via-[#080414] to-[#06020f]" />
        <div className="absolute -top-40 left-[-120px] h-[32rem] w-[32rem] rounded-full bg-purple-500/18 blur-3xl" />
        <div className="absolute -bottom-44 right-[-120px] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/14 blur-3xl" />
        <div className="absolute top-10 right-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* subtle texture */}
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>

        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-14">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <span className="text-xs font-extrabold tracking-[0.25em] text-white/75 uppercase">
              Nosotros
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            NivumGate
            <span className="ml-2 align-top text-base sm:text-lg font-bold text-fuchsia-200">
              by Nivusoftware
            </span>
          </h1>

          <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed">
            <span className="font-semibold text-white">NivumGate</span> es una
            plataforma web de reservas con{" "}
            <span className="font-semibold text-white">QR único</span> diseñada
            para discotecas, bares, empresas y eventos. Automatiza el proceso
            completo: el cliente llena un formulario, recibe su QR por pantalla
            y por correo, y en la entrada se valida con escaneo en segundos.
            <br />
            <br />
            Desarrollado por{" "}
            <span className="font-semibold text-white">Nivusoftware</span>,
            combinamos experiencia en software a medida con enfoque en
            rendimiento, seguridad y una operación real en puerta (sin
            complicaciones).
          </p>

          {/* CTA strip */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <NavLink
              to="/pricing"
              className="
                inline-flex items-center justify-center gap-2
                rounded-2xl px-6 py-3
                bg-fuchsia-600 text-white
                text-sm sm:text-base font-extrabold tracking-wide
                hover:bg-fuchsia-500 transition
                shadow-[0_18px_55px_rgba(0,0,0,0.45)]
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
                rounded-2xl px-6 py-3
                border border-white/10 bg-white/5
                text-sm sm:text-base font-semibold text-white/85
                hover:bg-white/10 hover:text-white transition
                backdrop-blur-xl
              "
            >
              Conoce Nivusoftware
              <span className="inline-block">→</span>
            </a>
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Left: Value props */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl shadow-[0_18px_55px_rgba(0,0,0,0.45)]">
              <h3 className="text-sm font-extrabold tracking-[0.25em] text-white/80 uppercase">
                ¿Qué hace NivumGate?
              </h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Feature
                  icon={<QrCode className="h-5 w-5 text-fuchsia-200" />}
                  title="QR único por reserva"
                  desc="Cada cliente obtiene un código único para controlar accesos sin fraude."
                />
                <Feature
                  icon={<Zap className="h-5 w-5 text-fuchsia-200" />}
                  title="Automático y rápido"
                  desc="Formulario → confirmación → QR → correo, sin trabajo manual."
                />
                <Feature
                  icon={<ShieldCheck className="h-5 w-5 text-fuchsia-200" />}
                  title="Validación en puerta"
                  desc="Escaneo ágil para evitar filas y asegurar entradas reales."
                />
                <Feature
                  icon={<BarChart3 className="h-5 w-5 text-fuchsia-200" />}
                  title="Métricas (según plan)"
                  desc="Controla reservas, check-ins y comportamiento para mejorar tus eventos."
                />
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-white/70 leading-relaxed">
                  Nuestro enfoque es simple:{" "}
                  <span className="font-semibold text-white">
                    menos filas, más control y mejor experiencia
                  </span>
                  . NivumGate está pensado para operar en el mundo real, con
                  flujos claros para organizadores y personal de ingreso.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Quick info */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl shadow-[0_18px_55px_rgba(0,0,0,0.45)]">
              <h3 className="text-sm font-extrabold tracking-[0.25em] text-white/80 uppercase">
                Info rápida
              </h3>

              <div className="mt-5 grid gap-3">
                <InfoRow
                  label="Producto"
                  value="Reservas con QR (web)"
                  icon={<QrCode className="h-4 w-4 text-fuchsia-200" />}
                />
                <InfoRow
                  label="Incluye"
                  value="Hosting + página web personalizada"
                  icon={<CheckCircle2 className="h-4 w-4 text-fuchsia-200" />}
                />
                <InfoRow
                  label="Entrega"
                  value="Subdominio (y dominio propio en Enterprise)"
                  icon={<Globe2 className="h-4 w-4 text-fuchsia-200" />}
                />
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-white/70 leading-relaxed">
                  <span className="font-semibold text-white">Nivusoftware</span>{" "}
                  desarrolla soluciones a medida y productos SaaS para empresas
                  en Ecuador. NivumGate nace para resolver un problema real:
                  controlar reservas y accesos sin caos.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <NavLink
                  to="/eventos"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-2xl border border-white/10 bg-white/5
                    px-4 py-3 text-sm font-semibold text-white/85
                    hover:bg-white/10 hover:text-white transition
                    backdrop-blur-xl
                  "
                >
                  Ver eventos
                  <span>→</span>
                </NavLink>

                <NavLink
                  to="/pricing"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-2xl bg-white text-slate-900
                    px-4 py-3 text-sm font-extrabold
                    hover:bg-white/90 transition
                  "
                >
                  Ver precios
                  <span>→</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* “How it works” timeline */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl shadow-[0_18px_55px_rgba(0,0,0,0.45)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-sm font-extrabold tracking-[0.25em] text-white/80 uppercase">
                Cómo funciona
              </h3>
              <p className="mt-2 text-white/70">
                Un flujo simple, operativo y listo para producción.
              </p>
            </div>

            <NavLink
              to="/pricing"
              className="text-sm font-semibold text-fuchsia-200 hover:text-fuchsia-100 transition"
            >
              Ver planes →
            </NavLink>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Step n="1" title="Formulario" desc="El cliente completa sus datos." />
            <Step n="2" title="QR + Email" desc="Se genera QR único y se envía al correo." />
            <Step n="3" title="Escaneo" desc="En puerta se valida la reserva al instante." />
            <Step n="4" title="Control" desc="Mide resultados y mejora la logística." />
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
      <div className="flex items-start gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
          {icon}
        </div>
        <div>
          <p className="font-extrabold text-white">{title}</p>
          <p className="mt-1 text-sm text-white/65 leading-relaxed">{desc}</p>
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
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
      <span className="inline-flex items-center gap-2 text-sm text-white/65">
        {icon}
        {label}
      </span>
      <span className="text-sm font-semibold text-white text-right">{value}</span>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-600 text-white font-extrabold">
          {n}
        </div>
        <div className="leading-tight">
          <p className="font-extrabold text-white">{title}</p>
          <p className="text-sm text-white/65">{desc}</p>
        </div>
      </div>
    </div>
  );
}
