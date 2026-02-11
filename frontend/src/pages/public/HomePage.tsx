import Hero from "../../components/public/Hero";
import Slogan from "../../components/public/Slogan";
import Seo from "../../components/seo/Seo";

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NivuGate",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Software de reservas con QR para eventos, discotecas y locales. Check-in rápido, control de acceso y métricas.",
    brand: {
      "@type": "Brand",
      name: "NivuGate",
    },
  };

  return (
    <div className="text-white">
      <Seo
        title="Reservas con QR para Eventos y Locales"
        description="NivuGate es una app web de reservas con QR para eventos y negocios. Reduce filas, mejora el check-in y controla accesos en segundos."
        path="/"
        keywords={[
          "app de reservas con qr",
          "reservas para eventos",
          "check in qr",
          "control de acceso con qr",
        ]}
        structuredData={structuredData}
      />
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
