import {useContext } from "react"
import AppointmentContext from "../Store/AppointmentForm.store"

export const useAppointmentStore = () => {
    const context = useContext(AppointmentContext)
    if (!context) {
        throw new Error("Context value appointmentForm cannot be falsy")
    }
    console.log("updated state is", context.formData)
    return { formState: { data: context.formData, errors: context.formErrors }, updateFormState: context.updateAppointmentState }
}