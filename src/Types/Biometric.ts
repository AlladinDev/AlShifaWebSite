import { EyeOff, Hand, Zap } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

/* ═════════════════════════ Public types ═════════════════════════ */
export interface Guideline { icon: ComponentType<{ className?: string }>; title: string; body: string }
/** An alternative login method that uses a numeric code (temp code, recovery code, OTP…) */
export interface CodeFallback {
  id: string; label: string; icon: ComponentType<{ className?: string }>;
  title: string; description: string; length: number; hint?: string;
  onSubmit: (code: string) => Promise<unknown>; // throw to show an error
}
export interface BiometricAuthProps {
  onScan: () => Promise<unknown>;              // run passkey.login(...) + your API
  onEnroll?: () => Promise<unknown>;           // optional "set up this phone" (passkey.register)
  onSuccess?: (result: unknown) => void;       // called after the unlock animation
  fallbacks?: CodeFallback[];
  title?: string; subtitle?: string; badge?: string;
  guidelines?: Guideline[];
  successDelay?: number;
  footer?: ReactNode;                          // anything extra under the card content
}

export const DEFAULT_GUIDELINES: Guideline[] = [
  { icon: EyeOff, title: "Your fingerprint never leaves your phone", body: "We only receive a secure digital key, never an image of your finger." },
  { icon: Zap, title: "No passwords or SMS codes", body: "One touch confirms it's you and keeps your details private." },
  { icon: Hand, title: "For a clean scan", body: "Use a dry, clean finger and cover the whole sensor. Use a finger saved on this phone." },
];
