import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/user/user.action";
import { deleteCookie } from "../utils/cookieUtils";
import { setCurrentUserProfile } from "../redux/profile/profile.action";
import axiosClient from "../utils/axiosClient";

const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = () => {
    axiosClient
      .delete("/logout")
      .then(({
        data: { message }
      }) => {
        alert(message);
        dispatch(setCurrentUser(null));
        dispatch(setCurrentUserProfile(null));
        deleteCookie(import.meta.env.VITE_EC_USER_TOKEN);
        navigate("/login");
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          console.error(message);
        }
      );
  }

  return (
    <div className="bg-gray-800 w-64 fixed left-0 top-0 bottom-0 z-10 flex flex-col justify-between">
      <div className="p-4">
        <ul className="space-y-2 pt-[100%]">
          <li>
            <Link
              to="/profile"
              className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center"
            >
              <span>Edit Profile</span>
              <FiChevronRight className="text-white" />
            </Link>
          </li>
          <li>
            <Link
              to="/order-history"
              className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center"
            >
              <span>Order History</span>
              <FiChevronRight className="text-white" />
            </Link>
          </li>
          <li>
            <Link
              to="/consultation-history"
              className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center"
            >
              <span>Consultation History</span>
              <FiChevronRight className="text-white" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <Link
          onClick={handleLogout}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded flex justify-center items-center"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
