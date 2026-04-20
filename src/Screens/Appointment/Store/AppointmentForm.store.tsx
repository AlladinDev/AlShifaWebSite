import { createContext, useEffect, useState } from "react"
import type { ReactNode } from "react"

//doctor dropdown will show these details
type DoctorDetails = {
    name: string,
    WorkingAt: string,
    Qualifications: string
}

//clinic dropdown will show these details
type ClinicDetails = {
    name: string,
    address: string,
    startTime: string,
    endTime: string
}

//type of appointment state
type AppointmentFormState = {
    maxAppointments: number,
    doctor: string,
    clinic: string,
    appointmentDate: string,
    patientName: string,
    patientAddress: string,
    patientMobile: string,
    doctorDetails: DoctorDetails[],
    clinicDetails: ClinicDetails[]
}

//define errors for appointmentForm
type AppointmentFormStateErrors = Omit<Record<keyof AppointmentFormState, string>, "maxAppointments">

//type for children prop of context
type AppointmentStoreCtxProps = {
    children: ReactNode
}

//type of context  this is what the context will contain it will contain formData ,formErrors and a update function
type AppointmentFormCtx = {
    formData: AppointmentFormState,
    formErrors: AppointmentFormStateErrors,
    updateAppointmentState: ({ key, value }: { key: keyof AppointmentFormState, value: AppointmentFormState[keyof AppointmentFormState] }) => void
}


//initial form state empty values
const EmptyFormState: AppointmentFormState = {
    maxAppointments: 0,
    patientAddress: "",
    patientMobile: "",
    patientName: "",
    clinic: "",
    doctor: "",
    doctorDetails: [],
    clinicDetails: [],
    appointmentDate: "",
}

//initialise formErrors also with empty values
//initial form state empty values
const EmptyFormErrors: AppointmentFormStateErrors = {
    patientAddress: "",
    patientMobile: "",
    patientName: "",
    clinic: "",
    doctor: "",
    doctorDetails: "",
    clinicDetails: "",
    appointmentDate: "",
}

//actual context state which will be shared import this in components
const AppointmentContext = createContext<AppointmentFormCtx | null>(null)

//Context provider for appointment form for managing form state
export const AppointmentStoreCtx = ({ children }: AppointmentStoreCtxProps) => {
    const [formState, setAppointmentState] = useState<{ formData: AppointmentFormState, formErrors: AppointmentFormStateErrors }>({ formData: EmptyFormState, formErrors: EmptyFormErrors })

    //update function which will actually update the context state
    const updateAppointmentState = ({ key, value }: { key: keyof AppointmentFormState, value: AppointmentFormState[keyof AppointmentFormState] }) => {
        //here get the key which is updated in form and delete its error if any
        console.log("key,value recieved in store is",key,value)
        setAppointmentState((prevState) => ({ formData: { ...prevState.formData, [key]: value }, formErrors: { ...prevState.formErrors, [key]: "" } }))
    }

    useEffect(()=>{
        console.log('form updated',formState.formData)
    },[formState.formData])

    return (
        <AppointmentContext.Provider value={{ formData: formState.formData, formErrors: formState.formErrors, updateAppointmentState }}>
            {children}
        </AppointmentContext.Provider>
    )
}

export default AppointmentContext
