import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import {
    Info,
    CalendarCheck,
    Home,
    UserCheck,
} from "lucide-react";

export default function FAQSection() {
    return (
        <Card className="w-full flex justify-between items-center flex-col lg:flex-row mx-auto my-16 px-4">
          <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                Frequently Asked Questions
            </h2>
          </div>

            <div className="w-full lg:w-1/2">
                <Accordion type="single" collapsible className="space-y-4">
                    {/* Q1 */}
                    <AccordionItem
                        value="how-it-works"
                        className=" border rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                        <AccordionTrigger className="cursor-pointer px-2 flex items-center gap-3 text-gray-900 font-medium">
                            <Info className="w-5 h-5 text-blue-500" />
                            How does this platform work?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            Our platform <span className="text-blue-600 font-semibold">connects patients with clinics</span>. Patients can browse verified clinics, view doctor availability, and book appointments online. Clinics manage their schedules and confirm bookings through the platform, making healthcare simple and reliable.
                        </AccordionContent>
                    </AccordionItem>

                    {/* Q2 */}
                    <AccordionItem
                        value="making-appointment"
                        className="border rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                        <AccordionTrigger className="cursor-pointer  px-2 flex items-center gap-3 text-gray-900 font-medium">
                            <CalendarCheck className="w-5 h-5 text-green-500" />
                            How can I make an appointment?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            Fill out the <span className="text-green-600 font-semibold">appointment form</span> with your name, address, clinic, doctor (optional), and preferred date. The clinic receives your request and confirms the appointment — simple, fast, and stress-free.
                        </AccordionContent>
                    </AccordionItem>

                    {/* Q3 */}
                    <AccordionItem
                        value="clinic-registration"
                        className="border rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                        <AccordionTrigger className="cursor-pointer px-2 flex items-center gap-3 text-gray-900 font-medium">
                            <Home className="w-5 h-5 text-purple-500" />
                            How can clinics register themselves?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            Clinics create an account, add details like <span className="text-purple-600 font-semibold">clinic name, address, specialties, and doctors</span>. After verification, they appear on the platform and can start receiving patient appointments.
                        </AccordionContent>
                    </AccordionItem>

                    {/* Q4 */}
                    <AccordionItem
                        value="doctor-registration"
                        className="border rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                        <AccordionTrigger className="cursor-pointer px-2 flex items-center gap-3 text-gray-900 font-medium">
                            <UserCheck className="w-5 h-5 text-orange-500" />
                            How can doctors register themselves?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                            Doctors link their profiles to registered clinics, add <span className="text-orange-600 font-semibold">specialties and availability</span>, allowing patients to book appointments directly with them.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </Card>
    );
}
