import { NavLink } from "react-router-dom";
import {
  Check,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Headphones,
  Globe,
  QrCode,
  Mail,
  WifiOff,
  CreditCard,
  Building2,
  CalendarDays,
} from "lucide-react";

type Plan = {
  name: string;
  price: string;
  badge?: string;
  subtitle: string;
  highlights: string[];
  personalization: string;
  ctaLabel: string;
  ctaTo?: string;
  tone?: "primary" | "neutral";
};

const WHATSAPP_NUMBER = "593994993430";
const buildWhatsAppLink = (planName: string) => {
  const message = `Quiero contratar el plan ${planName} para las reservas con qr`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const saasPlans: Plan[] = [
  {
    name: "PRO",
    price: "$79/mes + IVA",
    badge: "Más popular",
    subtitle: "Para negocios que quieren un flujo profesional sin complicarse.",
    highlights: [
      "Hosting incluido",
      "Subdominio: xyz.nivusoftware.com",
      "3,500 reservas/mes",
      "Reportería básica",
      "Métricas básicas de reservas",
      "Todas las funciones: QR único, envío por correo, escaneo en puerta",
      "Incluye página web personalizada (branding + estructura base)",
    ],
    personalization: "Personalización (único pago): $40",
    ctaLabel: "Empezar con PRO",
    ctaTo: "/contacto",
    tone: "primary",
  },
  {
    name: "BUSINESS",
    price: "$149/mes + IVA",
    subtitle: "Más métricas, mejor soporte y más capacidad para escalar.",
    highlights: [
      "Hosting incluido",
      "Subdominio: xyz.nivusoftware.com",
      "7,500 reservas/mes",
      "Métricas medias/avanzadas",
      "Soporte prioritario",
      "Todas las funciones del sistema",
      "Incluye página web personalizada",
    ],
    personalization: "Personalización (único pago): $40",
    ctaLabel: "Elegir BUSINESS",
    ctaTo: "/contacto",
    tone: "neutral",
  },
  {
    name: "ENTERPRISE",
    price: "Precio a medida",
    subtitle: "Para operaciones grandes: multi-sucursal e integraciones.",
    highlights: [
      "Hosting incluido",
      "Dominio propio incluido (ej: tudominio.com)",
      "Reportería avanzada",
      "Métricas avanzadas",
      "Todas las funciones del sistema",
      "Opcional: multi-sucursal, roles avanzados, integraciones",
      "Incluye página web personalizada",
    ],
    personalization: "Personalización (único pago): $40",
    ctaLabel: "Solicitar propuesta",
    ctaTo: "/contacto",
    tone: "neutral",
  },
];

const eventPlans: Plan[] = [
  {
    name: "EVENTO ÚNICO",
    price: "$60 + IVA",
    subtitle: "Ideal para una fecha puntual sin analítica avanzada.",
    highlights: [
      "Hosting incluido",
      "Subdominio: tunegocio.nivusoftware.com",
      "Hasta 500 reservas",
      "QR único, email y escaneo en puerta",
      "Página web (Landing basica) personalizada del evento",
      "Sin reportería / sin métricas",
    ],
    personalization: "pago unico",
    ctaLabel: "Cotizar evento",
    ctaTo: "/contacto",
    tone: "neutral",
  },
  {
    name: "EVENTO PRO",
    price: "$80 + IVA",
    badge: "Recomendado",
    subtitle: "Para eventos más grandes y mayor capacidad.",
    highlights: [
      "Hosting incluido",
      "Subdominio: tunegocio.nivusoftware.com",
      "Hasta 1,500 reservas",
      "QR único, email y escaneo en puerta",
      "Página web (landing personalizada) personalizada del evento",
      "Sin reportería / sin métricas",
    ],
    personalization: "pago unico",
    ctaLabel: "Elegir Evento Pro",
    ctaTo: "/contacto",
    tone: "primary",
  },
];

const addons = [
  {
    icon: CreditCard,
    title: "Pasarela de pago en la app web",
    value: "+$15/mes",
    desc: "Convierte reservas en ventas con cobros en línea.",
  },
  {
    icon: Headphones,
    title: "Soporte en la puerta",
    value: "$15/hora",
    desc: "Acompañamiento operativo para check-in y contingencias.",
  },
  {
    icon: WifiOff,
    title: "Check-in offline",
    value: "+$15/mes",
    desc: "Escaneo sin internet con sincronización posterior.",
  },
];

const notes = [
  "Todos los planes incluyen hosting",
  "Todos incluyen su página web personalizada",
  "La diferencia real es: límite de reservas + métricas/reportes + soporte + dominio propio (Enterprise)",
];

function PlanCard({ plan }: { plan: Plan }) {
  const isPrimary = plan.tone === "primary";
  const whatsappLink = buildWhatsAppLink(plan.name);

  return (
    <div
      className={[
        "relative rounded-3xl border p-6 sm:p-7 bg-white ",
        "shadow-[0_18px_50px_rgba(15,23,42,0.10)]",
        isPrimary ? "border-fuchsia-200" : "border-slate-200/80",
      ].join(" ")}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-xs font-extrabold text-fuchsia-700">
            <Sparkles className="h-4 w-4" />
            {plan.badge}
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">{plan.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{plan.subtitle}</p>
        </div>

        <div className="text-right">
          <p className="text-lg font-extrabold text-slate-900">{plan.price}</p>
          <p className="mt-1 text-xs font-semibold text-fuchsia-600">
            {plan.personalization}
          </p>
        </div>
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <ul className="mt-5 grid gap-3">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-start gap-3 text-sm text-slate-700">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className={[
            "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold transition",
            isPrimary
              ? "bg-fuchsia-600 text-white hover:bg-fuchsia-500"
              : "bg-slate-900 text-white hover:bg-slate-800",
          ].join(" ")}
        >
          <Mail className="h-4 w-4" />
          {plan.ctaLabel}
        </a>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="relative w-full py-16 min-h-screen overflow-hidden bg-white text-slate-900 font-['Poppins']">
      {/* Light background aligned with footer */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100" />
        <div className="absolute -top-32 left-[-60px] h-80 w-80 rounded-full bg-fuchsia-200/40 blur-3xl" />
        <div className="absolute -bottom-40 right-[-80px] h-[26rem] w-[26rem] rounded-full bg-indigo-200/35 blur-3xl" />
        <div className="absolute top-14 right-20 h-56 w-56 rounded-full bg-purple-200/35 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
      </div>

      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-20 pb-14 py-26">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] uppercase text-fuchsia-600/80">
            NIVUGATE • PRECIOS
          </p>

          <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold leading-tight text-slate-900">
            Planes claros para reservas con <span className="text-fuchsia-600">QR</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-600">
            Selecciona el plan que mejor se adapte a tu negocio, Planes mensuales o por evento.
            Todos incluyen hosting y web personalizada.
          </p>

          <div className="mx-auto mt-8 h-px w-64 bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
        </div>

        {/* SaaS */}
        <div className="mt-12">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-fuchsia-600 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Planes Mensuales
              </h2>
              <p className="text-sm text-slate-600">
                Incluyen hosting + subdominio (tunegocio.nivusoftware.com)
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {saasPlans.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </div>
        </div>

        {/* Event plans */}
        <div className="mt-14">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-fuchsia-600 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Planes por Evento
              </h2>
              <p className="text-sm text-slate-600">
                Incluyen hosting + subdominio. Sin reportería ni métricas.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {eventPlans.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="mt-14">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-fuchsia-600 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Add-ons (opcionales)
              </h2>
              <p className="text-sm text-slate-600">
                Actívalos según tu operación.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {addons.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.10)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-extrabold text-slate-900">
                      {a.value}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-slate-900">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-14 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Nota importante
              </h2>
              <p className="text-sm text-slate-600">
                Todos los planes incluyen hosting y página web personalizada.
              </p>
            </div>
          </div>

          <ul className="mt-5 grid gap-3">
            {notes.map((n) => (
              <li key={n} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{n}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="https://nivusoftware.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white hover:bg-slate-800 transition"
            >
              <Globe className="h-4 w-4" />
              Ver Nivusoftware
            </a>

            <a
              href="https://wa.me/5930994993430?text=Quiero%20una%20cotizaci%C3%B3n"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 hover:bg-slate-50 transition"
            >
              <Mail className="h-4 w-4 text-fuchsia-600" />
              Quiero una demo / cotización
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
