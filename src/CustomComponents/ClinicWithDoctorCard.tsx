import { Fragment } from "react";
import { Building2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ClinicDoctor, ClinicWithDoctors } from "../Types/DoctorClinicApiResponse";
import { formatDate, formatTimeRange } from "../utils/index";
import { EmptyNote, EntityHeader, FeeBadge, HeroBadge, PersonAvatar, subtle, WeekStrip } from "./DoctorClinicCard.shared";

export interface ClinicWithDoctorsCardProps {
  clinic: ClinicWithDoctors;
  /** Called with the doctor–clinic mappingID when "Book" is pressed. */
  onBook?: (mappingID: string, doctor: ClinicDoctor, clinic: ClinicWithDoctors) => void;
  bookLabel?: string;
  currency?: string;
  className?: string;
}

export function ClinicWithDoctorsCard({
  clinic,
  onBook,
  bookLabel = "Book appointment",
  currency,
  className,
}: ClinicWithDoctorsCardProps) {
  const doctors = clinic.doctors ?? [];

  return (
    <Card className={cn("@container w-full gap-0 overflow-hidden py-0", className)}>
      <EntityHeader
        leading={
          <div className="grid size-20 place-items-center rounded-2xl bg-primary-foreground/15 text-primary-foreground @md:size-24">
            <Building2 className="size-9 @md:size-10" />
          </div>
        }
        title={clinic.name}
        subtitle={
          <span className="flex items-center justify-center gap-1.5 @md:justify-start">
            <MapPin className="size-4 shrink-0" /> {clinic.address}
          </span>
        }
        badges={clinic.seasonTimings.map((s) => (
          <HeroBadge key={s.name}>
            {s.name} {formatTimeRange(s.start, s.end)}
          </HeroBadge>
        ))}
      />

      <CardContent className="px-4 py-4 @md:px-6">
        <p className="mb-3 text-sm font-semibold">Clinic open on</p>
        <div className="flex flex-wrap gap-1.5">
          {clinic.workingDays.map((d) => (
            <Badge key={d} variant="outline" className="capitalize">
              {d.slice(0, 3)}
            </Badge>
          ))}
        </div>
        {clinic.departments?.length ? (
          <p className={cn("mt-3 text-sm", subtle)}>Departments: {clinic.departments.join(", ")}</p>
        ) : null}
      </CardContent>

      <Separator />

      <CardContent className="px-4 pt-4 pb-0 @md:px-6">
        <h4 className="text-base font-bold">Doctors ({doctors.length})</h4>
      </CardContent>

      {doctors.length === 0 ? (
        <CardContent className="px-4 py-4 @md:px-6">
          <EmptyNote>No doctors at this clinic yet.</EmptyNote>
        </CardContent>
      ) : (
        doctors.map((doctor, i) => (
          <Fragment key={doctor.mappingID}>
            {i > 0 && <Separator />}
            <CardContent className="space-y-4 px-4 py-4 @md:px-6">
              <div className="grid grid-cols-[auto_1fr] items-center gap-3 @md:grid-cols-[auto_1fr_auto]">
                <PersonAvatar name={doctor.name} src={doctor.photoUrl} size="sm" />
                <div className="min-w-0">
                  <h5 className="text-base leading-snug font-bold">{doctor.name}</h5>
                  <p className={cn("text-sm", subtle)}>
                    {doctor.speciality} · {doctor.experience} yrs · {doctor.qualifications}
                  </p>
                </div>
                <div className="col-span-2 @md:col-span-1">
                  <FeeBadge amount={doctor.consultationFees} currency={currency} />
                </div>
              </div>

              <WeekStrip availableOn={doctor.availableOn} slots={doctor.timings} />

              <div className="flex @md:justify-end">
                <Button
                  className="w-full @md:w-auto"
                  onClick={() => onBook?.(doctor.mappingID, doctor, clinic)}
                >
                  {bookLabel}
                </Button>
              </div>
            </CardContent>
          </Fragment>
        ))
      )}

      <Separator />
      <CardFooter className={cn("bg-muted/50 px-4 py-3 text-xs @md:px-6", subtle)}>
        Registered on {formatDate(clinic.registrationDate)}
      </CardFooter>
    </Card>
  );
}
