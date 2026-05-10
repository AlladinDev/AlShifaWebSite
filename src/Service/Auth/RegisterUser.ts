import { RegisterUserUrl, RegisterDoctorURL, RegisterOwnerURL } from "@/constants"
import { ThunderApi } from "../Axios"
import type { IOwner } from "@/Screens/Auth/Register/types/types"

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
      await ThunderApi(doctorData, RegisterDoctorURL, "post")
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