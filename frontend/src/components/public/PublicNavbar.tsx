import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/eventos", label: "Eventos" },
  { to: "/pricing", label: "Precios" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/admin/login", label: "Panel Administrativo" },
];

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-2.5 sm:px-4 sm:pt-3">
      <nav
        className="
          relative mx-auto max-w-6xl
          rounded-2xl
          border border-slate-200/75 lg:border-white/15
          bg-[linear-gradient(160deg,rgba(255,255,255,0.97),rgba(241,245,249,0.95))] lg:bg-white/10
          shadow-[0_18px_40px_rgba(15,23,42,0.16)] lg:shadow-[0_10px_30px_rgba(0,0,0,0.28)]
          backdrop-blur-md lg:backdrop-blur-xl backdrop-saturate-150
          overflow-hidden
        "
      >
        <div className="pointer-events-none absolute -top-16 -left-24 hidden h-56 w-[36rem] rounded-full bg-white/15 blur-3xl lg:block" />
        <div className="pointer-events-none absolute -top-24 right-0 hidden h-44 w-44 rounded-full bg-white/10 blur-2xl lg:block" />

        <div
          className="
            relative flex items-center justify-between gap-3
            px-3 py-2.5 sm:px-4 sm:py-3
            lg:px-6 lg:py-4
          "
        >
          <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 sm:gap-3">
            <img
              src="/images/nuvem.png"
              alt="NivuGate"
              width={64}
              height={64}
              fetchPriority="high"
              decoding="async"
              loading="eager"
              className="
                h-11 w-11 sm:h-12 sm:w-12
                lg:h-16 lg:w-16
                object-contain
                drop-shadow-[0_8px_14px_rgba(0,0,0,0.25)]
                select-none
              "
              draggable={false}
            />

            <div className="flex flex-col leading-tight">
              <span className="text-[15px] sm:text-base lg:text-lg font-bold tracking-tight text-slate-800">
                NivuGate
              </span>
              <span className="text-[11px] sm:text-xs font-medium tracking-wide text-slate-500">
                by Nivusoftware
              </span>
            </div>
          </NavLink>

          <div className="hidden lg:flex items-center gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  [
                    "px-4 py-2.5 rounded-xl font-semibold transition",
                    "text-slate-800 hover:text-purple-700",
                    "hover:bg-white/10 active:scale-[0.99]",
                    "text-[15px]",
                    isActive ? "bg-white/15 border border-white/15" : "",
                  ].join(" ")
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menu"
              aria-expanded={open}
              className="
                lg:hidden
                inline-flex h-10 w-10 items-center justify-center
                rounded-xl
                border border-slate-300/90
                bg-white
                text-slate-900
                shadow-[0_6px_16px_rgba(15,23,42,0.15)]
                transition hover:bg-slate-50
              "
            >
              <div className="relative h-4 w-5">
                <span
                  className={[
                    "absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-200",
                    open ? "translate-y-[7px] rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-200",
                    open ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-[14px] block h-0.5 w-5 rounded-full bg-slate-800 transition-all duration-200",
                    open ? "-translate-y-[7px] -rotate-45" : "",
                  ].join(" ")}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={[
            "lg:hidden border-t border-slate-200/80",
            "overflow-hidden transition-all duration-200 ease-out",
            open ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="grid gap-2.5 bg-white/75 px-3 py-3 backdrop-blur-md">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all",
                    "border shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]",
                    isActive
                      ? "border-slate-900 bg-slate-900 text-white shadow-[0_8px_20px_rgba(15,23,42,0.3)]"
                      : "border-slate-200 bg-white/90 text-slate-700 hover:border-slate-300 hover:bg-white hover:text-slate-900",
                  ].join(" ")
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
