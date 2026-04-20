import { RegisterUserUrl } from "@/constants"
import { ThunderApi } from "../Axios"

export const RegisterUser = async (userData: any): Promise<Error | null> => {
    try {
       await ThunderApi(userData, RegisterUserUrl, "post")
       return null

    }
    catch (err) {
       throw err
    }
}