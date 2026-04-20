
export const BaseApi="http://localhost:8000/v1"
export const MaxApiRetries=5
export const RetryDelay=1
export const FetchClinicsUrl=BaseApi+"/clinics/details"
export const FetchDoctorsUrl=BaseApi+"/doctor/details"
export const FetchBookedSlotsUrl=BaseApi+"/clinic/appointments/full"
export const RegisterUserUrl=BaseApi+"/user"


//const limits for validation
 // ---- Limits (adjust as needed) ----
  export const LIMITS = {
    name: 50,
    mobile: 15,
    address: 200,
    password: 100,
    email: 100,
  };

export const MIN={
  password:8
}