import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <div className="font-serif px-2 min-h-dvh">
      <Navbar />
      <div className="flex flex-col flex-1 min-h-[calc(100dvh-70px)] border-2 border-red-900">
        <Outlet />
      </div>
    </div>
  );
};
