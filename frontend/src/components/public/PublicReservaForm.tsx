import { useState } from "react";
import type { ReservationCreatePayload } from "../../types/reservation";

export default function PublicReservaForm({
  disabled,
  onSubmit,
}: {
  disabled?: boolean;
  onSubmit?: (payload: ReservationCreatePayload) => Promise<void> | void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled || submitting) return;

    // validación simple (frontend)
    if (firstName.trim().length < 2 || lastName.trim().length < 2) return;
    if (!email.includes("@")) return;
    if (phone.trim().length < 7) return;

    setSubmitting(true);
    try {
      await onSubmit?.({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        instagram: instagram.trim() ? instagram.trim() : null,
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setInstagram("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Field label="Nombre">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={disabled || submitting}
          className="mt-1 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-200/50 disabled:opacity-60"
          placeholder="Tu nombre"
          required
        />
      </Field>

      <Field label="Apellido">
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={disabled || submitting}
          className="mt-1 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-200/50 disabled:opacity-60"
          placeholder="Tu apellido"
          required
        />
      </Field>

      <Field label="Correo electrónico">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled || submitting}
          className="mt-1 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-200/50 disabled:opacity-60"
          placeholder="tucorreo@gmail.com"
          required
        />
      </Field>

      <Field label="Celular">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={disabled || submitting}
          className="mt-1 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-200/50 disabled:opacity-60"
          placeholder="0999999999"
          required
        />
      </Field>

      <Field label="Instagram">
        <input
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          disabled={disabled || submitting}
          className="mt-1 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-200/50 disabled:opacity-60"
          placeholder="@tu_usuario"
          required
        />
      </Field>

      <button
        type="submit"
        disabled={disabled || submitting}
        className="group mt-2 inline-flex items-center justify-center rounded-2xl px-6 py-3 border border-fuchsia-200 bg-white text-sm sm:text-base font-extrabold tracking-wide text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.12)] hover:bg-fuchsia-50 hover:border-fuchsia-300 transition disabled:opacity-60"
      >
        {submitting ? "Reservando..." : "Reservar"}
        <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </button>

      <p className="text-xs text-slate-500">
        Te llegará un correo con tu QR (y también lo verás aquí).
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-extrabold text-slate-700">{label}</label>
      {children}
    </div>
  );
}
