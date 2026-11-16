import { useShallow } from "zustand/react/shallow";
import { Smartphone, KeyRound } from "lucide-react";
import { useAppointmentStore } from "../store/appointment";
import { BiometricAuth } from "../../../CustomComponents/BiometricAuth";
import type { CodeFallback } from "@/Types/Biometric";
import { passkey, toB64 } from "@/utils/WebAuthHelpers";

/* ── API config: set VITE_API_URL and MOCK = false when your backend is ready ── */
const API = (import.meta).env?.VITE_API_URL ?? "/api";
const MOCK = true;
type Verified = { verified: boolean; patientMobile: string; token?: string };

const rand = () => toB64(crypto.getRandomValues(new Uint8Array(32)).buffer);
// Fake server replies so the UI works before the backend exists
const mock = (path: string) =>
  path.includes("options")
    ? { challengeId: "mock", challenge: rand(), rpId: location.hostname, rp: { name: "AlShifa Healthcare", id: location.hostname }, user: { id: rand(), name: "patient", displayName: "AlShifa Patient" } }
    : { verified: true, patientMobile: "0000000000" };

async function post<T = unknown>(path: string, body: object = {}): Promise<T> {
  if (MOCK) return new Promise((r) => setTimeout(() => r(mock(path) as T), 600));
  const res = await fetch(API + path, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || "Request failed");
  return res.json();
}
// Every verify endpoint must answer { verified, patientMobile, token? }
const verify = (path: string) => (body: object) =>
  post<Verified>(path, body).then((r) => { if (!r.verified) throw new Error("Verification failed. Please try again."); return r; });

/* Code-based alternatives, add/remove entries freely */
const fallbacks: CodeFallback[] = [
  { id: "temp", label: "Another phone", icon: Smartphone, title: "Use another phone", length: 6,
    description: "Enter the 6-digit code generated on your own phone (Security → Add temporary device).",
    hint: "The code expires after a few minutes.", onSubmit: (code) => verify("/auth/temp-code/verify")({ code }) },
  { id: "recovery", label: "Lost your phone?", icon: KeyRound, title: "Recover your account", length: 10,
    description: "Enter the 10-digit recovery code you saved at sign-up. Each code works once.",
    hint: "Find it in your welcome message.", onSubmit: (code) => verify("/auth/recovery/verify")({ code }) },
];

export const MobileVerificationForm = () => {
  const { moveToNextStage, addAppointmentDate } = useAppointmentStore(
    useShallow((s) => ({ moveToNextStage: s.moveToNextStage, addAppointmentDate: s.addAppointmentDate }))
  );
  return (
    <BiometricAuth
      title="Touch to verify"
      subtitle="Scan your fingerprint to unlock your appointment booking."
      fallbacks={fallbacks}
      onScan={() => passkey.login(() => post("/auth/webauthn/authenticate/options"), verify("/auth/webauthn/authenticate/verify"))}
      onEnroll={() => passkey.register(() => post("/auth/webauthn/register/options"), verify("/auth/webauthn/register/verify"))}
      onSuccess={(r) => {
        addAppointmentDate({ patientMobile: Number((r as Verified).patientMobile) }); // server resolves the patient
        moveToNextStage();
      }}
    />
  );
};
