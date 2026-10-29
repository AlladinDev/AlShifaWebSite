import { FormInput } from "@/CustomComponents/FormInput";
import { H2 } from "@/CustomComponents/H2";

export const PatientDetails = () => {
  return (
    <div>
      <H2 text="Patient Details" />
      <p className="py-5 text-gray-500">
        Tell us who's coming in. We'll use your phone number to book this
        appointment.
      </p>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="patientName"
          label="Full Name"
          inputType="text"
          value=""
          placeHolder="enter patient name"
          changeHandler={(data: {
            key: string;
            value: string | File | File[] | null;
          }) => {}}
        />

        <FormInput
          name="patientAddress"
          label="Address"
          inputType="text"
          value=""
          placeHolder="enter patient address"
          changeHandler={(data: {
            key: string;
            value: string | File | File[] | null;
          }) => {}}
        />

        <FormInput
          name="patientMobile"
          label="Mobile Number"
          inputType="tel"
          value=""
          placeHolder="enter patient mobile number"
          changeHandler={(data: {
            key: string;
            value: string | File | File[] | null;
          }) => {}}
        />

        <FormInput
          name="patientOTP"
          label="OTP"
          inputType="text"
          value=""
          placeHolder="enter otp for verifying the phone number"
          changeHandler={(data: {
            key: string;
            value: string | File | File[] | null;
          }) => {}}
        />
      </form>
    </div>
  );
};
