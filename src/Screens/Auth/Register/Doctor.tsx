import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FormInput } from "@/CustomComponents/FormInput"
import { useState } from "react"
import { User, Phone, Mail, Lock, MapPin, Briefcase, GraduationCap, Stethoscope } from "lucide-react"

export const Doctor = () => {
    const [userData, setUserData] = useState({
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
    })

    const handleInputChange = ({ key, value }: { key: string, value: string }) => {
        setUserData({ ...userData, [key]: value })
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
                            name="name"
                            icon={<User size={18} />}
                        />

                        <FormInput
                            value={userData.mobile}
                            inputType="tel"
                            changeHandler={handleInputChange}
                            label="Mobile Number"
                            name="mobile"
                            icon={<Phone size={18} />}
                        />

                        <FormInput
                            value={userData.email}
                            inputType="email"
                            changeHandler={handleInputChange}
                            label="Email"
                            name="email"
                            icon={<Mail size={18} />}
                        />

                        <FormInput
                            value={userData.password}
                            inputType="password"
                            changeHandler={handleInputChange}
                            label="Password"
                            name="password"
                            icon={<Lock size={18} />}
                        />
                    </div>

                    <FormInput
                        value={userData.address}
                        inputType="text"
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
                            <option value="na">Prefer not to say</option>
                        </select>
                    </div>
                </div>

                {/* 🔹 Professional Info */}
                <div className="space-y-4">
                    <h6 className="text-lg font-medium text-gray-600">Professional Information</h6>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            value={userData.qualifications}
                            inputType="text"
                            changeHandler={handleInputChange}
                            label="Qualifications"
                            name="qualifications"
                            icon={<GraduationCap size={18} />}
                        />

                        <FormInput
                            value={userData.post}
                            inputType="text"
                            changeHandler={handleInputChange}
                            label="Specialization / Role"
                            name="post"
                            icon={<Stethoscope size={18} />}
                        />

                        <FormInput
                            value={userData.experience}
                            inputType="number"
                            changeHandler={handleInputChange}
                            label="Years of Experience"
                            name="experience"
                            icon={<Briefcase size={18} />}
                        />

                        <FormInput
                            value={userData.workingAt}
                            inputType="text"
                            changeHandler={handleInputChange}
                            label="Hospital / Clinic"
                            name="workingAt"
                            icon={<MapPin size={18} />}
                        />
                    </div>
                </div>

                {/* Button */}
                <Button className="cursor-pointer w-full h-11 text-base font-medium">
                    Register
                </Button>

              
            </Card>
        </div>
    )
}