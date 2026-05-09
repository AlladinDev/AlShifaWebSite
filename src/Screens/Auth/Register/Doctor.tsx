import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FormInput } from "@/CustomComponents/FormInput"
import { useState } from "react"
import { User, Phone, Mail, Lock, MapPin, Briefcase, GraduationCap, Stethoscope } from "lucide-react"
import toast from "react-hot-toast"
import { RegisterDoctor } from "@/Service/Auth/RegisterUser"
import { ExtractErrorPayload } from "@/utils/ExtractErrorMsg"
import { validateDoctor } from "./validations/Doctor.register"
import type { IDoctor } from "./types/types"

const emptyUserData = {
    name: "",
    address: "",
    password: "",
    email: "",
    gender: "",
    mobile: "",
    experience: "",
    workingAt: "",
    qualifications: "",
    post: ""
}
export const DoctorForm = () => {
    const [userData, setUserData] = useState<IDoctor>(emptyUserData)

    const [formErrors, setFormErrors] = useState<IDoctor>(emptyUserData)


    const handleInputChange = ({ key, value }: { key: string, value: string }) => {
        setUserData({ ...userData, [key]: value })


        //delete the error associated with this field
        setFormErrors({ ...formErrors, [key]: "" })
    }

    const handleSubmit = () => {
        console.log(userData)

        //do some validations
        const validationErrors = validateDoctor(userData)
        if (validationErrors != null) {
            setFormErrors(validationErrors as Record<keyof IDoctor, string>)
            return
        }
        toast.promise(RegisterDoctor(userData), {
            success: "Doctor Registered Successfully",
            loading: "Registering Doctor....",
            error: (err) => ExtractErrorPayload(err).message
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-1  md:p-4">
            <Card className="w-full max-w-2xl p-6 shadow-xl rounded-2xl">

                <h5 className="text-center font-semibold text-2xl">
                    Register as Doctor
                </h5>

                {/* 🔹 Personal Info */}
                <div className="space-y-4">
                    <h6 className="text-lg font-medium text-gray-600">Personal Information</h6>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            value={userData.name}
                            inputType="text"
                            changeHandler={handleInputChange}
                            label="Full Name"
                            error={formErrors.name}
                            name="name"
                            icon={<User size={18} />}
                        />

                        <FormInput
                            value={userData.mobile}
                            inputType="tel"
                            error={formErrors.mobile}
                            changeHandler={handleInputChange}
                            label="Mobile Number"
                            name="mobile"
                            icon={<Phone size={18} />}
                        />

                        <FormInput
                            value={userData.email}
                            inputType="email"
                            error={formErrors.email}
                            changeHandler={handleInputChange}
                            label="Email"
                            name="email"
                            icon={<Mail size={18} />}
                        />

                        <FormInput
                            value={userData.password}
                            inputType="password"
                            error={formErrors.password}
                            changeHandler={handleInputChange}
                            label="Password"
                            name="password"
                            icon={<Lock size={18} />}
                        />
                    </div>

                    <FormInput
                        value={userData.address}
                        inputType="text"
                        error={formErrors.address}
                        changeHandler={handleInputChange}
                        label="Address"
                        name="address"
                        icon={<MapPin size={18} />}
                    />

                    {/* Gender */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Gender</label>
                        <select
                            className="h-10 rounded-md border px-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                            value={userData.gender}
                            onChange={(e) =>
                                handleInputChange({ key: "gender", value: e.target.value })
                            }
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="NA">Prefer not to say</option>
                        </select>
                        {formErrors.gender ? <span className="text-red-600">{formErrors.gender}</span> : null}
                    </div>
                </div>

                {/* 🔹 Professional Info */}
                <div className="space-y-4">
                    <h6 className="text-lg font-medium text-gray-600">Professional Information</h6>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            value={userData.qualifications}
                            inputType="text"
                            error={formErrors.qualifications}
                            changeHandler={handleInputChange}
                            label="Qualifications"
                            name="qualifications"
                            icon={<GraduationCap size={18} />}
                        />

                        <FormInput
                            value={userData.post}
                            inputType="text"
                            error={formErrors.post}
                            changeHandler={handleInputChange}
                            label="Specialization / Role"
                            name="post"
                            icon={<Stethoscope size={18} />}
                        />

                        <FormInput
                            value={userData.experience}
                            inputType="number"
                            error={formErrors.experience}
                            changeHandler={handleInputChange}
                            label="Years of Experience"
                            name="experience"
                            icon={<Briefcase size={18} />}
                        />

                        <FormInput
                            value={userData.workingAt}
                            inputType="text"
                            error={formErrors.workingAt}
                            changeHandler={handleInputChange}
                            label="Hospital / Clinic"
                            name="workingAt"
                            icon={<MapPin size={18} />}
                        />
                    </div>
                </div>

                {/* Button */}
                <Button className="cursor-pointer w-full h-11 text-base font-medium" onClick={handleSubmit}>
                    Register
                </Button>


            </Card>
        </div>
    )
}