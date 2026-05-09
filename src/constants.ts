
export const BaseApi = "http://localhost:8000/v1"
export const MaxApiRetries = 5
export const RetryDelay = 1
export const FetchClinicsUrl = BaseApi + "/clinics/details"
export const FetchDoctorsUrl = BaseApi + "/doctor/details"
export const FetchBookedSlotsUrl = BaseApi + "/clinic/appointments/full"
export const RegisterUserUrl = BaseApi + "/user"
export const RegisterDoctorURL = BaseApi + "/doctor"


//const limits for validation
// ---- Limits (adjust as needed) ----
export const LIMITS = {

  mobile: 15,
  //some length constants for validation
  MaxNameLength: 20,
  MaxAddressLength: 50,
  MaxQualificationsLength: 100,
  MaxAge: 80,
  MinAge: 15,
  MaxPasswordLength: 30,
  MinPasswordLength: 8,
  MaxEmailLength: 40
};

export const MIN = {
  password: 8
}