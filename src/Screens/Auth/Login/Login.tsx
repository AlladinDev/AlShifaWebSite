import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FormInput } from "@/CustomComponents/FormInput"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Mail, Lock, User, Stethoscope, Shield } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { LoginDialogStore } from "./Store/Login"

export const Login = () => {

    const [role, setRole] = useState("user")

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const { isOpen, toggleDialog } = LoginDialogStore()

    const handleChange = ({ key, value }: { key: string, value: string }) => {
        setFormData({ ...formData, [key]: value })
        setErrors({ ...errors, [key]: "" })
    }

    const validate = () => {
        let newErrors = { email: "", password: "" }
        let isValid = true

        if (!formData.email) {
            newErrors.email = "Email is required"
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email"
            isValid = false
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
            isValid = false
        } else if (formData.password.length < 6) {
            newErrors.password = "Minimum 6 characters required"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async () => {
        if (!validate()) return

        setIsSubmitting(true)

        try {
            await new Promise((res) => setTimeout(res, 1500))

            console.log("Login success", { ...formData, role })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={toggleDialog}>
            <DialogTrigger className="px-8 cursor-pointer w-full md:w-fit py-3 rounded-md bg-primary">Login</DialogTrigger>
            <DialogContent className="px-1">
                <div className="max-h-[80vh] overflow-y-auto">
                <Card className="w-full max-w-md p-8 shadow-2xl rounded-2xl space-y-2">

                    {/* Header */}
                    <div className="text-center space-y-1">
                        <h5 className="font-semibold text-2xl">
                            Welcome Back
                        </h5>
                        <p className="text-sm text-gray-500">
                            Login to your account
                        </p>
                    </div>

                    {/* 🔥 Role Tabs */}
                    <Tabs value={role} onValueChange={setRole} className="w-full">
                        <TabsList className="grid grid-cols-3 w-full rounded-lg bg-gray-100 p-1">

                            <TabsTrigger value="user" className="flex items-center gap-1">
                                <User size={16} /> User
                            </TabsTrigger>

                            <TabsTrigger value="doctor" className="flex items-center gap-1">
                                <Stethoscope size={16} /> Doctor
                            </TabsTrigger>

                            <TabsTrigger value="owner" className="flex items-center gap-1">
                                <Shield size={16} /> Owner
                            </TabsTrigger>

                        </TabsList>
                    </Tabs>

                    {/* Form */}
                    <div className="space-y-4">

                        {/* Email */}
                        <div>
                            <FormInput
                                value={formData.email}
                                inputType="email"
                                changeHandler={handleChange}
                                label="Email Address"
                                name="email"
                                error={errors.email}
                                icon={<Mail size={18} />}
                            />
                           
                        </div>

                        {/* Password */}
                        <div>
                            <FormInput
                                value={formData.password}
                                inputType="password"
                                changeHandler={handleChange}
                                label="Password"
                                name="password"
                                error={errors.password}
                                icon={<Lock size={18} />}
                            />
                           
                        </div>

                    </div>

                    {/* Extra actions */}
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 cursor-pointer hover:underline">
                            Forgot Password?
                        </span>
                    </div>

                    {/* Button */}
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full h-11 text-base font-medium"
                    >
                        {isSubmitting ? "Logging in..." : `Login as ${role}`}
                    </Button>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500">
                        Don’t have an account?{" "}
                        <span className="text-primary font-medium cursor-pointer hover:underline">
                            Sign up
                        </span>
                    </p>

                </Card>
                </div>
            </DialogContent>
        </Dialog>
    )
}