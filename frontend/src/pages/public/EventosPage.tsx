import { useEffect, useState } from "react";
import { CalendarDays, Instagram } from "lucide-react";
import { EventsService } from "../../services/events.service";
import type { EventDTO } from "../../types/event";
import Seo from "../../components/seo/Seo";

export default function EventosPage() {
  const [events, setEvents] = useState<EventDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await EventsService.listPublic();
        if (!mounted) return;
        setEvents(res.items ?? []);
        setError(null);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : "No se pudieron cargar eventos.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const formatDate = (value: string) =>
    new Date(value).toLocaleString("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const now = Date.now();
  const visibleEvents = events.filter((ev) => {
    const start = new Date(ev.start_at).getTime();
    const end = new Date(ev.end_at).getTime();
    if (Number.isNaN(start) || Number.isNaN(end)) return false;
    return start <= now && now <= end;
  });

  return (
    <main className="relative w-full py-10 min-h-screen overflow-hidden bg-[#f9f7ff] text-slate-900 font-['Poppins']">
      <Seo
        title="Eventos con Reserva QR"
        description="Explora eventos activos y simula el flujo completo de reserva con QR. Prueba el check-in y la experiencia de acceso de NivuGate."
        path="/eventos"
        keywords={[
          "eventos con reserva qr",
          "reserva de entradas con qr",
          "check in para eventos",
          "simular reserva evento",
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Eventos | NivuGate",
          description:
            "Catalogo de eventos publicos para probar reservas con QR y flujo de check-in digital.",
        }}
      />
      {/* Light inverted background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#f7f5ff] to-[#eef2ff]" />

        {/* blobs */}
        <div className="absolute -top-44 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-indigo-200/60 blur-3xl" />
        <div className="absolute top-28 left-8 h-96 w-96 rounded-full bg-rose-200/60 blur-3xl" />
        <div className="absolute -bottom-28 right-0 h-[34rem] w-[34rem] rounded-full bg-sky-200/60 blur-3xl" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.25]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(15,23,42,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.10)_1px,transparent_1px)] bg-[size:84px_84px]" />
        </div>

        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.85),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-slate-200/40" />
      </div>

      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-24 sm:pt-28 pb-16">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 backdrop-blur-2xl shadow-[0_14px_40px_rgba(15,23,42,0.12)]">
            <CalendarDays className="h-4 w-4 text-rose-500" />
            <span className="text-xs font-extrabold tracking-[0.25em] text-slate-600 uppercase">
              Eventos
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Próximos eventos
          </h1>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Simula y prueba el proceso de reservar con nuestros eventos de demostración.
          </p>
          
          <p className="mt-2 text-fuchsia-600 text-base sm:text-sm leading-relaxed">
            Recuerda que al contratar nuestros planes, todo en la app es personalizado.
          </p>
          <div className="mx-auto mt-8 h-px w-56 bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
        </div>

        {/* Cards */}
        <div className="mt-10 mx-auto w-full max-w-4xl">
          {loading ? (
            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-7 text-slate-600">
              Cargando eventos...
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 sm:p-7 text-rose-700">
              {error}
            </div>
          ) : visibleEvents.length === 0 ? (
            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-7 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
              <p className="text-lg font-extrabold text-slate-900">
                Aún no hay eventos
              </p>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
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
                    border border-slate-200/80
                    bg-white/80
                    backdrop-blur-2xl
                    text-sm sm:text-base font-extrabold tracking-wide text-slate-900
                    hover:bg-white
                    transition
                  "
                >
                  <Instagram className="h-4 w-4 text-rose-500" />
                  Ver Instagram
                  <span className="inline-block transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
              <p className="mt-4 text-xs text-slate-500">
                Tip: si ya tienes un evento proximo, podemos habilitar tu página + QR + flujo
                completo en minutos (según personalización).
              </p>
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-rose-300/50 blur-3xl" />
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {visibleEvents.map((ev) => (
                <article
                  key={ev.id}
                  className="relative w-full rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-7 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,23,42,0.12)]"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                    {ev.status}
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold text-slate-900">
                    {ev.name}
                  </h2>
                  {ev.description ? (
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {ev.description}
                    </p>
                  ) : null}
                  <div className="mt-4 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-700">Inicio:</span>{" "}
                      {formatDate(ev.start_at)}
                    </p>
                    <p className="mt-1">
                      <span className="font-semibold text-slate-700">Fin:</span>{" "}
                      {formatDate(ev.end_at)}
                    </p>
                  </div>
                  {ev.public_url ? (
                    <a
                      href={ev.public_url}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-rose-600 hover:text-rose-500 transition"
                    >
                      Ver detalles
                      <span className="inline-block transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-sm text-slate-600">
          ¿Obtuviste tu QR? ¿Deseas probar el escaneo de seguridad? Anda a{" "}
          <a href="/login" className="font-semibold text-fuchsia-600 hover:text-fuchsia-500 transition">
            iniciar sesión de prueba
          </a>{" "}
          y accede con las credenciales para probar.
        </div>
      </section>
    </main>
  );
}
