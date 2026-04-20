import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FormInput } from "@/CustomComponents/FormInput"

import { useState } from "react"
import { User as UserIcon, Phone, Mail, Lock, MapPin } from "lucide-react"
import { LoginDialogStore } from "../Login/Store/Login"
import { ValidateUserRegistration } from "./validations/User.register"
import toast from "react-hot-toast"
import { RegisterUser } from "@/Service/Auth/RegisterUser"
import { ExtractErrorPayload } from "@/utils/ExtractErrorMsg"
const dummyFormData = {
    name: "",
    mobile: "",
    address: "",
    password: "",
    email: ""
}
export const User = () => {
    const { toggleDialog } = LoginDialogStore()

    const [userData, setUserData] = useState(dummyFormData)

    const [formErrors, setFormErrors] = useState(dummyFormData)

    const handleChange = ({ key, value }: { key: string, value: string }) => {
        setUserData({ ...userData, [key]: value })

        //delete the error for this input field
        setFormErrors({ ...formErrors, [key]: "" })
    }

    const handleSubmit = () => {
        console.log(userData)
        const validationErrors = ValidateUserRegistration(userData)
        if (validationErrors) {
            toast.error("validation Errors")
            console.log("validation errors",validationErrors)
            setFormErrors(validationErrors)
            return
        }

        toast.promise(RegisterUser(userData), {
            loading: "Registering User",
            error: (err) => ExtractErrorPayload(err).message,
            success: "User Registered Successfully"
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-1  md:p-4">

            <Card className="w-full  max-w-2xl p-6 shadow-xl rounded-2xl">

                {/* Header */}
                <div className="text-center space-y-1">
                    <h5 className="text-center font-semibold text-2xl">
                        Register as User
                    </h5>

                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <FormInput
                        value={userData.name}
                        inputType="text"
                        changeHandler={handleChange}
                        label="Full Name"
                        name="name"
                        error={formErrors.name}
                        icon={<UserIcon size={18} />}
                    />

                    <FormInput
                        value={userData.address}
                        inputType="text"
                        changeHandler={handleChange}
                        label="Address"
                        name="address"
                        error={formErrors.address}
                        icon={<MapPin size={18} />}
                    />

                    <FormInput
                        value={userData.mobile}
                        inputType="tel"
                        changeHandler={handleChange}
                        label="Mobile Number"
                        name="mobile"
                        error={formErrors.mobile}
                        icon={<Phone size={18} />}
                    />

                    <FormInput
                        value={userData.email}
                        inputType="email"
                        changeHandler={handleChange}
                        label="Email Address"
                        name="email"
                        error={formErrors.email}
                        icon={<Mail size={18} />}
                    />

                    <FormInput
                        value={userData.password}
                        inputType="password"
                        changeHandler={handleChange}
                        label="Password"
                        error={formErrors.password}
                        name="password"
                        icon={<Lock size={18} />}
                    />
                </div>

                {/* Divider */}
                <div className="border-t pt-3" />

                {/* Button */}
                <Button className="w-full h-11 text-base font-medium" onClick={handleSubmit}>
                    Create Account
                </Button>



            </Card>
        </div>
    )
}