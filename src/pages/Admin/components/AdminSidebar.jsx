import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaWarehouse,
  FaUserMd,
  FaChartLine,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <>
      <div className="bg-gray-800 h-full w-64 fixed left-0 top-0 bottom-0 z-10 flex flex-col justify-between">
        <div className="p-4 pt-[7rem]">
          <h2 className="text-white text-xl font-bold mb-4">Dashboard</h2>
          <ul className="space-y-2 pt-12">
            <li>
              <Link
                to="/order-management"
                className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center"
              >
                <span className="flex items-center">
                  <FaClipboardList className="mr-2" />
                  Order Management
                </span>
              </Link>
            </li>
            {/* <li>
              <Link
                to="/"
                className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center"
              >
                <span className="flex items-center">
                  <FaStar className="mr-2" />
                  Manage Reviews
                </span>
              </Link>
            </li> */}
            <li>
              <Link
                to="/admin-consultation"
                className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center"
              >
                <span className="flex items-center">
                  <FaUserMd className="mr-2" />
                  Consultation
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-inventory"
                className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center"
              >
                <span className="flex items-center">
                  <FaWarehouse className="mr-2" />
                  Inventory
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-patient-visit-datails"
                className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center"
              >
                <span className="flex items-center">
                  <FaChartLine className="mr-2" />
                  Lens Management
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-sales"
                className="text-white hover:bg-gray-700 py-2 px-4 block rounded flex justify-between items-center"
              >
                <span className="flex items-center">
                  <FaChartLine className="mr-2" />
                  Sales
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
