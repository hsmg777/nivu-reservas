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

const saasPlans: Plan[] = [
  {
    name: "PRO",
    price: "$79/mes + IVA",
    badge: "Más popular",
    subtitle: "Para negocios que quieren un flujo de reservas profesional sin complicarse.",
    highlights: [
      "Hosting incluido",
      "Subdominio: xyz.nivusoftware.com",
      "3,500 reservas/mes",
      "Reportería básica",
      "Métricas básicas de reservas",
      "Todas las funciones: QR único, envío por correo, escaneo en puerta, etc.",
      "Incluye página web personalizada (branding + contenido + estructura base).",
    ],
    personalization: "Personalización (único pago): $70",
    ctaLabel: "Empezar con PRO",
    ctaTo: "/contacto",
    tone: "primary",
  },
  {
    name: "BUSINESS",
    price: "$149/mes + IVA",
    subtitle: "Más métricas, mejor soporte y más capacidad para escalar eventos y campañas.",
    highlights: [
      "Hosting incluido",
      "Subdominio: xyz.nivusoftware.com",
      "7,500 reservas/mes",
      "Métricas medias/avanzadas",
      "Soporte prioritario",
      "Todas las funciones del sistema",
      "Incluye página web personalizada.",
    ],
    personalization: "Personalización (único pago): $70",
    ctaLabel: "Elegir BUSINESS",
    ctaTo: "/contacto",
    tone: "neutral",
  },
  {
    name: "ENTERPRISE",
    price: "Precio a medida",
    subtitle: "Para operaciones grandes: multi-sucursal, roles avanzados e integraciones.",
    highlights: [
      "Hosting incluido",
      "Dominio propio incluido (ej: tudominio.com)",
      "Reportería avanzada",
      "Métricas avanzadas",
      "Todas las funciones del sistema",
      "Opcional: multi-sucursal, roles avanzados, integraciones (según necesidad).",
      "Incluye página web personalizada.",
    ],
    personalization: "Personalización (único pago): $70",
    ctaLabel: "Solicitar propuesta",
    ctaTo: "/contacto",
    tone: "neutral",
  },
];

const eventPlans: Plan[] = [
  {
    name: "EVENTO ÚNICO",
    price: "$45 + IVA",
    subtitle: "Ideal para una fecha puntual sin analítica avanzada.",
    highlights: [
      "Hosting incluido",
      "Subdominio: evento.nivusoftware.com",
      "Hasta 500 reservas",
      "Todas las funciones: QR único, email, escaneo en puerta",
      "Página web personalizada del evento",
      "Sin reportería / sin métricas",
    ],
    personalization: "Personalización (único pago): $70",
    ctaLabel: "Cotizar evento",
    ctaTo: "/contacto",
    tone: "neutral",
  },
  {
    name: "EVENTO PRO",
    price: "$65 + IVA ",
    badge: "Recomendado",
    subtitle: "Para eventos más grandes.",
    highlights: [
      "Hosting incluido",
      "Subdominio: evento.nivusoftware.com",
      "Hasta 1,500 reservas",
      "Todas las funciones: QR único, email, escaneo en puerta",
      "Página web personalizada del evento",
      "Sin reportería / sin métricas",
    ],
    personalization: "Personalización (único pago): $70",
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
    desc: "Cobros en la app web para convertir reservas en ventas.",
  },
  {
    icon: Headphones,
    title: "Soporte en la puerta",
    value: "$15/hora",
    desc: "Acompañamiento operativo para check-in, flujo y contingencias.",
  },
  {
    icon: WifiOff,
    title: "Check-in offline",
    value: "+$15/mes",
    desc: "Escaneo sin internet con sincronización posterior (ideal para aforo alto).",
  },
];

const notes = [
  "TODOS los planes incluyen hosting",
  "TODOS incluyen su página web personalizada (por eso el $70 de personalización)",
  "La diferencia real entre planes es: límite de reservas + nivel de métricas/reportes + soporte + dominio propio (Enterprise)",
];

