import React, { useState } from "react";
import { FaList } from "react-icons/fa"; // Importing the list icon
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminConsultation = () => {
  // Sample data array
  const [consultationRequests, setConsultationRequests] = useState([
    {
      name: "John Doe",
      contactNumber: "123-456-7890",
      email: "john@example.com",
      status: "physical",
      time: "10:00 AM",
      date: "2024-05-13",
      actionLabel: "Actions",
    },
    {
      name: "Jane Maria",
      contactNumber: "987-654-3210",
      email: "jane@example.com",
      status: "online",
      time: "2:00 PM",
      date: "2024-05-14",
      actionLabel: "Actions",
    },
    {
      name: "John Doe",
      contactNumber: "123-456-7890",
      email: "john@example.com",
      status: "physical",
      time: "10:00 AM",
      date: "2024-05-13",
      actionLabel: "Actions",
    },
    {
      name: "Jane Maria",
      contactNumber: "987-654-3210",
      email: "jane@example.com",
      status: "online",
      time: "2:00 PM",
      date: "2024-05-14",
      actionLabel: "Actions",
    },
    {
      name: "John Doe",
      contactNumber: "123-456-7890",
      email: "john@example.com",
      status: "physical",
      time: "10:00 AM",
      date: "2024-05-13",
      actionLabel: "Actions",
    },
    {
      name: "Jane Maria",
      contactNumber: "987-654-3210",
      email: "jane@example.com",
      status: "online",
      time: "2:00 PM",
      date: "2024-05-14",
      actionLabel: "Actions",
    },
    {
      name: "John Doe",
      contactNumber: "123-456-7890",
      email: "john@example.com",
      status: "physical",
      time: "10:00 AM",
      date: "2024-05-13",
      actionLabel: "Actions",
    },
    {
      name: "Jane Maria",
      contactNumber: "987-654-3210",
      email: "jane@example.com",
      status: "online",
      time: "2:00 PM",
      date: "2024-05-14",
      actionLabel: "Actions",
    },
    {
      name: "John Doe",
      contactNumber: "123-456-7890",
      email: "john@example.com",
      status: "physical",
      time: "10:00 AM",
      date: "2024-05-13",
      actionLabel: "Actions",
    },
    {
      name: "Jane Maria",
      contactNumber: "987-654-3210",
      email: "jane@example.com",
      status: "online",
      time: "2:00 PM",
      date: "2024-05-14",
      actionLabel: "Actions",
    },
    // Add more data as needed
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consultationRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleConfirm = (index) => {
    const updatedRequests = [...consultationRequests];
    updatedRequests[index].actionLabel = "Confirmed";
    setConsultationRequests(updatedRequests);
  };

  const handleCancel = (index) => {
    const updatedRequests = [...consultationRequests];
    updatedRequests[index].actionLabel = "Cancelled";
    setConsultationRequests(updatedRequests);
  };

  const handleFull = (index) => {
    const updatedRequests = [...consultationRequests];
    updatedRequests[index].actionLabel = "Full";
    setConsultationRequests(updatedRequests);
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto mt-8 pl-[15rem] pr-4">
        <h1 className="text-3xl font-semibold mb-8">Consultation Requests</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
            <thead className="bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Type
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((request, index) => (
                <tr key={index} className="bg-white  dark:border-gray-700">
                  <td className="px-6 py-4">
                    <FaList className="mr-2 inline" /> {/* List icon */}
                    {request.name}
                  </td>
                  <td className="px-6 py-4">{request.contactNumber}</td>
                  <td className="px-6 py-4">{request.email}</td>
                  {/* <td className="px-6 py-4">{request.status}</td> */}
                  <td className="px-6 py-4">{request.time}</td>
                  <td className="px-6 py-4">{request.date}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleConfirm(index)}
                      className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleCancel(index)}
                      className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleFull(index)}
                      className="bg-[#FAB005] hover:bg-[#fab005da] text-white font-bold py-2 px-4 rounded-full"
                    >
                      Full
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <ul className="flex justify-end mt-4">
          {Array(Math.ceil(consultationRequests.length / itemsPerPage))
            .fill()
            .map((_, index) => (
              <li
                key={index}
                className={`cursor-pointer px-3 py-1 mx-1 border rounded-full ${
                  currentPage === index + 1
                    ? "bg-gray-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </li>
            ))}
        </ul>
      </div>
      <AdminSidebar />
    </>
  );
};

export default AdminConsultation;
