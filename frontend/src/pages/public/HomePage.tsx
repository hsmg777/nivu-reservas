import Hero from "../../components/public/Hero";
import Slogan from "../../components/public/Slogan";


export default function HomePage() {
  return (
    <div className="text-white">
      <Hero />
      <Slogan />
      <section className="bg-white text-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase">
            ¿Tienes un evento acercándose?
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Haz que tu entrada se sienta VIP.
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Convierte el caos de la puerta en una experiencia rápida y ordenada
          </p>
        </div>
      </section>
    </div>
  );
}
