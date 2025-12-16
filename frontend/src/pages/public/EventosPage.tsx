import { CalendarDays, Instagram } from "lucide-react";

export default function EventosPage() {
  return (
    <main className="py-10 min-h-screen overflow-hidden bg-[#080414] text-white">
      {/* Deep purple iOS-mirror background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0620] via-[#080414] to-[#06020f]" />

        {/* blobs */}
        <div className="absolute -top-44 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-28 left-8 h-96 w-96 rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -bottom-28 right-0 h-[34rem] w-[34rem] rounded-full bg-indigo-500/12 blur-3xl" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.14]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:84px_84px]" />
        </div>

        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-2xl shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
            <CalendarDays className="h-4 w-4 text-fuchsia-200" />
            <span className="text-xs font-extrabold tracking-[0.25em] text-white/80 uppercase">
              Eventos
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Próximos eventos
          </h1>

          <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed">
            Por el momento no tenemos eventos disponibles para reservar.
          </p>

          <div className="mx-auto mt-8 h-px w-56 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Card message */}
        <div className="mt-10 mx-auto max-w-2xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:p-7 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
            <p className="text-lg font-extrabold text-white">
              Aún no hay eventos
            </p>

            <p className="mt-2 text-sm sm:text-base text-white/70 leading-relaxed">
              Estamos preparando nuevas fechas y sorpresas. Síguenos para ver
              anuncios, lineups y links de reserva apenas salgan.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.instagram.com/bee_concert_club/"
                target="_blank"
                rel="noreferrer"
                className="
                  group inline-flex items-center justify-center gap-2
                  rounded-2xl px-5 py-3
                  border border-white/10
                  bg-white/10
                  backdrop-blur-2xl
                  text-sm sm:text-base font-extrabold tracking-wide
                  hover:bg-white/14
                  transition
                "
              >
                <Instagram className="h-4 w-4 text-fuchsia-200" />
                Ver Instagram
                <span className="inline-block transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <p className="mt-4 text-xs text-white/60">
              Tip: si ya tienes un evento, podemos habilitar tu página + QR + flujo
              completo en minutos (según personalización).
            </p>

            {/* corner glow */}
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-fuchsia-400/15 blur-3xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
