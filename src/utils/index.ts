/** Minimal class joiner. If you use shadcn, swap this for your own `cn` from "@/lib/utils". */
export const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

// Backend sends UTC timestamps that represent clinic clock time, so format in UTC.
// Remove `timeZone: "UTC"` if your times are real local instants.
const timeFmt = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
});
const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const formatTime = (iso: string) => timeFmt.format(new Date(iso)).toUpperCase();
export const formatTimeRange = (start: string, end: string) =>
  `${formatTime(start)} – ${formatTime(end)}`;
export const formatDate = (iso: string) => dateFmt.format(new Date(iso));

export const getInitials = (name: string) =>
  name
    .replace(/^dr\.?\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

export const sameDay = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
