import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FormInput } from "@/CustomComponents/FormInput"
import { useState } from "react"
import { User, Phone, Mail, Lock, MapPin } from "lucide-react"

export const Owner = () => {
    const [userData, setUserData] = useState({
        name: "",
        mobile: "",
        address: "",
        password: "",
        email: "",
        gender: "",
    })

    const handleChange = ({ key, value }: { key: string, value: string }) => {
        setUserData({ ...userData, [key]: value })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50  p-1  md:p-4">
            <Card className="w-full max-w-2xl p-6 shadow-xl rounded-2xl ">
                
                <h5 className="text-center font-semibold text-2xl">
                    Register as Owner
                </h5>

                {/* Name */}
                <FormInput 
                    value={userData.name}
                    inputType="text"
                    changeHandler={handleChange}
                    label="User Name"
                    name="name"
                    icon={<User size={18} />}
                />

                {/* Address */}
                <FormInput 
                    value={userData.address}
                    inputType="text"
                    changeHandler={handleChange}
                    label="Address"
                    name="address"
                    icon={<MapPin size={18} />}
                />

                {/* Mobile */}
                <FormInput 
                    value={userData.mobile}
                    inputType="tel"
                    changeHandler={handleChange}
                    label="Mobile Number"
                    name="mobile"
                    icon={<Phone size={18} />}
                />

                {/* Email */}
                <FormInput 
                    value={userData.email}
                    inputType="email"
                    changeHandler={handleChange}
                    label="Email"
                    name="email"
                    icon={<Mail size={18} />}
                />

                {/* Password */}
                <FormInput 
                    value={userData.password}
                    inputType="password"
                    changeHandler={handleChange}
                    label="Password"
                    name="password"
                    icon={<Lock size={18} />}
                />

                {/* Gender */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Gender</label>
                    <select
                        className="h-10 rounded-md border px-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                        name="gender"
                        value={userData.gender}
                        onChange={(e) =>
                            handleChange({ key: "gender", value: e.target.value })
                        }
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="na">Prefer not to say</option>
                    </select>
                </div>

                {/* Button */}
                <Button className="w-full h-11 text-base font-medium">
                    Register
                </Button>

              
            </Card>
        </div>
    )
}