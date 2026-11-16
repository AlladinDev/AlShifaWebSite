import { Button } from "@/components/ui/button";
import { FormInput } from "@/CustomComponents/FormInput";
import { useState } from "react";
import { Card } from "@/components/ui/card";
export const ClinicDoctorSelection = () => {
  const [tabSelected, selectTab] = useState("DOCTOR");
  const selectedTabStyling = "bg-primary text-primary-foreground";
  const ReturnSearchInputPlaceholderValue = () => {
    switch (tabSelected) {
      case "DOCTOR":
        return "Search By Doctor";
      case "CLINIC":
        return "Search By Clinic";
      case "SPECIALITY":
        return "Search By Speciality";
    }
    return "Search By Doctor";
  };

  const ReturnSearchSuggestion = () => {
    switch (tabSelected) {
      case "DOCTOR":
        return ["Dr Imran", "Dr Junaid"];
      case "CLINIC":
        return ["AlHuda", "Khyber", "Shifa Clinic"];
      case "SPECIALITY":
        return ["Dermatology", "Pediatrics", "Cardiology", "GastroEnterology"];
    }
    return ["Dermatology", "Pediatrics", "Cardiology", "GastroEnterology"];
  };

  const handleTabChange = (tabName: string) => {
    selectTab(tabName);
  };

  const changeHandler = (data: { key: string; value: unknown }) => {
    console.log(data)
  };
  return (
    <div className="">
      <div>
        <h2 className="text-primary">Your care, your choice</h2>
        <h2 className="text-3xl font-semibold">
          Find the right care, with ease.
        </h2>
        <h2 className="text-gray">
          Search trusted doctors and clinics near you, then choose a time that
          works.
        </h2>
      </div>

      <Card className="px-2 border-2">
        <div className="flex  justify-between items-center flex-col md:flex-row flex-1">
          <ul className="flex w-full px-2 flex-1 justify-center items-center border bg-gray-300 dark:bg-white rounded-md cursor-pointer">
            <li
              onClick={() => handleTabChange("DOCTOR")}
              className={` w-full transition-colors duration-1s py-2 text-center rounded-md ${tabSelected == "DOCTOR" ? selectedTabStyling : ""}`}
            >
              Doctor
            </li>
            <li
              onClick={() => handleTabChange("CLINIC")}
              className={` w-full  transition-colors duration-1s py-2 text-center rounded-md ${tabSelected == "CLINIC" ? selectedTabStyling : ""}`}
            >
              Clinic
            </li>
            <li
              onClick={() => handleTabChange("SPECIALITY")}
              className={` w-full  transition-colors duration-1s py-2 text-center rounded-md ${tabSelected == "SPECIALITY" ? selectedTabStyling : ""}`}
            >
              Speciality
            </li>
          </ul>
          <div className="flex-1 w-full  flex justify-between items-center gap-3 flex-col md:flex-row">
            <FormInput
              styling="w-full "
              changeHandler={changeHandler}
              name="filter"
              placeHolder={ReturnSearchInputPlaceholderValue()}
              inputType="text"
              value={""}
            />
            <Button className="flex-1 w-full">Search</Button>
          </div>
        </div>

        {/* Search Suggestions */}
        <div>
          <h2 className="text-center md:text-start">Search Suggestions :</h2>
          <ul className="flex justify-start gap-4 py-2   items-center flex-col md:flex-row ">
            {ReturnSearchSuggestion().map((val, index) => (
              <li
                key={index}
                className="border rounded-full px-2  border-primary"
              >
                {val}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/*Actual container card where doctor and clinics will be displayed */}
      <Card className="my-2">

      </Card>
    </div>
  );
};
