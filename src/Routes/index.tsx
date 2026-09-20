import App from "@/App";

import { OnBoarding } from "@/Screens/Auth/Onboarding/index";
import { createBrowserRouter } from "react-router-dom";
import { PublicRoute } from "./public";


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },

    {
        path: "/onboarding",
        element: <PublicRoute />,
        children: [
            {
                index: true,
                element: <OnBoarding />
            }
        ]
    },

   
])