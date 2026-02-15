import { use } from "react"
import AppointmentContext from "../Store/AppointmentForm.store"

export const UseAppointmentState = () => {
    const context = use(AppointmentContext)
    if (!context) {
        throw new Error("Context value appointmentForm cannot be falsy")
    }
    return {formState:{data:context.formData,errors:context.formErrors},updateFormState:context.updateAppointmentState}
}