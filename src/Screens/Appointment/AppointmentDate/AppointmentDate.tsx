import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react"
import { UseAppointmentState } from "../Hooks/UseAppointmentState"
import { FetchBookedSlots } from "@/Service/Appointments/Appointment"

type ISlotsBooked = {
    bookingDate: Date,
    doctorID: string,
    clinicID: string,
}
const parseBookedDates = (data: ISlotsBooked[]) => {
    if (!data) {
        return { dates: [], error: new Error("bookedSlots api response is falsy") }
    }
    if (!data.length) {
        return { dates: [], error: null }
    }

    //now try to parse ISlotsBooked in data
    const dates = data.map((slot) => slot?.bookingDate);
    //lets us suppose in api slot.bookingDate doesnt  exists so dates will be an array of empty strings so this is a runtime check
    if (dates.includes("" as any)) {
        return { dates: [], error: new Error("Booked Slots from api has some objects but some doesnt have bookingDate field") }
    }
    return { dates, error: null };
}

export const AppointmentDateSelector = () => {
    const { formState, updateFormState } = UseAppointmentState()
    const [bookedDates, setBookedDates] = useState<Date[]>([])

    useEffect(() => {
        const fetchBookedSlots = async () => {
            //this should only fetch when user has selected a clinic and doctor
            if (!formState.data.clinic) {
                return
            }

            const payload = {
                clinicID: formState.data.clinic,
                doctorID: formState.data.doctor,
                maxAppointments: formState.data.maxAppointments
            }
            try {
                const response = await FetchBookedSlots(payload) as ISlotsBooked[]
                const { dates, error } = parseBookedDates(response)
                if (error) {
                    console.warn(error)
                    return
                }

                setBookedDates(dates)

            }
            catch (err) {
                console.log(err?.cause)
            }

        }

        fetchBookedSlots()
    }, [formState.data.clinic])

    const todaysDate = new Date()
    const maxDate = new Date()
    maxDate.setDate(todaysDate.getDate() + 28)
    console.log(todaysDate, maxDate)

    const handleDateChange = (date:Date|undefined) => {
        console.log(date)
        if (!formState.data.clinic || !formState.data.doctor) {
            return window.alert("Select doctor and clinic first")
        }

        if (!date){
            window.alert("select a date it cannot be empty")
        }

        updateFormState({key:"appointmentDate",value:date as any})
    }
    return (
        <div>
            <Calendar mode="single" selected={todaysDate} onSelect={handleDateChange} className="rounded-md" disabled={[{ before: todaysDate, after: maxDate }, bookedDates]} />
        </div>
    )
}