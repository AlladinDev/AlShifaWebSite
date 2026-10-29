import { Button } from "@/components/ui/button";
import { PatientDetails } from "./PatientDetails/form";

export const Appointment = () => {
  return (
    <div className="flex-1  h-full p-12 flex justify-center items-center">
      <div className=" border border-gray-500 rounded-md shadow-lg shadow-gray-900 p-9 w-full md:max-w-175">
        <div>
          <h2 className="font-semibold">Step 2 of 4</h2>
        </div>

        <div>
          <PatientDetails />
        </div>
        <div className="text-center">
          <Button className="w-full md:max-w-xs">Next</Button>
        </div>
      </div>
    </div>
  );
};
