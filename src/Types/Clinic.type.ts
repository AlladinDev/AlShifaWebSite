import type { Doctor } from "./Doctor.type"

export interface Clinic {
  id: string
  name: string
  address: string
  mobile: number
  pincode: number
  seasonTimings: {
    start: string
    end: string
    name: string
  }[]
  OwnerDetails: {
    name: string
    address: string
    mobile: number
  }
  DoctorDetails: Doctor[]
  planType: string
  maxAppointments: number
  verified: boolean
}