import React from 'react';
import { FiChevronRight, FiUser, FiList, FiHelpCircle, FiBookmark, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/user/user.action";
import { deleteCookie } from "../utils/cookieUtils";
import { setCurrentUserProfile } from "../redux/profile/profile.action";
import axiosClient from "../utils/axiosClient";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    axiosClient
      .delete("/logout")
      .then(({ data: { message } }) => {
        alert(message);
        dispatch(setCurrentUser(null));
        dispatch(setCurrentUserProfile(null));
        deleteCookie(import.meta.env.VITE_EC_USER_TOKEN);
        navigate("/login");
      })
      .catch(({ response: { data: { message } } }) => {
        console.error(message);
      });
  };

  return (
    <div className="relative">
      {/* Sidebar with responsive width */}
      <div className="bg-gray-800 fixed left-0 top-[120px]  md:top-0  lg:top-0 bottom-0 z-10 flex flex-col justify-between w-[80px] md:w-[250px] lg:w-64">
        <div className="p-4">
          <ul className="space-y-2 pt-[100%]">
            <li>
              <Link to="/profile" className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center">
                <span className="flex items-center">
                  <FiUser size={20} className="mr-2" />
                  <span className="hidden md:block">Edit Profile</span> {/* Hide text on mobile */}
                </span>
                <FiChevronRight className="text-white" />
              </Link>
            </li>
            <li>
              <Link to="/order-history" className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center">
                <span className="flex items-center">
                  <FiList size={20} className="mr-2" />
                  <span className="hidden md:block">Order History</span> {/* Hide text on mobile */}
                </span>
                <FiChevronRight className="text-white" />
              </Link>
            </li>
            <li>
              <Link to="/consultation-history" className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center">
                <span className="flex items-center">
                  <FiBookmark size={20} className="mr-2" />
                  <span className="hidden md:block">Consultation History</span> {/* Hide text on mobile */}
                </span>
                <FiChevronRight className="text-white" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4">
          <Link onClick={handleLogout} className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center">
            <span className="flex items-center">
              <FiLogOut size={20} className="mr-2" />
              <span className="hidden md:block">Logout</span> {/* Hide text on mobile */}
            </span>
          </Link>
        </div>
      </div>

      {/* Removed Mobile Sidebar */}
    </div>
  );
};

export default Sidebar;
