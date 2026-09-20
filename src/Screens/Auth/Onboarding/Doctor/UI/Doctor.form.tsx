
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormInput } from "@/CustomComponents/FormInput";
import {
    User,
    Phone,
    Mail,
    Lock,
    MapPin,
    Briefcase,
    GraduationCap,
    Stethoscope,
    CreditCard,
    BadgeCheck,
    Image,
    FileText,
} from "lucide-react";
import type { IDoctor } from "../types/Doctor.types";

interface DoctorFormProps {
    values: IDoctor;
    errors: Partial<Record<keyof IDoctor, string>>;

    onChange: (data: { key: string; value: string | File | File[]|null }) => void;
    onSubmit: () => void;

    styling?: string;
    loading?: boolean;

    title?: string;
    subtitle?: string;
    buttonText?: string;
}

export const DoctorForm = ({
    values,
    errors,
    onChange,
    styling,
    onSubmit,
    loading = false,
    title = "Register as Doctor",
    subtitle = "Fill in your personal and professional details to continue.",
    buttonText = "Register",
}: DoctorFormProps) => {
    return (
        <Card
            className={`w-full max-w-4xl rounded-2xl border p-6 shadow-xl md:p-8 ${styling}`}
        >
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold">{title}</h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    {subtitle}
                </p>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
                <h3 className="mb-5 text-lg font-semibold">
                    Personal Information
                </h3>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <FormInput
                        value={values.name}
                        inputType="text"
                        changeHandler={onChange}
                        label="Full Name"
                        error={errors.name}
                        name="name"
                        icon={<User size={18} />}
                    />

                    <FormInput
                        value={values.mobile}
                        inputType="tel"
                        changeHandler={onChange}
                        label="Mobile Number"
                        error={errors.mobile}
                        name="mobile"
                        icon={<Phone size={18} />}
                    />

                    <FormInput
                        value={values.email}
                        inputType="email"
                        changeHandler={onChange}
                        label="Email Address"
                        error={errors.email}
                        name="email"
                        icon={<Mail size={18} />}
                    />

                    <FormInput
                        value={values.password}
                        inputType="password"
                        changeHandler={onChange}
                        label="Password"
                        error={errors.password}
                        name="password"
                        icon={<Lock size={18} />}
                    />

                    <FormInput
                        value={values.age}
                        inputType="text"
                        changeHandler={onChange}
                        label="Age"
                        error={errors.age}
                        name="age"
                        icon={<MapPin size={18} />}
                    />

                    <FormInput
                        value={values.address}
                        inputType="text"
                        changeHandler={onChange}
                        label="Address"
                        error={errors.address}
                        name="address"
                        icon={<MapPin size={18} />}
                    />

                    
                    <FormInput
                        value={values.aadhaarNumber}
                        inputType="text"
                        changeHandler={onChange}
                        label="Aadhaar Number"
                        error={errors.aadhaarNumber}
                        name="aadhaarNumber"
                        icon={<CreditCard size={18} />}
                    />

                    <div className="flex flex-col gap-1 py-3">
                        <label className="text-sm font-medium">
                            Gender
                        </label>

                        <select
                            value={values.gender}
                            onChange={(e) =>
                                onChange({
                                    key: "gender",
                                    value: e.target.value,
                                })
                            }
                            className="h-10 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        {errors.gender && (
                            <span className="text-sm text-red-500">
                                {errors.gender}
                            </span>
                        )}
                    </div>

                    {/* Profile Photo */}
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm font-medium">
                            Profile Photo
                        </label>

                        <div className="relative">
                            <Image
                                size={18}
                                className="absolute left-3 top-3 text-muted-foreground"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];

                                    if (file) {
                                        onChange({
                                            key: "profilePhoto",
                                            value: file,
                                        });
                                    }
                                }}
                                className="w-full rounded-md border py-2 pl-10 pr-3 text-sm"
                            />
                        </div>
                        <div className="text-primary">
                            {values.profilePhoto?.name}
                        </div>

                        {errors.profilePhoto && (
                            <span className="text-sm text-red-500">
                                {errors.profilePhoto}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Professional Information */}
            <div className="mb-8">
                <h3 className="mb-5 text-lg font-semibold">
                    Professional Information
                </h3>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <FormInput
                        value={values.qualifications}
                        inputType="text"
                        changeHandler={onChange}
                        label="Qualifications"
                        error={errors.qualifications}
                        name="qualifications"
                        icon={<GraduationCap size={18} />}
                    />

                    <FormInput
                        value={values.post}
                        inputType="text"
                        changeHandler={onChange}
                        label="Specialization / Role"
                        error={errors.post}
                        name="post"
                        icon={<Stethoscope size={18} />}
                    />

                    <FormInput
                        value={values.experience}
                        inputType="text"
                        changeHandler={onChange}
                        label="Years of Experience"
                        error={errors.experience}
                        name="experience"
                        icon={<Briefcase size={18} />}
                    />

                    <FormInput
                        value={values.workingAt}
                        inputType="text"
                        changeHandler={onChange}
                        label="Hospital / Clinic"
                        error={errors.workingAt}
                        name="workingAt"
                        icon={<MapPin size={18} />}
                    />

                    <FormInput
                        value={values.nmrNumber}
                        inputType="text"
                        changeHandler={onChange}
                        label="National Medical Registration Number"
                        error={errors.nmrNumber}
                        name="nmrNumber"
                        icon={<BadgeCheck size={18} />}
                    />



                    {/* Specialization Certificates */}
                    <div className="flex flex-col  py-3">
                        <label className="text-sm font-medium">
                            Specialization Certificates
                        </label>

                        <div className="relative">
                            <FileText
                                size={18}
                                className="absolute left-3 top-3 text-muted-foreground"
                            />

                            <input
                                type="file"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const files = Array.from(
                                        e.target.files || []
                                    );

                                    onChange({
                                        key: "specializationCertificates",
                                        value: files,
                                    });
                                }}
                                className="w-full rounded-md border py-2 pl-10 pr-3 text-sm"
                            />
                        </div>
                        <div className="text-primary">
                            {values.specializationCertificates?.length > 0 ? `${values.specializationCertificates?.length} Files Selected` : ""}
                        </div>

                        {errors.specializationCertificates && (
                            <span className="text-sm text-red-500">
                                {errors.specializationCertificates}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <Button
                className="h-11 w-full text-base font-semibold"
                disabled={loading}
                onClick={onSubmit}
            >
                {loading ? "Please wait..." : buttonText}
            </Button>
        </Card>
    );
};