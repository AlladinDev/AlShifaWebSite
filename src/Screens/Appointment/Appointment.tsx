
import { AppointmentForm } from "./AppointmentForm/Form";
import { AppointmentStoreCtx } from "./Store/AppointmentForm.store";

export const Appointment = () => {
    return (
        <AppointmentStoreCtx>
            <AppointmentForm />
        </AppointmentStoreCtx>
    )
}