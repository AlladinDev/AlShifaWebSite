import { FormInput } from "@/CustomComponents/FormInput";
import { H2 } from "@/CustomComponents/H2";
import { useAppointmentStore } from "../store/appointment";
import { useShallow } from "zustand/react/shallow";
export const PatientDetailsForm = () => {
  const {addAppointmentData,patientAddress,patientAge,patientName} = useAppointmentStore(useShallow((state) => ({
    addAppointmentData: state.addAppointmentDate,
    patientAddress: state.appointmentData.patientAddress,
    patientName: state.appointmentData.patientName,
    patientAge:state.appointmentData.patientAge
  })))

  const changeHandler = (data: {
    key: string;
    value: string | File | File[] | null;
  }) => {
    const {key,value}=data
    addAppointmentData({[key]:value})
  };

  return (
    <div className="">
      <H2 text="Patient Details"/>
      <FormInput
        label="Patient Name"
        name="patientName"
        inputType="text"
        value={patientName}
        changeHandler={changeHandler}
      />
      <FormInput

        label="Patient Address"
        name="patientAddress"
        inputType="text"
        value={patientAddress}
        changeHandler={changeHandler}
      />
      <FormInput
        label="Patient Age"
        name="patientAge"
        inputType="tel"
        value={patientAge}
        changeHandler={changeHandler}
      />
    </div>
  );
};