function PlanCard({ plan }: { plan: Plan }) {
  const isPrimary = plan.tone === "primary";

  return (
    <div
      className={[
        "relative rounded-3xl border p-6 sm:p-7 backdrop-blur-2xl",
        "shadow-[0_18px_60px_rgba(0,0,0,0.55)]",
        isPrimary
          ? "border-fuchsia-300/30 bg-white/[0.07]"
          : "border-white/10 bg-white/[0.05]",
      ].join(" ")}
    >
      {/* badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-extrabold text-fuchsia-100">
            <Sparkles className="h-4 w-4 text-fuchsia-200" />
            {plan.badge}
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
          <p className="mt-1 text-sm text-white/70">{plan.subtitle}</p>
        </div>

        <div className="text-right">
          <p className="text-lg font-extrabold text-white">{plan.price}</p>
          <p className="mt-1 text-xs font-semibold text-fuchsia-200/90">
            {plan.personalization}
          </p>
        </div>
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <ul className="mt-5 grid gap-3">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-start gap-3 text-sm text-white/80">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-purple-500/15 text-purple-100">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <NavLink
          to={plan.ctaTo ?? "/contacto"}
          className={[
            "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold transition",
            isPrimary
              ? "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white hover:opacity-95"
              : "bg-white/10 text-white hover:bg-white/14 border border-white/10",
          ].join(" ")}
        >
          <Mail className="h-4 w-4" />
          {plan.ctaLabel}
        </NavLink>

        <NavLink
          to="/eventos"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-extrabold text-white/90 hover:bg-white/10 transition"
        >
          <QrCode className="h-4 w-4 text-fuchsia-200" />
          Ver demo/eventos
        </NavLink>
      </div>

      {/* corner glow */}
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-fuchsia-400/15 blur-3xl" />
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="py-16 min-h-screen overflow-hidden bg-[#080414]">
      {/* Deep purple iOS-mirror background */}
      <div className="pointer-events-none absolute inset-0">
        {/* base gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0620] via-[#080414] to-[#06020f]" />

        {/* big blobs */}
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

      <section className="relative mx-auto max-w-6xl px-6 pt-16 sm:pt-20 pb-14">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-fuchsia-200/80">
            NIVUMGATE • PRICING
          </p>

          <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold leading-tight text-white">
            Planes claros para{" "}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              reservas con
            </span>{" "}
            <span className="text-fuchsia-200">QR</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-white/70">
            SaaS mensual para operación continua, o planes por evento para fechas puntuales.
            Todos incluyen hosting y página web personalizada.
          </p>

          <div className="mx-auto mt-8 h-px w-64 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* SaaS */}
        <div className="mt-12">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-fuchsia-200 shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Planes SaaS Mensuales
              </h2>
              <p className="text-sm text-white/65">
                Incluyen hosting + subdominio (xyz.nivusoftware.com)
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
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-fuchsia-200 shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Planes Por Evento
              </h2>
              <p className="text-sm text-white/65">
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
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-fuchsia-200 shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Add-ons (opcionales)
              </h2>
              <p className="text-sm text-white/65">
                Actívalos según tu operación y tu evento.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {addons.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-purple-500/15 text-purple-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-extrabold text-white">
                      {a.value}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-white">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-purple-500/15 text-purple-100">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Nota importante para tu oferta
              </h2>
              <p className="text-sm text-white/70">
                Todos los planes incluyen hosting y página web personalizada.
              </p>
            </div>
          </div>

          <ul className="mt-5 grid gap-3">
            {notes.map((n) => (
              <li key={n} className="flex items-start gap-3 text-sm text-white/80">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-purple-500/15 text-purple-100">
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 px-5 py-3 text-sm font-extrabold text-white hover:opacity-95 transition"
            >
              <Globe className="h-4 w-4" />
              Ver Nivusoftware
            </a>

            <NavLink
              to="/contacto"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-extrabold text-white hover:bg-white/14 transition"
            >
              <Mail className="h-4 w-4 text-fuchsia-200" />
              Quiero una demo / cotización
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
}
