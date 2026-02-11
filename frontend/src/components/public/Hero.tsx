import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
      {/* Video BG */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/nivugate.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Overlays (iOS-ish) */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-6xl flex-col px-6">
        {/* Top spacing (opcional) */}
        <div className="flex-1" />

        <div className="pb-10 sm:pb-12 flex flex-col items-center justify-center text-center gap-5">
          {/* Copy */}
          <div className="max-w-3xl">
            <h1
              className="
                text-white font-extrabold
                text-3xl sm:text-4xl lg:text-5xl
                leading-tight
                drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]
              "
            >
              Menos filas. Más ventas.
            </h1>

            <p
              className="
                mt-3 text-white/90
                text-base sm:text-lg
                drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]
              "
            >
              Reservas con QR para que tus clientes entren rápido y tu negocio fluya sin fricción.
            </p>

            {/* Optional: mini pill highlight */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2
              border border-purple-200/40 bg-white/10 backdrop-blur-xl">
              <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-wide">
                Check-in en segundos • Control y trazabilidad • 24/7
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/eventos")}
              className="
                group inline-flex items-center justify-center gap-3
                rounded-2xl px-7 py-3
                text-sm sm:text-base font-extrabold uppercase
                tracking-[0.2em]
                text-white
                border border-purple-300/90
                bg-white/12
                backdrop-blur-xl backdrop-saturate-150
                shadow-[0_14px_35px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.22)]
                transition-all duration-200
                hover:bg-white/18 hover:border-purple-200/55
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.28),0_0_24px_rgba(253,224,71,0.18)]
                active:scale-[0.99]
              "
            >
              <span>SIMULAR RESERVA</span>

              <span
                className="
                  inline-flex h-8 w-8 items-center justify-center
                  rounded-lg
                  border border-white/18
                  bg-white/10
                  backdrop-blur-xl
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
                  transition-transform duration-200
                  group-hover:translate-x-1
                "
                aria-hidden="true"
              >
                →
              </span>
            </button>

            <button
              onClick={() => navigate("/pricing")}
              className="
                inline-flex items-center justify-center
                rounded-2xl px-6 py-3
                text-sm sm:text-base font-bold
                text-white
                border border-white/25
                bg-white/10
                backdrop-blur-xl
                hover:bg-white/15 transition
              "
            >
              Adquirir app
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
