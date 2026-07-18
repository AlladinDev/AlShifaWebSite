import { LoginDoctorURL,LoginOwnerURL,LoginUserURL } from "@/constants"
import { ThunderApi } from "../Axios"

export const LoginDoctor=async(loginDetails:Record<string,string>):Promise<Error|null>=>{
    try{
        await ThunderApi(loginDetails,LoginDoctorURL,"post")
        return null
    }
    catch(err){
        throw err
    }
}

export const LoginUser=async(loginDetails:Record<string,string>):Promise<Error|null>=>{
    try{
        await ThunderApi(loginDetails,LoginUserURL,"post")
        return null
    }
    catch(err){
        throw err
    }
}
export const LoginOwner=async(loginDetails:Record<string,string>):Promise<Error|null>=>{
    try{
        await ThunderApi(loginDetails,LoginOwnerURL,"post")
        return null
    }
    catch(err){
        throw err
    }
}