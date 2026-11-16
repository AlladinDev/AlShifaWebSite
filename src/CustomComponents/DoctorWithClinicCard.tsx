import { Fragment } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DoctorClinic, DoctorWithClinics } from "../Types/DoctorClinicApiResponse";
import { formatTimeRange } from "../utils/index";
import { EmptyNote, EntityHeader, FeeBadge, HeroBadge, PersonAvatar, subtle, WeekStrip } from "./DoctorClinicCard.shared";

export interface DoctorWithClinicsCardProps {
  doctor: DoctorWithClinics;
  /** Called with the doctor–clinic mappingID when "Book" is pressed. */
  onBook?: (mappingID: string, clinic: DoctorClinic, doctor: DoctorWithClinics) => void;
  bookLabel?: string;
  currency?: string;
  className?: string;
}

export function DoctorWithClinicsCard({
  doctor,
  onBook,
  bookLabel = "Book appointment",
  currency,
  className,
}: DoctorWithClinicsCardProps) {
  const clinics = doctor.clinics ?? [];

  return (
    <Card className={cn("@container w-full gap-0 overflow-hidden py-0", className)}>
      <EntityHeader
        leading={<PersonAvatar name={doctor.name} src={doctor.photoUrl} onPrimary />}
        title={doctor.name}
        subtitle={`${doctor.post} · ${doctor.workingAt}`}
        badges={
          <>
            <HeroBadge>{doctor.speciality}</HeroBadge>
            <HeroBadge>{doctor.experience} years experience</HeroBadge>
            <HeroBadge>{doctor.qualifications}</HeroBadge>
          </>
        }
      />

      <CardContent className="px-4 pt-4 pb-0 @md:px-6">
        <h4 className="text-base font-bold">
          Available at {clinics.length} {clinics.length === 1 ? "clinic" : "clinics"}
        </h4>
      </CardContent>

      {clinics.length === 0 ? (
        <CardContent className="px-4 py-4 @md:px-6">
          <EmptyNote>Not linked to any clinic yet.</EmptyNote>
        </CardContent>
      ) : (
        clinics.map((clinic, i) => (
          <Fragment key={clinic.mappingID}>
            {i > 0 && <Separator />}
            <CardContent className="space-y-4 px-4 py-4 @md:px-6">
              <div className="flex flex-col gap-3 @md:flex-row @md:items-start @md:justify-between">
                <div className="min-w-0">
                  <h5 className="text-lg leading-snug font-bold">{clinic.name}</h5>
                  <p className={cn("mt-0.5 flex items-center gap-1.5 text-sm", subtle)}>
                    <MapPin className="size-4 shrink-0" /> {clinic.address}
                  </p>
                </div>
                <FeeBadge amount={clinic.consultationFees} currency={currency} />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold">Weekly visits</p>
                <WeekStrip availableOn={clinic.availableOn} slots={clinic.doctorTimings} />
              </div>

              <div className="flex flex-col gap-3 @md:flex-row @md:items-center @md:justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {clinic.seasonTimings.map((s) => (
                    <Badge key={s.name} variant="outline" className="font-medium">
                      {s.name} {formatTimeRange(s.start, s.end)}
                    </Badge>
                  ))}
                </div>
                <Button
                  className="w-full @md:w-auto"
                  onClick={() => onBook?.(clinic.mappingID, clinic, doctor)}
                >
                  {bookLabel}
                </Button>
              </div>
            </CardContent>
          </Fragment>
        ))
      )}
    </Card>
  );
}
