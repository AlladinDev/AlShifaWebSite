import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";

export const ClinicSelection = () => {
  const clinics = [
    {
      id: "696c7b62a4d15b026ebd21e0",
      registrationDate: "2026-01-18T06:19:14.025Z",
      name: "Muadat Clinic",
      address: "Nishat",
      seasonTimings: [
        { start: "06:00 AM", end: "08:00 PM", name: "Summer" },
        { start: "09:00 AM", end: "05:00 PM", name: "Winter" },
      ],
      mobile: 9797798243,
      pincode: 190011,
      OwnerDetails: {
        name: "Khalid",
        address: "Soura",
        mobile: 9797798240,
      },
      DoctorDetails: [],
      planType: "Paid",
      maxAppointments: 30,
      verified: false,
    },
    {
      id: "698c57737c775dced7df8c80",
      registrationDate: "2026-02-11T10:18:27.092Z",
      name: "Neurogen Clinic",
      address: "Nowshara Srinagar",
      seasonTimings: [
        { start: "06:00 AM", end: "08:00 PM", name: "Summer" },
        { start: "09:00 AM", end: "05:00 PM", name: "Winter" },
      ],
      mobile: 9797798243,
      pincode: 190011,
      OwnerDetails: {
        name: "Junaid Ahmad",
        address: "Soura",
        mobile: 9707008244,
      },
      DoctorDetails: [
        {
          id: "696ca27e1fd4812f71726848",
          name: "Dr Haroon",
          qualifications: "MBBS, MDS",
          address: "Soura",
          workingAt: "Registrar at SKIMS Soura",
          mobile: 9797098245,
        },
        {
          id: "696ca27e1fd4812f71726849",
          name: "Dr Aamir Shah",
          qualifications: "MD Neurology",
          address: "Rajbagh",
          workingAt: "Consultant Neurologist",
          mobile: 9797091111,
        },
      ],
      planType: "Paid",
      maxAppointments: 30,
      verified: true,
    },
    {
      id: "698c5a094c017c39b0ec5ad2",
      registrationDate: "2026-02-11T10:29:29.622Z",
      name: "AlHuda Clinic",
      address: "Hawal Srinagar",
      seasonTimings: [
        { start: "07:00 AM", end: "07:00 PM", name: "Summer" },
        { start: "09:30 AM", end: "04:30 PM", name: "Winter" },
      ],
      mobile: 8493005166,
      pincode: 190003,
      OwnerDetails: {
        name: "Abdul Rashid",
        address: "Soura",
        mobile: 9797798243,
      },
      DoctorDetails: [
        {
          id: "696ca27e1fd4812f71726850",
          name: "Dr Sameer Ahmad",
          qualifications: "MBBS, MD Medicine",
          address: "Hawal",
          workingAt: "General Physician",
          mobile: 9797095555,
        },
      ],
      planType: "Paid",
      maxAppointments: 30,
      verified: false,
    },
    {
      id: "699d7a094c017c39b0ec5ad3",
      registrationDate: "2026-02-12T08:15:10.622Z",
      name: "CarePlus Medical Centre",
      address: "Rajbagh Srinagar",
      seasonTimings: [
        { start: "06:30 AM", end: "09:00 PM", name: "Summer" },
        { start: "08:30 AM", end: "06:00 PM", name: "Winter" },
      ],
      mobile: 7006001122,
      pincode: 190008,
      OwnerDetails: {
        name: "Dr Irfan Qureshi",
        address: "Rajbagh",
        mobile: 7006001199,
      },
      DoctorDetails: [
        {
          id: "696ca27e1fd4812f71726851",
          name: "Dr Mehak Jan",
          qualifications: "BDS, MDS Orthodontics",
          address: "Rajbagh",
          workingAt: "Dental Specialist",
          mobile: 9797000001,
        },
        {
          id: "696ca27e1fd4812f71726852",
          name: "Dr Yasir Lone",
          qualifications: "MS Orthopedics",
          address: "Bemina",
          workingAt: "Orthopedic Consultant",
          mobile: 9797000002,
        },
        {
          id: "696ca27e1fd4812f71726853",
          name: "Dr Rabia Khan",
          qualifications: "MD Pediatrics",
          address: "Lal Bazar",
          workingAt: "Child Specialist",
          mobile: 9797000003,
        },
      ],
      planType: "Premium",
      maxAppointments: 50,
      verified: true,
    },
    {
      id: "699d7a094c017c39b0ec5ad4",
      registrationDate: "2026-02-13T11:45:40.122Z",
      name: "Healthy Life Clinic",
      address: "Bemina Srinagar",
      seasonTimings: [
        { start: "07:00 AM", end: "08:00 PM", name: "Summer" },
        { start: "09:00 AM", end: "05:00 PM", name: "Winter" },
      ],
      mobile: 7006004455,
      pincode: 190018,
      OwnerDetails: {
        name: "Shabir Ahmad",
        address: "Bemina",
        mobile: 7006004466,
      },
      DoctorDetails: [
        {
          id: "696ca27e1fd4812f71726854",
          name: "Dr Farhan Ali",
          qualifications: "MBBS, DNB Cardiology",
          address: "Bemina",
          workingAt: "Cardiologist",
          mobile: 9797000010,
        },
        {
          id: "696ca27e1fd4812f71726855",
          name: "Dr Shazia Parveen",
          qualifications: "MD Gynecology",
          address: "Bemina",
          workingAt: "Gynecologist",
          mobile: 9797000011,
        },
      ],
      planType: "Basic",
      maxAppointments: 20,
      verified: true,
    },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Select Clinic And Doctor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Clinic Selection</DialogTitle>
          <div>
            <Input className="border border-gray-600" placeholder="Search: clinic name or doctor name" />
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[70vh] space-y-7">
          {clinics.map((clinic) => (
            <Card className="w-full shadow-lg border-2 border-red hover:shadow-sxl shadow-gray-600 transition duration-300">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">
                    {clinic.name}
                  </CardTitle>
                  <Badge variant={clinic.verified ? "default" : "secondary"}>
                    {clinic.verified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  📍 {clinic.address} - {clinic.pincode}
                </p>
                <p className="text-sm text-muted-foreground">
                  {clinic.mobile}
                </p>


              </CardHeader>

              <CardContent className="space-y-4">
                {/* Timings */}
                <div>
                  <p className="text-sm font-medium mb-1">Season Timings</p>
                  <div className="flex gap-2 flex-wrap">
                    {clinic.seasonTimings.map((season, index) => (
                      <Badge key={index} variant="outline">
                        {season.name}: {season.start} - {season.end}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />
                {/* here goes doctor details */}

                {/* Doctor Details */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-muted-foreground">
                    Available Doctors
                  </p>

                  {clinic.DoctorDetails.length === 0 ? (
                    <div className="text-sm text-muted-foreground bg-muted/40 p-4 rounded-xl text-center">
                      No doctors available in this clinic.
                    </div>
                  ) : (
                    clinic.DoctorDetails.map((doctor) => (
                      <div
                        key={doctor.id}
                        className="p-5 rounded-2xl border bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-sm hover:shadow-md transition"
                      >
                        {/* Doctor Header */}
                        <div className="flex items-start gap-4">
                          {/* Doctor Info */}
                          <div className="flex-1 space-y-1">
                            <p className="font-semibold text-lg">
                              {doctor.name}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              🎓 {doctor.qualifications}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              🏥 {doctor.workingAt}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              📍 {doctor.address}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              📞 {doctor.mobile}
                            </p>
                          </div>
                        </div>

                        {/* Book Button */}
                        <div className="mt-4 flex justify-end">
                          <Button
                            size="sm"
                            className="rounded-full bg-linear-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-transform duration-200"
                          >
                            Book Appointment
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>


              </CardContent>

            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )

}


