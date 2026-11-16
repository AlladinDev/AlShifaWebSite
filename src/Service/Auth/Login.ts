import { LoginDoctorURL, LoginOwnerURL, LoginUserURL, VerifyUserLoginURL } from "@/constants"
import { ThunderApi } from "../Axios"
import type { ApiResponse } from "@/Types/ApiResponse"

export const LoginDoctor = async (otpUrl:string): ApiResponse => {
        return ThunderApi(otpUrl, LoginDoctorURL, "post")
}

export const UserLogin = async (mobileNumber: string): ApiResponse => {
  console.log("type of mobile number is ",typeof(mobileNumber),mobileNumber)
    return ThunderApi(mobileNumber,LoginUserURL,"post")
}


export const VerifyUserLogin = async (otp: number):ApiResponse=> {
  return ThunderApi(otp,VerifyUserLoginURL,"post")
}

export const LoginOwner = async (otpUrl:string): ApiResponse => {
        return  ThunderApi(otpUrl, LoginOwnerURL, "post")
}
