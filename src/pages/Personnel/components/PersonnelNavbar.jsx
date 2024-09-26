import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentPersonnel } from "../../../redux/user/user.action";
import { selectCurrentPersonnel } from "../../../redux/user/user.selector";
import { deleteCookie } from "../../../utils/cookieUtils";

const PersonnelNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const currentPersonnel = useSelector(selectCurrentPersonnel);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(setCurrentPersonnel(null));
        deleteCookie(import.meta.env.VITE_EC_USER_TOKEN)
        navigate("/personnel-login");
    }

    return (
        <nav className="row-span-1 col-span-full bg-[#D0C3BC] py-6 px-16 flex justify-end">
            <div className="relative">
                <div className="border border-black rounded px-2 flex justify-between items-center gap-4 cursor-pointer text-xl" onClick={toggleMenu}>
                    <span>{currentPersonnel.username.toUpperCase()}</span>
                    <IoMdArrowDropdown />
                </div>
                {/* Button dropdown */}
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4">
                        <p
                            onClick={handleLogout}
                            className="block py-2 text-gray-800 hover:bg-gray-200 cursor-pointer font-medium"
                        >
                            Logout
                        </p>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default PersonnelNavbar