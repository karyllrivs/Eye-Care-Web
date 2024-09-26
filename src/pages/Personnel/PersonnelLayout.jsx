import { Outlet } from "react-router-dom";
import PersonnelNavbar from "./components/PersonnelNavbar";
import PersonnelSidebar from "./components/PersonnelSidebar";

const PersonnelLayout = () => {
    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr]">
            {/* Navbar */}
            <PersonnelNavbar />
            <div className="grid grid-cols-[350px_1fr]">
                {/* Sidebar */}
                <PersonnelSidebar />

                {/* Main Content */}
                <main className="lg:col-span-1 bg-gray-100 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default PersonnelLayout