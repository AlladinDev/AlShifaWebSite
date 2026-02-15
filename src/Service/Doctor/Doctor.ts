import { FetchDoctorsUrl } from "@/constants"
import { ThunderApi } from "../Axios"

export const FetchDoctors = async (): Promise<any> => {
    const response = await ThunderApi(null, FetchDoctorsUrl, "get")
    return response
}