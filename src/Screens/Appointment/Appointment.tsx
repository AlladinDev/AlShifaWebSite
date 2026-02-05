import { Eye, Headset, ShieldIcon, Users } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Appointment = () => {
    return (
        <Card className="p-2 flex justify-between items-center flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
            <h2 className="font-semibold text-gray-900 text-lg bg-[#aaccf5] px-4 py-1 max-w-fit rounded-md mb-12">Appointment Section</h2>
                <div className="grid gap-6 max-w-xl">
                    {/* Item 1 */}
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                            <Users size={22} />
                        </div>
                        <div>
                            <h5 className="font-semibold text-gray-900 text-lg">
                                Welcoming New Patients Seamlessly
                            </h5>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We help clinics connect with new patients by making appointment booking
                                simple, accessible, and hassle-free from the very first interaction.
                            </p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-4">
                        <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                            <ShieldIcon size={22} />
                        </div>
                        <div>
                            <h5 className="font-semibold text-gray-900 text-lg">
                                Trusted & Reliable Clinic Network
                            </h5>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We partner with verified clinics that follow established medical
                                standards, helping patients choose healthcare providers with confidence.
                            </p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-4">
                        <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                            <Eye size={22} />
                        </div>
                        <div>
                            <h5 className="font-semibold text-gray-900 text-lg">
                                Specialized Care Discovery
                            </h5>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Easily find clinics offering specialized services, including eye care,
                                and book appointments based on availability and patient needs.
                            </p>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-start gap-4">
                        <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
                            <Headset size={22} />
                        </div>
                        <div>
                            <h5 className="font-semibold text-gray-900 text-lg">
                                Platform Support & Assistance
                            </h5>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Our support team is available to assist users with bookings, clinic
                                listings, and platform-related questions — whenever needed.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="w-full lg:w-1/2 ">
                <Card className="shadow-lg border bg-[#ecf1ff]">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Book an Appointment
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                            Fill in your details and we’ll connect you with the clinic.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        {/* Patient Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Enter your full name" />
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" placeholder="Enter your address" />
                        </div>

                        {/* Clinic Name */}
                        <div className="space-y-2">
                            <Label htmlFor="clinic">Clinic Name</Label>
                            <Input id="clinic" placeholder="Select or enter clinic name" />
                        </div>

                        {/* Doctor Name */}
                        <div className="space-y-2">
                            <Label htmlFor="doctor">Doctor Name</Label>
                            <Input id="doctor" placeholder="Enter doctor name (optional)" />
                        </div>

                        {/* Appointment Date */}
                        <div className="space-y-2">
                            <Label htmlFor="date">Appointment Date</Label>
                            <Input id="date" type="date" />
                        </div>

                        {/* Submit Button */}
                        <Button className="w-full mt-4">
                            Book Appointment
                        </Button>
                    </CardContent>
                </Card>
            </div>

        </Card>
    )
}