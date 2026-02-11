import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardPathByRole, useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user?.role) navigate(getDashboardPathByRole(user.role), { replace: true });
  }, [user?.role, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Ingresa correo y contraseña.");
      return;
    }

    try {
      setLoading(true);
      const u = await login({ email, password });
      navigate(getDashboardPathByRole(u.role), { replace: true });
    } catch (err: any) {
      const msg =
        err?.message === "HTTP_401"
          ? "Correo o contraseña incorrectos."
          : "No se pudo iniciar sesión. Intenta nuevamente.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 font-['Poppins']">
      {/* Light background aligned with public pages */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100" />
        <div className="absolute -top-32 left-[-60px] h-80 w-80 rounded-full bg-fuchsia-200/40 blur-3xl" />
        <div className="absolute -bottom-40 right-[-80px] h-[26rem] w-[26rem] rounded-full bg-indigo-200/35 blur-3xl" />
        <div className="absolute top-14 right-20 h-56 w-56 rounded-full bg-purple-200/35 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-2xl items-center px-6 py-10">
        <div className="w-full space-y-8">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 backdrop-blur-2xl shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
              <span className="text-xs font-extrabold tracking-[0.25em] text-slate-500 uppercase">
                Acceso administrativo
              </span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <img
                src="/images/nuvem.png"
                alt="NivuGate"
                className="h-14 w-14 object-contain drop-shadow-[0_12px_22px_rgba(15,23,42,0.12)]"
                draggable={false}
              />
              <div className="leading-tight">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  NivuGate
                </h1>
                <p className="mt-1 text-slate-600">
                  Panel de administración ·{" "}
                  <span className="text-fuchsia-600 font-semibold">by Nivusoftware</span>
                </p>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Iniciar sesión</h2>
            <p className="mt-2 text-sm text-slate-600">
              Ingresa tus credenciales para continuar.
            </p>

            {errorMsg && (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Correo
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    placeholder="admin@nivugate.com"
                    className="
                      w-full rounded-2xl border border-slate-200/80
                      bg-white px-11 py-3
                      text-slate-900 placeholder:text-slate-400
                      outline-none
                      focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-200/50
                      transition
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Contraseña
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </span>

                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="
                      w-full rounded-2xl border border-slate-200/80
                      bg-white px-11 py-3 pr-12
                      text-slate-900 placeholder:text-slate-400
                      outline-none
                      focus:border-fuchsia-300/60 focus:ring-2 focus:ring-fuchsia-200/50
                      transition
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                    className="
                      absolute right-2 top-1/2 -translate-y-1/2
                      inline-flex h-10 w-10 items-center justify-center
                      rounded-xl border border-slate-200/70
                      bg-white text-slate-500
                      hover:bg-slate-50 hover:text-slate-700
                      focus:outline-none focus:ring-2 focus:ring-fuchsia-200/50
                      transition
                    "
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group w-full inline-flex items-center justify-center
                  rounded-2xl px-5 py-3
                  bg-slate-900 text-white
                  font-extrabold tracking-wide
                  hover:bg-slate-800
                  active:scale-[0.99]
                  transition
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {loading ? "Ingresando..." : "Entrar"}
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                © 2025 NivuGate · Nivusoftware
              </div>
            </form>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              <p className="font-extrabold text-slate-700">
                CREDENCIALES PARA PROBAR EL SCANEO DE QR
              </p>
              <p className="mt-2">
                correo: <span className="font-semibold text-slate-700">seguridad@nivusoftware.com</span>
              </p>
              <p>
                password: <span className="font-semibold text-slate-700">nivu2025</span>
              </p>
            </div>

            <div className="mt-4 text-center text-xs text-slate-500">
              ¿Problemas para acceder? Contacta al administrador del sistema.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
