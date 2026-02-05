import { Navbar } from "../Navbar/Navbar"

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="font-serif relative min-h-dvh px-2 ">
            <Navbar />
            {children}
        </div>
    )
}