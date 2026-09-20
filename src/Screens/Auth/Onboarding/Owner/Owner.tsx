
import { useState } from "react";
import toast from "react-hot-toast";

import { OwnerForm, type OwnerFormData } from "./Owner.form";
import { InputOTPForm } from "@/Screens/OTP/Otp.form";

import validateOwnerData from "./validation/Owner.register";
import { RegisterOwner as RegisterOwnerApi, VerifyOwnerRegistration as VerifyOwnerRegistrationApi } from "@/Service/Auth/Register";
import { ExtractErrorPayload } from "@/utils/ExtractErrorMsg";
import { UseOnboardingStore } from "../Store/onboarding.store";
import { useShallow } from "zustand/react/shallow"

const initialValues: OwnerFormData = {
    name: "",
    mobile: "",
    address: "",
    password: "",
    email: "",
    aadhaarNumber: "",
    photo: null,
    gender: "",
};

const emptyErrorValues: Record<keyof OwnerFormData, string> = {
    name: "",
    mobile: "",
    address: "",
    password: "",
    email: "",
    aadhaarNumber: "",
    photo: "",
    gender: "",
}
export const Owner = () => {
    const [owner, setOwner] = useState<OwnerFormData>(initialValues);
    const [errors, setErrors] = useState<typeof emptyErrorValues>(emptyErrorValues);
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
        value: string | File | null;
    }) => {
        setOwner((prev) => ({
            ...prev,
            [key]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [key]: "",
        }));
    };

    const handleSubmit = () => {
        const validationErrors = validateOwnerData(owner);
        console.log(owner)
        if (validationErrors) {
            setErrors((prev) => ({
                ...prev,
                ...validationErrors,
            }));
            return;
        }

        // TODO:
        // Call Send OTP API here if required
        const finalPayload = new FormData()
        Object.entries(owner).forEach(([key, val]) => {
            console.log(key, val)
            if (Array.isArray(val)) {
                //individually append the multiple specialization certificates
                val.forEach((val) => {
                    finalPayload.append(key, val)
                })
            }
            finalPayload.append(key, val)
        })


        toast.promise(RegisterOwnerApi(finalPayload as any), {
            loading: "Submitting Data...",
            success: () => {
                hideUserTabs(false)
                setFormStage(2);
                return "Now Verify Email"
            },
            error: (err) => ExtractErrorPayload(err).message
        })

    };

    const handleOtpSubmit = async (otp: string) => {
        try {
            setLoading(true);
            console.log(owner)
            await toast.promise(
                VerifyOwnerRegistrationApi(`"${otp}"` as any),
                {
                    loading: "Creating account...",
                    success: "Owner registered successfully",
                    error: (err) => ExtractErrorPayload(err).message,
                }
            );

            setOwner(initialValues);
            setErrors(emptyErrorValues);
            setFormStage(1);
            hideUserTabs(false)
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = () => {
        // TODO:
        // Call resend OTP API

        toast.success("OTP sent again.");
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
                <OwnerForm
                    values={owner}
                    errors={errors}
                    loading={loading}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    title="Register as Clinic Owner"
                    subtitle="Fill in your information to create your clinic owner account."
                    buttonText="Continue"
                />
            );

        case 2:
            return (
                <InputOTPForm
                    title="Verify Your Email Address"
                    otpSentTo={owner.email}
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