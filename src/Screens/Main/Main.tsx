
import { P } from "@/CustomComponents/P"
import heroimg from "../../assets/hero-img.png"
import { Button } from "@/components/ui/button"
export const MainSection = () => {
    return (
        <div className=' min-h-full py-4 bg-[#b7d8f4] flex flex-col '>
            <div className="flex justify-center items-between flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 h-full pt-20 lg:pt-40 px-4">
                    <div>
                        <h1 className="text-[clamp(0.75rem,1.5vw,1.125rem)] bg-[#aaccf5] max-w-fit px-4 py-1">
                            Welcome To AlShifa
                        </h1>
                      
                        <h1 className="mt-2 lg:mt-0 font-bold font-roboto  leading-tight text-[clamp(2rem,6vw,3.75rem)]">
                            Trusted Care <span className="">for</span>
                        </h1>

                        <h2 className="leading-none text-[clamp(2rem,6vw,3.75rem)] mb-2">
                            Your Wellness <span className="lg:block inline">Journey</span>
                        </h2>

                        <P text="Experience professional medical services tailored to your needs." className="text-[rgb(102,110,130)]" />
                        <P text="Our dedicated team ensures the best care for a healthier tomorrow." className="text-[rgb(102,110,130)]" />
                       <div className="space-x-2  ">
                         <Button className="w-full lg:max-w-fit bg-primary px-10 py-5 cursor-pointer mt-6">Contact Us</Button>
                         <Button className="w-full lg:max-w-fit bg-primary px-10 py-5 cursor-pointer mt-6">Your Appointments</Button>
                       </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 relative">
                    <div className="flex justify-around gap-2 items-center z-10 bg-[#b7b6be] p-1 border border-white/10  rounded-full absolute bottom-1 -left-2 ">
                        <div className="flex justify-center items-center">
                            <img className="size-15 lg:size-20 rounded-full " src={"https://healthora-nextjs.vercel.app/images/avatar.png?dpl=dpl_5VpNQ2H4S8wfjwyHFuvJwiug8jQL"} alt="" />
                            <img className="-ml-4 size-15 lg:size-20 rounded-full  " src={"https://healthora-nextjs.vercel.app/images/avatar1.png?dpl=dpl_5VpNQ2H4S8wfjwyHFuvJwiug8jQL"} alt="" />
                            <img className="-ml-4 size-15 lg:size-20 rounded-full  " src={"https://healthora-nextjs.vercel.app/images/avatar2.png?dpl=dpl_5VpNQ2H4S8wfjwyHFuvJwiug8jQL"} alt="" />
                        </div>
                        <div className="text-white p-2 w-48 ">
                            <h3 className="font-bold text-2xl">120+</h3>
                            <h2 className="font-semibold mt-1">Patients Registered</h2>
                        </div>
                    </div>
                    <img className="relative" src={heroimg} alt="" />
                </div>
            </div>
        </div>
    )
}