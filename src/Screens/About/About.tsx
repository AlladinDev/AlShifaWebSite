import { CalendarCheck, Clock, Contact, HeartIcon, HeartPlus, Hospital, Shield, UserCheck } from "lucide-react"
import aboutImg1 from "../../assets/about-img1.png"
import aboutImg2 from "../../assets/about-img2.png"

export const About = () => {
    return (
        <div className="flex my-4 p-2 flex-col lg:flex-row justify-between items-center min-h-screen">

            {/* Image container */}
            <div className="w-full lg:w-12/20 mb-20 relative flex justify-between">
                <div className="w-full relative max-w-[60%] lg:max-w-sm ">
                    <img
                        src={aboutImg1}
                        alt=""
                        className="w-full "
                    />
                    <div className="bg-primary absolute -top-5  -right-12 size-30 outline-4  outline-white flex justify-center items-center  flex-col rounded-full text-white font-bold">
                        <h1 className="text-2xl">20+</h1>
                        <h4>Clinics</h4>
                    </div>
                </div>

                <img
                    src={aboutImg2}
                    alt=""
                    className="
        absolute
        left-[30%]
        
         -bottom-20 
         aspect-video max-w-[60%]
      "
                />
            </div>

            {/* Right content section */}
            <div className="w-full  flex-1 lg:w-1/2 mt-10 lg:mt-0">
                <div className="w-full flex-1 lg:w-1/2lg:mt-0 ">
                    {/* Badge */}
                    <h2 className="bg-[#aaccf5] text-black flex items-center gap-2 mb-2 max-w-fit rounded-full px-5 py-1.5 text-sm font-semibold shadow-sm">
                        <HeartPlus className="animate-pulse" />
                        About Us
                    </h2>

                    {/* Main Heading */}
                    <h4 className="font-bold leading-tight text-[clamp(2.2rem,3vw,3.9rem)] text-gray-900">
                        Connecting Trusted Healthcare
                        <span className="font-semibold block text-blue-600">With People Who Need It</span>
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                        We make healthcare simple and accessible by connecting patients with
                        verified clinics and experienced doctors. Our smart appointment system
                        removes long waiting times and helps you get care when you need it most.
                    </p>

                    {/* Feature List */}
                    <div className="grid gap-5 max-w-xl py-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                                <CalendarCheck size={22} />
                            </div>
                            <div>
                                <h5 className="font-semibold text-gray-900">
                                    Easy Appointment Booking
                                </h5>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Book, reschedule, or cancel clinic appointments instantly with real-time availability.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                                <UserCheck size={22} />
                            </div>
                            <div>
                                <h5 className="font-semibold text-gray-900">
                                    Verified Doctors & Clinics
                                </h5>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Access trusted healthcare professionals with verified credentials and experience.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                                <Clock size={22} />
                            </div>
                            <div>
                                <h5 className="font-semibold text-gray-900">
                                    Save Time & Avoid Waiting
                                </h5>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Skip long queues and get treated on schedule with smart time-slot management.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-red-100 text-red-600 p-3 rounded-xl">
                                <Shield size={22} />
                            </div>
                            <div>
                                <h5 className="font-semibold text-gray-900">
                                    Secure & Patient-Friendly
                                </h5>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Your data is protected with secure systems designed for patient privacy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}