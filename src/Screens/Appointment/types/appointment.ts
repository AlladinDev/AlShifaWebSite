// {
//     "patientName":"Saqlain mushtaq",
//     "patientAddress":"Soura",
//     "patientMobile":"9797798243",
//     "clinicAddress":"Soura",
//     "clinicID":"698c57737c775dced7df8c80",
//     "appointmentDate":"2026-04-07T10:00:00Z",
//     "doctorID":"6992f79cb786a7e5889b1a18"
// }

export type IAppointment = {
  patientName: string,
  patientAddress: string,
  patientMobile: number,
  clinicAddress: string,
  clinicID: string,
  appointmentDate: string,
  doctorID: string
  patientAge:number
}
