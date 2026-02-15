import { FetchBookedSlotsUrl } from "@/constants"
import { ThunderApi } from "../Axios"

export const FetchBookedSlots=async(data:any):Promise<any>=>{
    return ThunderApi(data,FetchBookedSlotsUrl,"post")
}