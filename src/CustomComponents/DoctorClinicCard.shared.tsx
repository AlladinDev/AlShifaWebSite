import type { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DayTiming } from "../Types/DoctorClinicApiResponse";
import { DAYS, formatTime, formatTimeRange, getInitials, sameDay } from "../utils/index";

/** Secondary text that stays readable in both themes (your light --muted-foreground is near-black). */
export const subtle = "text-card-foreground/70";

/* ---------- Header used by both cards (shadcn CardHeader + Title + Description) ---------- */

export function EntityHeader({
  leading,
  title,
  subtitle,
  badges,
}: {
  leading: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  badges?: ReactNode;
}) {
  return (
    <CardHeader className="bg-primary px-5 py-5 text-primary-foreground @md:px-6 @md:py-6">
      <div className="flex flex-col items-center gap-4 text-center @md:flex-row @md:gap-6 @md:text-left">
        {leading}
        <div className="min-w-0 space-y-1">
          <CardTitle className="text-2xl leading-tight font-extrabold tracking-tight @md:text-3xl">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-primary-foreground/85 @md:text-base">
            {subtitle}
          </CardDescription>
          {badges && (
            <div className="flex flex-wrap justify-center gap-2 pt-2 @md:justify-start">{badges}</div>
          )}
        </div>
      </div>
    </CardHeader>
  );
}

/** shadcn Badge, styled for the primary header. */
export function HeroBadge({ children }: { children: ReactNode }) {
  return (
    <Badge variant="outline" className="border-primary-foreground/40 px-3 py-1 text-primary-foreground">
      {children}
    </Badge>
  );
}

/* ---------- shadcn Avatar with initials fallback ---------- */

export function PersonAvatar({
  name,
  src,
  size = "lg",
  onPrimary = false,
}: {
  name: string;
  src?: string;
  size?: "sm" | "lg";
  onPrimary?: boolean;
}) {
  return (
    <Avatar
      className={cn(
        size === "lg" ? "size-20 @md:size-24" : "size-12",
        onPrimary && "border-2 border-primary-foreground/60",
      )}
    >
      <AvatarImage src={src} alt={name} />
      <AvatarFallback
        className={cn(
          "font-extrabold",
          size === "lg" ? "text-2xl @md:text-3xl" : "text-base",
          onPrimary && "bg-primary-foreground/15 text-primary-foreground",
        )}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

export function FeeBadge({ amount, currency = "₹" }: { amount: number; currency?: string }) {
  return (
    <Badge className="px-3 py-1 text-sm font-bold">
      Fee {currency}
      {amount}
    </Badge>
  );
}

/* ---------- Weekly schedule (no shadcn equivalent, so this is the one custom piece) ---------- */

/** Vertical list on narrow cards, 7-column grid when the card is wide (container query). */
export function WeekStrip({ availableOn, slots }: { availableOn: string[]; slots: DayTiming[] }) {
  return (
    <ul className="grid grid-cols-1 gap-1.5 @lg:grid-cols-7 @lg:gap-2">
      {DAYS.map((day) => {
        const on = availableOn.some((d) => sameDay(d, day));
        const slot = slots.find((s) => sameDay(s.day, day));
        return (
          <li
            key={day}
            className={cn(
              "flex items-center justify-between rounded-md px-3 py-2 @lg:flex-col @lg:justify-center @lg:px-1 @lg:text-center",
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

export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <div className={cn("rounded-lg border border-dashed p-6 text-center text-sm", subtle)}>
      {children}
    </div>
  );
}
