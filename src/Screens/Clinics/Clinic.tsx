import { FetchClinicsUrl } from "@/constants"
import { ThunderApi } from "@/Service/Axios"
import { useEffect, useState } from "react"
import { ClinicCard } from "./Components/ClinicCards"
import { H1 } from "@/CustomComponents/H1"
import { H1Light } from "@/CustomComponents/H1Light"
import { H2 } from "@/CustomComponents/H2"

export const Clinics = () => {
    const [filter, setFilter] = useState<string | number>("")
    useEffect(() => {
        const fetchClinicsFn = async () => {
            try {
                const response = await ThunderApi(null, FetchClinicsUrl, "get")
                console.log(response)
            }
            catch (err) {
                console.log("err")
            }
        }
        fetchClinicsFn()
    }, [filter])

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
        <div className="my-4 bg-primary p-2 scroll-auto ">
            <H2 text="Explore Clinics" classNames="text-white" />
            <div className="flex justify-around items-center  gap-4 flex-wrap">
                {clinics.map((clinic) => (
                    <div className="max-w-6xl ">
                        <ClinicCard clinic={clinic} />
                    </div>
                ))}
            </div>
        </div>
    )
}