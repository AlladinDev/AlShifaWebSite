import { useState, useEffect, useRef } from "react";
import { Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { DEFAULT_GUIDELINES, type BiometricAuthProps } from "@/Types/Biometric";



const ERRORS: Record<string, string> = {
  NotAllowedError: "Scan cancelled, timed out, or no saved fingerprint found. Try again or set up this phone.",
  SecurityError: "Fingerprint sign-in needs a secure (HTTPS) connection.",
  NotSupportedError: "This device has no fingerprint sensor or screen lock.",
  InvalidStateError: "This phone is already set up. Tap the sensor to sign in.",
};

const friendlyError = (e: unknown): string => {
  const { name = "", message = "" } = (e ?? {}) as { name?: string; message?: string };
  return ERRORS[name] || message || "Something went wrong. Please try again.";
};

/* ═════════════════════════ Scanner visual ═════════════════════════ */
type Status = "idle" | "scanning" | "success" | "error";
const COLORS = {
  idle: ["#7dd3c8", "rgba(94,234,212,.25)"], scanning: ["#5eead4", "rgba(94,234,212,.55)"],
  success: ["#86efac", "rgba(134,239,172,.6)"], error: ["#fbbf77", "rgba(251,191,119,.45)"],
} as const;

const Scanner = ({ status, onClick, disabled }: { status: Status; onClick: () => void; disabled: boolean }) => {
  const [ridge, glow] = COLORS[status];
  const active = status === "idle" || status === "scanning";
  return (
    <div className="relative mx-auto flex h-52 w-52 items-center justify-center">
      {active && [0, 1.1].map((d) => <span key={d} className="fp-pulse absolute inset-0 rounded-full border border-teal-300/40" style={{ animationDelay: `${d}s` }} />)}
      {status === "success" && <span className="fp-burst absolute inset-0 rounded-full border-2 border-emerald-300" />}
      <button
        type="button" onClick={onClick} disabled={disabled} aria-label="Scan your fingerprint"
        style={{ boxShadow: `0 0 60px 4px ${glow}, inset 0 0 30px rgba(0,0,0,.5)` }}
        className={`relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#0d2a2f] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300 ${disabled ? "cursor-not-allowed opacity-60" : "hover:scale-[1.03] active:scale-95"} ${status === "error" ? "fp-shake" : ""}`}
      >
        {/* Fingerprint ridges = 8 rotated dashed circles */}
        <svg viewBox="-80 -80 160 160" className="h-36 w-36" aria-hidden>
          {Array.from({ length: 8 }, (_, i) => (
            <circle key={i} r={14 + i * 8} fill="none" stroke={ridge} strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${20 + i * 28} ${8 + i * 2} ${10 + i * 8} ${10 + i}`} transform={`rotate(${i * 47})`}
              className={status === "scanning" ? "fp-ridge" : ""}
              style={{ opacity: status === "success" ? 1 : 0.35 + i * 0.07, animationDelay: `${i * 90}ms`, transition: "all .5s" }} />
          ))}
        </svg>
        {status === "scanning" && <span className="fp-laser pointer-events-none absolute inset-x-0 h-10" />}
        <span className={`absolute bottom-4 flex h-8 w-8 items-center justify-center rounded-full border ${status === "success" ? "border-emerald-300/60 bg-emerald-400/20 text-emerald-200" : "border-white/10 bg-black/30 text-teal-100/70"}`}>
          <Lock className={`h-4 w-4 transition-transform duration-500 ${status === "success" ? "-translate-y-0.5 scale-110" : ""}`} />
        </span>
      </button>
    </div>
  );
};

const CSS = `
@keyframes fp-pulse{0%{transform:scale(.8);opacity:.7}100%{transform:scale(1.25);opacity:0}}
@keyframes fp-laser{0%{top:-10%}100%{top:100%}}
@keyframes fp-ridge{0%,100%{opacity:.25}50%{opacity:1}}
@keyframes fp-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
@keyframes fp-burst{0%{transform:scale(.85);opacity:1}100%{transform:scale(1.6);opacity:0}}
.fp-pulse{animation:fp-pulse 2.2s ease-out infinite}
.fp-laser{background:linear-gradient(transparent,rgba(94,234,212,.75),transparent);animation:fp-laser 1.4s ease-in-out infinite alternate}
.fp-ridge{animation:fp-ridge 1.2s ease-in-out infinite}.fp-shake{animation:fp-shake .45s}
.fp-burst{animation:fp-burst .9s ease-out forwards}
@media(prefers-reduced-motion:reduce){.fp-pulse,.fp-laser,.fp-ridge,.fp-shake,.fp-burst{animation:none}}`;

/* ═════════════════════════ Main reusable component ═════════════════════════ */
export function BiometricAuth({
  onScan, onEnroll, onSuccess, fallbacks = [], guidelines = DEFAULT_GUIDELINES, successDelay = 1300, footer,
  title = "Touch to verify", subtitle = "Scan your fingerprint to continue. No password needed.",
  badge = "Protected by your phone's biometrics",
}: BiometricAuthProps) {
  const [mode, setMode] = useState<string | null>(null); // null = fingerprint, else a fallback id
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const [code, setCode] = useState("");
  const [supported, setSupported] = useState(true);
 const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const fb = fallbacks.find((f) => f.id === mode);
  const busy = status === "scanning" || status === "success";

  // Does this device have a fingerprint / screen-lock authenticator?
  useEffect(() => {
    Promise.resolve(window.PublicKeyCredential?.isUserVerifyingPlatformAuthenticatorAvailable?.() ?? false)
      .then(setSupported).catch(() => setSupported(false));
    return () => clearTimeout(timer.current);
  }, []);

  // Runs any auth action (scan, enrol, code) with shared status handling
  const run = async (fn: () => Promise<unknown>, pending: string) => {
    setStatus("scanning"); setMsg(pending);
    try {
      const result = await fn();
      setStatus("success"); setMsg("Identity confirmed. Unlocking…");
      timer.current = setTimeout(() => onSuccess?.(result), successDelay);
    } catch (e) { setStatus("error"); setMsg(friendlyError(e)); }
  };
  const go = (id: string | null) => { setMode(id); setStatus("idle"); setMsg(""); setCode(""); };
  const tone = status === "success" ? "text-emerald-300" : status === "error" ? "text-amber-300" : "text-teal-100/70";

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-4xl">
      <style>{CSS}</style>
      <div className="relative grid gap-6 overflow-hidden rounded-3xl bg-linear-to-b  from-[#0f3238] to-[#08191d] p-6 shadow-2xl ring-1 ring-white/10 sm:p-8 lg:grid-cols-2 lg:gap-x-12 lg:p-10">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-400/10 blur-3xl" />

        {/* Header — left column on desktop, top on mobile */}
        <header className="relative text-center lg:col-start-1 lg:row-start-1 lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-teal-100/80 ring-1 ring-white/10">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-300" /> {badge}
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white lg:text-3xl">{fb?.title ?? title}</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-teal-100/70 lg:mx-0 lg:max-w-sm">{fb?.description ?? subtitle}</p>
        </header>

        {/* Interactive panel — right column on desktop, middle on mobile */}
        <section className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex lg:flex-col lg:justify-center">
          {!fb ? (
            <>
              <Scanner status={status} onClick={() => run(onScan, "Place your finger on the sensor when your phone asks.")} disabled={busy || !supported} />
              <p role="status" aria-live="polite" className={`mx-auto mt-5 min-h-[2.5rem] max-w-xs text-center text-sm ${tone}`}>
                {supported ? msg || "Tap the sensor to begin If you have Already Registered Your Fingerprint." : "No fingerprint sensor found. Use another method below."}
              </p>
              {onEnroll && supported && !busy && (
                <button type="button" onClick={() => run(onEnroll, "Setting up this phone. Touch the sensor when asked.")}
                  className="mx-auto  my-6 cursor-pointer block text-xs font-medium text-teal-200 underline-offset-4 hover:underline">
                  New User ? Click on This Link
                </button>
              )}
              {fallbacks.length > 0 && (
                <div className="mt-3 grid gap-2 text-xs" style={{ gridTemplateColumns: `repeat(${Math.min(fallbacks.length, 2)},1fr)` }}>
                  {fallbacks.map(({ id, label, icon: Icon }) => (
                    <button key={id} type="button" onClick={() => go(id)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-white/5 px-3 py-3 font-medium text-teal-50 ring-1 ring-white/10 transition hover:bg-white/10">
                      <Icon className="h-4 w-4 text-teal-300" /> {label}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); run(() => fb.onSubmit(code), "Checking…"); }}>
              <label className="block">
                <span className="text-sm font-medium text-teal-50">{fb.label}</span>
                <input value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, fb.length))}
                  inputMode="numeric" autoComplete="one-time-code" placeholder={"•".repeat(fb.length)} autoFocus
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-center font-mono text-xl tracking-[.35em] text-white placeholder:text-white/20 focus:border-teal-300/60 focus:outline-none focus:ring-2 focus:ring-teal-300/30" />
                {fb.hint && <span className="mt-2 block text-xs text-teal-100/60">{fb.hint}</span>}
              </label>
              <p role="status" className={`min-h-5 text-sm ${tone}`}>{status === "scanning" ? "Checking…" : msg}</p>
              <button type="submit" disabled={code.length < fb.length || busy}
                className="w-full rounded-xl bg-teal-300 px-4 py-3.5 text-sm font-semibold text-[#06201f] transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30">
                Verify and continue
              </button>
              <button type="button" onClick={() => go(null)} className="mx-auto flex items-center gap-1.5 text-xs font-medium text-teal-100/70 hover:text-teal-200">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to fingerprint
              </button>
            </form>
          )}
          {footer}
        </section>

        {/* Guidelines — left column (below header) on desktop, under the scanner on mobile */}
        <ul className="relative space-y-3 rounded-2xl bg-white/4 p-4 ring-1 ring-white/10 lg:col-start-1 lg:row-start-2 lg:self-start">
          {guidelines.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-300/10 text-teal-300"><Icon className="h-4 w-4" /></span>
              <div><p className="text-sm font-medium text-white">{title}</p><p className="text-xs leading-relaxed text-teal-100/60">{body}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
