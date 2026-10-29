import App from "@/App";

import { OnBoarding } from "@/Screens/Auth/Onboarding/index";
import { createBrowserRouter } from "react-router-dom";

import { Appointment } from "@/Screens/Appointment/Appointment";
import { Home } from "@/Screens/home/home";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "onboarding",
        element: <OnBoarding />,
      },
      {
        path: "appointment/book",
        element: <Appointment />,
      },
    ],
  },
]);
