import { FetchClinicsUrl } from "@/constants"
import { ThunderApi } from "../Axios"

export const FetchClinics = async (): Promise<any> => {
        const response = await ThunderApi(null, FetchClinicsUrl, "get")
        return response
}