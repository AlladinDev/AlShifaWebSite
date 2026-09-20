import { RegisterUserUrl, RegisterDoctorURL, RegisterOwnerURL, VerifyOwnerRegistrationURL ,VerifyDoctorRegistrationURL} from "@/constants"
import { ThunderApi } from "../Axios"
import type { IOwner } from "@/Screens/Auth/Onboarding/Owner/types/Owner.types"

export const RegisterUser = async (userData: any): Promise<Error | null> => {
   try {
      await ThunderApi(userData, RegisterUserUrl, "post")
      return null
   }
   catch (err) {
      throw err
   }
}

export const RegisterDoctor = async (doctorData: any): Promise<Error | null> => {
   try {
      console.log("i reveived data",doctorData)
      await ThunderApi(doctorData, RegisterDoctorURL, "post")
      return null
   }
   catch (err) {
      throw err
   }
}

export const VerifyDoctorRegistration= async (otp:string): Promise<Error | null> => {
   try {
      await ThunderApi(otp, VerifyDoctorRegistrationURL, "post")
      return null
   }
   catch (err) {
      throw err
   }
}

export const VerifyOwnerRegistration= async (otp:string): Promise<Error | null> => {
   try {
      await ThunderApi(otp, VerifyOwnerRegistrationURL, "post")
      return null
   }
   catch (err) {
      throw err
   }
}
export const RegisterOwner = async (ownerData: IOwner): Promise<Error | null> => {
   try {
      await ThunderApi(ownerData, RegisterOwnerURL, "post")
      return null
   }
   catch (err) {
      throw err
   }
}