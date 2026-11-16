import { useState, type ReactNode } from "react";
import type { DayTiming } from "../Types/DoctorClinicApiResponse";
import { DAYS, cn, formatTime, formatTimeRange, getInitials, sameDay } from "../utils/index";

/* All colours come from your theme tokens (bg-card, bg-primary, text-primary-foreground,
   border-border, bg-muted ...), so light/dark works through the `.dark` class.
   Layout responds to the CARD's width via Tailwind v4 container queries (@md:, @lg:). */

/** Secondary text colour that works in both themes without relying on --muted-foreground. */
export const subtle = "text-card-foreground/70";

/* ---------- Card shell ---------- */

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <article
      className={cn(
        "@container w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      {children}
    </article>
  );
}

/** Coloured top panel: `leading` (avatar/icon) + body. Stacks and centres on narrow cards. */
export function CardHero({ leading, children }: { leading: ReactNode; children: ReactNode }) {
  return (
    <header className="grid grid-cols-1 justify-items-center gap-4 bg-primary p-5 text-center text-primary-foreground @md:grid-cols-[auto_1fr] @md:items-center @md:justify-items-start @md:gap-6 @md:p-6 @md:text-left">
      {leading}
      <div className="min-w-0">{children}</div>
    </header>
  );
}

export function CardSection({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={cn("border-t border-border p-4 first:border-t-0 @md:p-6", className)}>
      {children}
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-sm font-semibold">{children}</p>;
}

/* ---------- Small pieces ---------- */

/** Translucent pill for use on the primary hero. */
export function HeroPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold text-primary-foreground @md:text-sm">
      {children}
    </span>
  );
}

/** Neutral pill for use on the card body. */
export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold capitalize text-card-foreground">
      {children}
    </span>
  );
}

export function Avatar({
  name,
  src,
  size = "lg",
  variant = "default",
}: {
  name: string;
  src?: string;
  size?: "sm" | "lg";
  variant?: "default" | "onPrimary";
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;
  return (
    <div
      role="img"
      aria-label={name}
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-full font-extrabold",
        size === "sm" ? "size-12 text-base" : "size-20 text-2xl @md:size-24 @md:text-3xl",
        variant === "onPrimary"
          ? "border-2 border-primary-foreground/60 bg-primary-foreground/15 text-primary-foreground"
          : "border border-border bg-muted text-card-foreground",
      )}
    >
      <span aria-hidden>{getInitials(name)}</span>
      {showImage && (
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </div>
  );
}

export function FeeTag({ amount, currency = "₹" }: { amount: number; currency?: string }) {
  return (
    <div className="text-left @md:text-right">
      <p className="text-2xl font-extrabold leading-none text-primary">
        {currency}
        {amount}
      </p>
      <p className={cn("mt-1 text-xs", subtle)}>Consultation fee</p>
    </div>
  );
}

export function BookButton({
  label = "Book appointment",
  onClick,
  className,
}: {
  label?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition",
        "hover:bg-primary/90 active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
        "@md:w-auto",
        className,
      )}
    >
      {label}
    </button>
  );
}

/* ---------- Weekly schedule ---------- */

/** Mon-Sun strip. Vertical list on narrow cards, 7 columns once the card is wide enough. */
export function WeekStrip({
  availableOn,
  slots,
}: {
  availableOn: string[];
  slots: DayTiming[];
}) {
  return (
    <ul className="grid grid-cols-1 gap-1.5 @lg:grid-cols-7 @lg:gap-2">
      {DAYS.map((day) => {
        const on = availableOn.some((d) => sameDay(d, day));
        const slot = slots.find((s) => sameDay(s.day, day));
        return (
          <li
            key={day}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2 @lg:flex-col @lg:justify-center @lg:px-1 @lg:text-center",
              on ? "bg-primary text-primary-foreground" : "bg-muted text-card-foreground/60",
            )}
          >
            <span className="text-sm font-bold">
              <span className="@lg:hidden">{day}</span>
              <span className="hidden @lg:inline">{day.slice(0, 3)}</span>
            </span>
            {on && slot ? (
              <span className="text-xs font-medium leading-tight @lg:mt-1">
                <span className="@lg:hidden">{formatTimeRange(slot.startTime, slot.endTime)}</span>
                <span className="hidden @lg:block">
                  {formatTime(slot.startTime)}
                  <br />
                  to {formatTime(slot.endTime)}
                </span>
              </span>
            ) : (
              <span className="text-xs leading-tight @lg:mt-1">Off</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Icons ---------- */

export function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4 shrink-0", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-8", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 21V6l8-3 8 3v15M9 21v-5h6v5M12 8v4M10 10h4" />
    </svg>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className={cn("rounded-lg border border-dashed border-border p-6 text-center text-sm", subtle)}>
      {children}
    </div>
  );
}
