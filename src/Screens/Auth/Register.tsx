
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { User } from "./Register/User"
import { Doctor } from "./Register/Doctor"
import { Owner } from "./Register/Owner"
export const Register = () => {
    const [userType, setUserType] = useState<string>("User")
    const handleUserChange = (option: string) => {
        setUserType(option)
    }



    const userOptions = ["User", "Clinic Owner", "Doctor"]

    const userTypeFormMapper = (): React.ReactNode => {
        switch (userType) {
            case "User":
                return <User />
            case "Clinic Owner":
                return <Owner />
            case "Doctor":
                return <Doctor />
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="px-2 cursor-pointer w-full md:w-fit py-3 rounded-md bg-primary">Register</DialogTrigger>
            <DialogContent className="min-h-[screen] px-1">
                <DialogHeader >
                    <DialogTitle className="text-center">Register To Get Started</DialogTitle>
                    <DialogDescription className="text-center">
                        Choose User Type To Register As
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center items-center">
                    <Tabs defaultValue="user">
                        <TabsList variant="default" className="">
                            {userOptions.map((option, index) => (
                                <TabsTrigger key={index} className="p-4" value={option} onClick={() => handleUserChange(option)} >{option}</TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
                
                <div className="no-scrollbar max-h-[60vh] w-full  overflow-y-auto ">
                    {userTypeFormMapper()}
                </div>
            </DialogContent>
        </Dialog>
    )
}