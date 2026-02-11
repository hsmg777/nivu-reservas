import { QrCode, Clock3, ShieldCheck, BarChart3, Users, Ticket } from "lucide-react";

const BENEFITS = [
  {
    icon: QrCode,
    title: "QR en segundos",
    desc: "Entrada rapida y sin filas.",
  },
  {
    icon: Ticket,
    title: "Cupos claros",
    desc: "Aforo, horarios y reglas por evento.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad",
    desc: "Codigos unicos y registro por persona.",
  },
  {
    icon: Clock3,
    title: "Menos tareas",
    desc: "Menos Excel, papeles y procesos manuales.",
  },
  {
    icon: BarChart3,
    title: "Ventas medibles",
    desc: "Conversiones y picos en un tablero.",
  },
  {
    icon: Users,
    title: "Proceso organizado",
    desc: "Todo en una misma app.",
  },
];

export default function Slogan() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20">
      {/* Soft purple glows */}
      <div className="pointer-events-none absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-300/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-8 h-96 w-96 rounded-full bg-fuchsia-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(99,102,241,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.22)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-purple-700/70">
            NivuGate - Reservas con QR
          </p>

          <h2 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
            La fila no vende,{" "}
            <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
               La experiencia sí
            </span>
            .
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-slate-600">
            Reservas y acceso con QR en un solo lugar. Ideal para eventos, fiestas, negocios.
          </p>

          {/* Accent line */}
          <div className="mx-auto mt-8 h-px w-56 bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
        </div>

        {/* Benefits grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="
                  group rounded-2xl border border-purple-200/60 bg-white/70
                  p-5 sm:p-6
                  shadow-[0_14px_40px_rgba(2,6,23,0.08)]
                  backdrop-blur-xl
                  transition-transform duration-200
                  hover:-translate-y-0.5
                "
              >
                <div className="flex items-start gap-4">
                  <div
                    className="
                      inline-flex h-11 w-11 items-center justify-center
                      rounded-2xl
                      border border-purple-200/70
                      bg-gradient-to-b from-purple-50 to-white
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]
                    "
                  >
                    <Icon className="h-5 w-5 text-purple-700" />
                  </div>

                  <div className="text-left">
                    <h3 className="text-base font-extrabold text-slate-900">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{b.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}