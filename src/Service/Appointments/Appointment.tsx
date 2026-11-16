import { FetchBookedSlotsUrl } from "@/constants"
import { ThunderApi } from "../Axios"
import type { ApiSuccess } from "@/Types/ApiSuccess"
import type { ApiError } from "@/Types/ApiError"


export const FetchBookedSlots=async(data:unknown):Promise<ApiSuccess|ApiError|unknown>=>{
    return ThunderApi(data,FetchBookedSlotsUrl,"post")
}
