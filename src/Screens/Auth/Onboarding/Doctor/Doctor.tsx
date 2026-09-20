import { useState } from "react";
import toast from "react-hot-toast";

import { DoctorForm } from "./UI/Doctor.form";
import { InputOTPForm } from "@/Screens/OTP/Otp.form";

import type { IDoctor } from "./types/Doctor.types";

import { validateDoctor } from "./validations/Doctor.validation";
import { RegisterDoctor, VerifyDoctorRegistration as VerifyDoctorRegistrationApi } from "@/Service/Auth/Register";
import { ExtractErrorPayload } from "@/utils/ExtractErrorMsg";
import { UseOnboardingStore } from "../Store/onboarding.store";
import { useShallow } from "zustand/react/shallow"

const emptyDoctor: IDoctor = {
    name: "",
    age: "",
    address: "",
    password: "",
    profilePhoto: null as any,
    specializationCertificates: [],
    nmrNumber: "",
    aadhaarNumber: "",
    email: "",
    gender: "Male",
    mobile: "",
    experience: "",
    workingAt: "",
    qualifications: "",
    post: "",
};

const emptyFormErrors: Record<keyof IDoctor, string> = {
    name: "",
    address: "",
    password: "",
    profilePhoto: "",
    age: "",
    specializationCertificates: "",
    nmrNumber: "",
    aadhaarNumber: "",
    email: "",
    gender: "",
    mobile: "",
    experience: "",
    workingAt: "",
    qualifications: "",
    post: "",
};
export const Doctor = () => {
    const [doctor, setDoctor] = useState<IDoctor>(emptyDoctor);
    const [errors, setErrors] = useState<typeof emptyFormErrors>(emptyFormErrors);
    const [loading, setLoading] = useState(false);

    const { hideUserTabs } = UseOnboardingStore(useShallow((store) => ({
        hideUserTabs: store.hideUserTypeTabs,

    })))

    // 1 = Registration Form
    // 2 = OTP Verification
    const [formStage, setFormStage] = useState(1);

    const handleChange = ({
        key,
        value,
    }: {
        key: string;
        value: string | File | File[] | null;
    }) => {
        setDoctor((prev) => ({
            ...prev,
            [key]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [key]: "",
        }));
    };

    const handleSubmit = () => {

        const validationErrors = validateDoctor(doctor);

        if (validationErrors) {
            setErrors((prev) => ({
                ...prev,
                ...validationErrors,
            }));
            return;
        }

        console.log(doctor)

        //now  map doctor details to formData object
        const finalPayload = new FormData
        Object.entries(doctor).forEach(([key, val]) => {
            console.log(key, val)
            if (Array.isArray(val)) {
                //individually append the multiple specialization certificates
                val.forEach((val) => {
                    finalPayload.append(key, val)
                })
            }
            finalPayload.append(key, val)
        })

        console.log("certificates are", finalPayload.get("specializationCertificates"))

        toast.promise(RegisterDoctor(finalPayload), {
            loading: "Submitting Data....",
            error: (err) => ExtractErrorPayload(err).message,
            success: (res) => {
                console.log(res)
                hideUserTabs(true)
                setFormStage(2);
                return "Account Created Successfully Now Verify Your Email"

            }
        })


    };

    const handleOtpSubmit = async (otp: string) => {
        try {
            setLoading(true);

            await VerifyDoctorRegistrationApi(
                `"${otp}"` as any);

            toast.success("Doctor Registered Successfully");
        } catch (err) {
            toast.error(ExtractErrorPayload(err).message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = () => {
        toast.success("OTP sent again");
        // Call resend OTP API here
    };

    const handleSupport = () => {
        toast("Please contact support.");
    };

    const handleBack = () => {
        hideUserTabs(false)
        setFormStage(1);
    };

    switch (formStage) {
        case 1:
            return (
                <DoctorForm
                    styling="w-full"
                    values={doctor}
                    errors={errors}
                    loading={loading}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    title="Register as Doctor"
                    subtitle="Fill in your personal and professional information to create your account."
                    buttonText="Continue"
                />
            );

        case 2:
            return (
                <InputOTPForm
                    title="Verify Your Email Address"
                    otpSentTo={doctor.email}
                    loading={loading}
                    handleOtpSubmit={handleOtpSubmit}
                    handleResendCode={handleResendOtp}
                    handleContactSupport={handleSupport}
                    handleBack={handleBack}
                />
            );

        default:
            return null;
    }
};