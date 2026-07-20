import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FormInput } from "@/CustomComponents/FormInput"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Mail, Lock, User, Stethoscope, Shield } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { LoginDoctor, LoginOwner, LoginUser } from "@/Service/Auth/Login"
import toast from "react-hot-toast"
import { ExtractErrorPayload } from "@/utils/ExtractErrorMsg"


type ValidationOptions = {
    passwordMinLength?: number;
    passwordMaxLength?: number;
    emailMaxLength?: number;
};

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


    const handleChange = ({ key, value }: { key: string, value: string }) => {
        setFormData({ ...formData, [key]: value })
        setErrors({ ...errors, [key]: "" })
    }



    const saveBearerToken = (loginResponse: any): string => {
        if (typeof loginResponse != "object") {
            console.warn("expected data from login function to be of type object but it is of type", typeof (loginResponse))
            return "Login Failed"
        }

        const { data } = loginResponse
        if (!data) {
            console.warn("data property not found in login response object")
            return "Login Failed"
        }

        localStorage.setItem("JWT_Token", data)
        return "Login Successfull"
    }


    const validateFormData = (
        data: Record<string, string>,
        options: ValidationOptions = {}
    ) => {
        const {
            passwordMinLength = 8,
            passwordMaxLength = 32,
            emailMaxLength = 254,
        } = options;

        const { email = "", password = "" } = data;

        const errors: Record<string, string> = {};

        // Email Validation
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (email.length > emailMaxLength) {
            errors.email = `Email cannot exceed ${emailMaxLength} characters`;
        } else {
            const emailRegex =
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            if (!emailRegex.test(email)) {
                errors.email = "Please enter a valid email address";
            }
        }

        // Password Validation
        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < passwordMinLength) {
            errors.password = `Password must be at least ${passwordMinLength} characters`;
        } else if (password.length > passwordMaxLength) {
            errors.password = `Password cannot exceed ${passwordMaxLength} characters`;
        } else {
            // Minimum 8 chars, one uppercase, one lowercase, one digit, one special character
            const strongPasswordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;

            if (!strongPasswordRegex.test(password)) {
                errors.password =
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
            }


            return errors;
        }

        return errors

    }

    const handleSubmit = async () => {

        //now do  some validations
        const formErrors = validateFormData(formData, { emailMaxLength: 20, passwordMaxLength: 20, passwordMinLength: 8 })
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors as any)
            return
        }

        //now based on user role we have to hit api
        let loginFn: (details: Record<string, string>) => any = LoginUser
        switch (role) {
            case "user":
                {
                    loginFn = LoginUser
                }
                break;
            case "doctor":
                {
                    loginFn = LoginDoctor
                }
                break;
            case "owner":
                {
                    loginFn = LoginOwner
                }
                break;
        }

        toast.promise(loginFn(formData), {
            loading: "Logging in...",
            success: (data: any) => {
                //call the function saveBearerToken to save login token
                saveBearerToken(data)
                return "Login Successfull"
            },
            error: (err) => ExtractErrorPayload(err).message
        })

        console.log(formData, role)
    }

    return (
        <Dialog>
            <DialogTrigger className="px-8 cursor-pointer w-full md:w-fit py-3 rounded-md bg-primary">Login</DialogTrigger>
            <DialogContent className="px-1">

                <Card className="w-full  max-w-md p-8 shadow-2xl rounded-2xl space-y-2 mx-auto">

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
                    <Tabs value={role} onValueChange={(role) => setRole(role)} className="w-full">
                        <TabsList className="grid  grid-cols-3 w-full rounded-lg bg-gray-100 p-1">

                            <TabsTrigger value="user" className="cursor-pointer flex items-center gap-1">
                                <User size={16} /> User
                            </TabsTrigger>

                            <TabsTrigger value="doctor" className=" cursor-pointer flex items-center gap-1">
                                <Stethoscope size={16} /> Doctor
                            </TabsTrigger>

                            <TabsTrigger value="owner" className=" cursor-pointer flex items-center gap-1">
                                <Shield size={16} /> Owner
                            </TabsTrigger>

                        </TabsList>
                    </Tabs>

                    {/* Form */}
                    <div className="max-h-[50vh] p-4 overflow-auto">
                        <div className="my-4">

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
                        <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-gray-500 cursor-pointer hover:underline">
                                Forgot Password?
                            </span>
                        </div>

                        {/* Button */}
                        <Button
                            onClick={handleSubmit}

                            className="w-full h-11 text-base font-medium"
                        >
                            Login
                        </Button>

                        {/* Footer */}
                        <p className="text-center text-sm text-gray-500 mt-2">
                            Don’t have an account?{" "}
                            <span className="text-primary font-medium cursor-pointer hover:underline">
                                Sign up
                            </span>
                        </p>
                    </div>

                </Card>

            </DialogContent>
        </Dialog>
    )
}
