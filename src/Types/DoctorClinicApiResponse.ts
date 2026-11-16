/** Shapes returned by your backend. Components accept these as-is. */

export interface DayTiming {
  day: string; // "Monday"
  startTime: string; // ISO, e.g. "2026-09-07T09:00:00Z"
  endTime: string;
}

export interface SeasonTiming {
  name: string; // "Summer" | "Winter"
  start: string; // ISO, only the time part matters
  end: string;
}

/** "Fetched Doctors With Clinics" -> data[].clinics[] */
export interface DoctorClinic {
  mappingID: string;
  _id: string;
  name: string;
  address: string;
  availableOn: string[];
  consultationFees: number;
  doctorTimings: DayTiming[];
  joinedAt: string;
  departments: string[] | null;
  workingDays: string[];
  seasonTimings: SeasonTiming[];
}

export interface DoctorWithClinics {
  _id: string;
  name: string;
  experience: number;
  speciality: string;
  photoUrl?: string;
  workingAt: string;
  qualifications: string;
  post: string;
  clinics: DoctorClinic[];
}

/** "Fetched Clinics With Doctors" -> data[].doctors[] */
export interface ClinicDoctor {
  mappingID: string;
  _id: string;
  name: string;
  experience: number;
  speciality: string;
  photoUrl?: string;
  workingAt: string;
  qualifications: string;
  post: string;
  availableOn: string[];
  consultationFees: number;
  timings: DayTiming[];
  joinedOn: string;
}

export interface ClinicWithDoctors {
  _id: string;
  name: string;
  address: string;
  registrationDate: string;
  departments: string[] | null;
  workingDays: string[];
  seasonTimings: SeasonTiming[];
  doctors: ClinicDoctor[];
}

export interface ApiResponse<T> {
  message: string;
  data: T[];
  statusCode: number;
}
