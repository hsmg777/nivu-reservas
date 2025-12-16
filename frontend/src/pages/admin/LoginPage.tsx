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
    <div className="relative min-h-screen overflow-hidden bg-[#080414] text-white">
      {/* Background (match your dark pages) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0620] via-[#080414] to-[#06020f]" />
        <div className="absolute -top-40 left-[-120px] h-[32rem] w-[32rem] rounded-full bg-purple-500/18 blur-3xl" />
        <div className="absolute -bottom-44 right-[-120px] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/14 blur-3xl" />
        <div className="absolute top-10 right-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:96px_96px]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-2xl items-center px-6 py-10">
        <div className="w-full space-y-8">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <span className="text-xs font-extrabold tracking-[0.25em] text-white/70 uppercase">
                Acceso administrativo
              </span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <img
                src="/images/nuvem.png"
                alt="NivumGate"
                className="h-14 w-14 object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.45)]"
                draggable={false}
              />
              <div className="leading-tight">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  NivumGate
                </h1>
                <p className="mt-1 text-white/70">
                  Panel de administración ·{" "}
                  <span className="text-fuchsia-200 font-semibold">by Nivusoftware</span>
                </p>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 sm:p-8 backdrop-blur-2xl shadow-[0_18px_55px_rgba(0,0,0,0.55)]">
            <h2 className="text-2xl font-extrabold tracking-tight">Iniciar sesión</h2>
            <p className="mt-2 text-sm text-white/70">
              Ingresa tus credenciales para continuar.
            </p>

            {errorMsg && (
              <div className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {errorMsg}
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/80">
                  Correo
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    placeholder="admin@nivumgate.com"
                    className="
                      w-full rounded-2xl border border-white/10
                      bg-black/30 px-11 py-3
                      text-white placeholder:text-white/35
                      outline-none
                      focus:border-fuchsia-300/40 focus:ring-2 focus:ring-fuchsia-300/10
                      transition
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/80">
                  Contraseña
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <Lock className="h-4 w-4" />
                  </span>

                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="
                      w-full rounded-2xl border border-white/10
                      bg-black/30 px-11 py-3 pr-12
                      text-white placeholder:text-white/35
                      outline-none
                      focus:border-fuchsia-300/40 focus:ring-2 focus:ring-fuchsia-300/10
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
                      rounded-xl border border-white/10
                      bg-white/5 text-white/70
                      hover:bg-white/10 hover:text-white
                      focus:outline-none focus:ring-2 focus:ring-fuchsia-300/15
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
                  border border-fuchsia-300/35
                  bg-white/10 backdrop-blur-xl
                  font-extrabold tracking-wide
                  hover:bg-white/15 hover:border-fuchsia-300/55
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

              <div className="pt-2 text-center text-xs text-white/45">
                © 2025 NivumGate · Nivusoftware
              </div>
            </form>

            <div className="mt-4 text-center text-xs text-white/45">
              ¿Problemas para acceder? Contacta al administrador del sistema.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
