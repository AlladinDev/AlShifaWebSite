import { Button } from "@/components/ui/button";
import { MobileVerificationForm } from "./MobileVerification/form";
import { useAppointmentStore } from "./store/appointment";
import { useShallow } from "zustand/react/shallow";
import { PatientDetailsForm } from "./PatientDetails/form";
import { ClinicDoctorSelection } from "./ClinicDoctorSelection";
export const Appointment = () => {
  const { currentStage, maxStages, moveToNextStage, moveToPreviousStage } =
    useAppointmentStore(
      useShallow((store) => ({
        currentStage: store.currentStage,
        maxStages: store.maxStages,
        moveToNextStage: store.moveToNextStage,
        moveToPreviousStage: store.moveToPreviousStage,
      })),
    );

  const ReturnComponentToRender: Record<number, React.ReactNode> = {
    1: <MobileVerificationForm />,
    2: <PatientDetailsForm />,
    3: <ClinicDoctorSelection />,
  };

  return (
    <div className="flex-1  h-full  flex justify-center items-center py-9">
      <div className=" border border-gray-500 rounded-md shadow-lg shadow-gray-900 px-4 w-full md:max-w-200">
        <div className="py-10">
          <h2 className="font-semibold">
            Step {currentStage} of {maxStages}
          </h2>
        </div>

        <div>{ReturnComponentToRender[currentStage]}</div>
        <div className="text-center flex py-10 flex-col justify-center items-center md:flex-row gap-5">
          <Button className="w-full md:max-w-50" onClick={moveToPreviousStage}>Previous</Button>
          <Button className="w-full md:max-w-50" onClick={moveToNextStage}>Next</Button>
        </div>
      </div>
    </div>
  );
};
