import { Button } from "@/components/ui/button"
import { Calendar, Menu } from "lucide-react"
import cliniclogo from "../../../public/clinic.jpg"
import { useState } from "react"
type navMiddleItemsType = {
    ItemName: string
}
export const Navbar = () => {
    const navItemSelectedStyling = "relative before:absolute before:-bottom-1 before:rounded-full before:w-full before:bg-primary before:h-1"

    const [selectedNavItem, selectNavItem] = useState("Home")
    const navItems: navMiddleItemsType[] = [
        {
            ItemName: "Home",

        },
        {
            ItemName: "Services",

        },
        {
            ItemName: "About",

        },
        {
            ItemName: "Contact",

        }
    ]



    return (
        <header className="header font-medium  rounded-md sticky top-2 z-20 duration-900 ">
            <div className="text-(--text-black-foreground) flex items-center justify-between  rounded-md px-10  bg-(--black-colour)">
                <div className="w-full max-w-60  lg:w-1/8 text-center bg-primary relative -mb-2 -mt-1.5 inline-block rounded-b-sm  px-6 py-7  before:absolute before:-right-1 before:top-0.5 before:-z-1 before:size-2 before:rotate-45 before:bg-primary after:absolute after:-left-1 after:top-0.5 after:-z-1 after:size-2 after:rotate-45 after:bg-primary  after:block">
                    <h1 className="font-bold text-md flex justify-center items-center gap-2"><img src={cliniclogo} className="size-8 rounded-full" />  AlShifa</h1>
                </div>
                <div className="hidden  cursor-pointer lg:block ">
                    <ul className="flex  justify-around  transition-all duration-900 items-center gap-12">
                        {navItems.map((item, key) => (
                            <li key={key} onClick={()=>selectNavItem(item.ItemName)} className={`${item.ItemName == selectedNavItem ? navItemSelectedStyling : ""}`}>{item.ItemName}</li>
                        ))}
                    </ul>
                </div>
                <div className=" cursor-pointer w-80 flex justify-end   gap-2 lg:justify-end items-center ">
                    <div className="hidden lg:block w-full max-w-62.5 h-full ">
                        <Button className="py-6  w-full ">
                            <Calendar /> Make An Appointment
                        </Button>
                    </div>
                    <Menu className="lg:hidden" size={35} />
                </div>


            </div>
        </header>

    )
}