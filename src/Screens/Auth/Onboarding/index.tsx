
import { useState } from "react";
import { Doctor } from "./Doctor/Doctor";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Owner } from "./Owner/Owner";
import { ClinicBackground } from "./LeftBrand";
import { Toaster } from "react-hot-toast";
import { UseOnboardingStore } from "./Store/onboarding.store";
import { useShallow } from "zustand/react/shallow"
export const OnBoarding = () => {
  const [userType, setUserType] = useState<string>("Clinic Owner")
  const { userTypeTabsVisible } = UseOnboardingStore(useShallow((store) => ({
    
    userTypeTabsVisible: store.showUserTypeTabs
  })))
  const handleUserChange = (option: string) => {
    setUserType(option)
  }

  const userOptions = ["Clinic Owner", "Doctor"]

  const userTypeFormMapper = (): React.ReactNode => {
    switch (userType) {
      case "Clinic Owner":
        return <Owner />
      case "Doctor":
        return <Doctor />
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F3F8F6] p-1 font-sans md:p-10">
      <Toaster />
      <div className=" relative flex w-full max-w-6xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_50px_110px_-35px_rgba(10,61,58,0.5)] md:min-h-170 md:flex-row">
        <ClinicBackground />
        {/* ============= RIGHT — verification card ============= */}
        <div className="mx-auto w-full  md:max-w-4xl   px-6 py-10">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center rounded-full border bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
              Welcome 👋
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Create Your Account
            </h1>

          </div>

          {/* User Type Card */}
          <div className="mx-auto w-full md:max-w-2xl rounded-2xl  bg-card  shadow-sm ">
            {userTypeTabsVisible ? <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold">
                  Select your role
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Choose how you'd like to use the platform.
                </p>
              </div>

              <Tabs
                defaultValue="Clinic Owner"
                className="w-full  flex justify-center items-center p-1"
              >
                <TabsList
                  variant="default"
                  className="w-full max-w-sm p-1"
                >
                  {userOptions.map((option) => (
                    <TabsTrigger
                      key={option}
                      value={option}
                      onClick={() => handleUserChange(option)}
                      className="
                rounded-lg p-5 text-sm font-medium
                transition-all duration-300
                data-[state=active]:bg-primary
                data-[state=active]:text-primary-foreground
                data-[state=active]:shadow-md
              "
                    >
                      {option}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs></> : null}

            <div className="mt-2 overflow-y-auto no-scrollbar">
              {userTypeFormMapper()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


