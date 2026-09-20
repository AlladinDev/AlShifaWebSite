import { LoginDoctorURL, LoginOwnerURL, LoginUserURL } from "@/constants"
import { ThunderApi } from "../Axios"

export const LoginDoctor = async (otpUrl:string): Promise<Error | null | any> => {
    try {
        return ThunderApi(otpUrl, LoginDoctorURL, "post")
       
    }
    catch (err) {

        throw err
    }
}

export const LoginUser = async (otpUrl:string): Promise<Error | null | any> => {
    try {
        return  ThunderApi(otpUrl, LoginUserURL, "post")
    }
    catch (err) {
        throw err
    }
}
export const LoginOwner = async (otpUrl:string): Promise<Error | null | any> => {
    try {
        return  ThunderApi(otpUrl, LoginOwnerURL, "post")
       
    }
    catch (err) {
        throw err
    }
}