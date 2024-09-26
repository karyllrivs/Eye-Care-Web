import { useState } from "react";
import {
  FaBars,
  FaCartPlus,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentAdmin } from "../../../redux/user/user.action";
import { deleteCookie } from "../../../utils/cookieUtils";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {

    dispatch(setCurrentAdmin(null));
    deleteCookie(import.meta.env.VITE_EC_USER_TOKEN)
    navigate("/admin-login");
  }

  return (
    <>
      <nav className="w-full bg-[#A79083] py-4 shadow-sm z-20 sticky top-0">
        <div className="flex justify-between items-center px-6 lg:px-24 p-3">
          <div className="flex items-center"></div>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative">
              <span className="absolute right-0 top-0 -mr-2 -mt-2 bg-red-500 text-white text-xs px-1 rounded-full">
                4
              </span>
              <FaCartPlus className="text-[#232321] text-lg" />
            </div>

            <div className="relative">
              {/* Notification dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 hidden">
                {/* Notification items */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Notification 1</span>
                  <span className="text-gray-600 text-xs">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Notification 2</span>
                  <span className="text-gray-600 text-xs">1 day ago</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <FaUser
                className="text-[#232321] text-lg cursor-pointer"
                onClick={toggleMenu}
              />
              {/* Admin button dropdown */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4">
                  <Link
                    to="/admin-login"
                    className="block py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center">
            <FaBars
              className="text-white text-2xl cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
