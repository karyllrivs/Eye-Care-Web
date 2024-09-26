import React, { useState } from "react";
import { FaList } from "react-icons/fa"; // Importing the list icon
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminPatientDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

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
      name: "Jane Mary",
      contactNumber: "987-654-3210",
      email: "jane@example.com",
      status: "online",
      time: "2:00 PM",
      date: "2024-05-14",
      actionLabel: "Actions",
    },
    {
      name: "Mary Jane",
      contactNumber: "987-654-3210",
      email: "jane@example.com",
      status: "online",
      time: "2:00 PM",
      date: "2024-05-14",
      actionLabel: "Actions",
    },
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

  const handleEdit = (index, request) => {
    const updatedRequests = [...consultationRequests];
    updatedRequests[index].actionLabel = "Confirmed";
    console.log(request)
    setSelectedRequest(request);
    setModalVisible(true);
  };

   const closeModal = () => {
    setModalVisible(false);
  };

  const handleDelete = (index) => {
    // Create a copy of the consultationRequests array
    const updatedRequests = [...consultationRequests];
    // Remove the item at the specified index
    updatedRequests.splice(index, 1);
    // Update the state with the modified array
    setConsultationRequests(updatedRequests);
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto mt-8 pl-[15rem]">
        <h1 className="text-3xl font-semibold mb-8">Lens Management</h1>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-800">
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
                <tr key={index} className="bg-white border-gray-200">
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
                      onClick={() => handleEdit(index, request)}
                      className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Delete
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
                    : "hover:bg-gray-200"
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </li>
            ))}
        </ul>
      </div>
      <AdminSidebar />

      {modalVisible && selectedRequest && (
        <div className="fixed  inset-0 bg-gray-800 bg-opacity-75 flex justify-center z-50 max-screen py-3">
          <div className="bg-white rounded-lg p-8 w-11/12 max-w-4xl shadow-lg overflow-y-auto">
            <div>
              <h2 className="text-3xl font-semibold mb-5">Patient Visit Details</h2>
              <strong>Findings</strong>
              <p> Visit Date:</p>
             
              <strong>{selectedRequest.date}</strong>

            </div>
            <div class="pt-3">
              <h5 className="text-xl font-semibold mb-5">AR Findings</h5>         
              <div class="flex">
                <div class="flex">
                  <label for="" class="pr-2 p-2">OD:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">sph=</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
                <div class="flex align-middle">
                  <label for="" class="pr-2 p-2">cly x:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                  <span class="p-2">axis</span>
                </div>
              </div>
              <div class="flex pt-3">
                <div class="flex">
                  <label for="" class="pr-2 p-2">OS:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">sph=</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
                <div class="flex align-middle">
                  <label for="" class="pr-2 p-2">cly x:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                  <span class="p-2">axis</span>
                </div>
              </div>
            </div>
            <div class="pt-5">
              <h5 className="text-xl font-semibold mb-5">Old RX</h5>         
              <div class="flex">
                <div class="flex">
                  <label for="" class="pr-2 p-2">OD:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">sph=</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
                <div class="flex align-middle">
                  <label for="" class="pr-2 p-2">cly x:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                  <span class="p-2">axis</span>
                </div>
              </div>
              <div class="flex pt-3">
                <div class="flex">
                  <label for="" class="pr-2 p-2">OS:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">sph=</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
                <div class="flex align-middle">
                  <label for="" class="pr-2 p-2">cly x:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                  <span class="p-2">axis</span>
                </div>
              </div>
            </div>
            <div class="pt-5">
              <h5 className="text-xl font-semibold mb-5">Comments</h5>   
              <p>Capacity:</p>      
              <div class="flex">
                <div class="flex">
                  <label for="" class="pr-2 p-2">OD:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">Location</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
              </div>
              <div class="flex pt-3">
                <div class="flex">
                  <label for="" class="pr-2 p-2">OS:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">Location</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-3">
              <p>Dry Eyes:</p>      
              <div class="flex">
                <div class="flex">
                  <label for="" class="pr-2 p-2">OD:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">Location</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
              </div>
              <div class="flex pt-3">
                <div class="flex">
                  <label for="" class="pr-2 p-2">OS:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">Location</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-3">
              <p>Pterygium:</p>      
              <div class="flex">
                <div class="flex">
                  <label for="" class="pr-2 p-2">OD:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">Location</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
              </div>
              <div class="flex pt-3">
                <div class="flex">
                  <label for="" class="pr-2 p-2">OS:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">Location</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-5">
              <h5 className="text-xl font-semibold mb-5">Findings</h5>         
              <div class="flex">
                <div class="flex">
                  <label for="" class="pr-5 p-2">OD:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">sph=</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
                <div class="flex align-middle">
                  <label for="" class="pr-2 p-2">cly x:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                  <span class="p-2">axis</span>
                </div>
              </div>
              <div class="flex pt-3">
                <div class="flex">
                  <label for="" class="pr-2 p-2">Error</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">NVA</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
                <div class="flex align-middle">
                  <label for="" class="pr-2 p-2">Error:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex align-middle">
                  <label for="" class="pr-2 p-2">BCBA</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="flex pt-3">
                <div class="flex">
                  <label for="" class="pr-5 p-2">OS:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">sph=</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
                <div class="flex align-middle">
                  <label for="" class="pr-2 p-2">cly x:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                  
                  <span class="p-2">axis</span>
                </div>
              </div>
              <div class="flex pt-3">
                <div class="flex">
                  <label for="" class="pr-2 p-2">Error</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">NVA</label>
                  <div class="h-10 w-50 min-w-[150px]">
                  <select
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                    <option value=""></option>
                  </select>
                  </div>
                </div>
                <div class="flex align-middle">
                  <label for="" class="pr-2 p-2">Error:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex align-middle">
                  <label for="" class="pr-2 p-2">BCBA</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-10">
              <div class="flex">
                <div class="flex">
                  <label for="" class="pr-2 p-2">OS</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <label for="" class="pr-2 p-2">OS</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="flex pt-3">
                <div class="flex">
                  <label for="" class="pr-2 p-2">Pd:</label>
                  <div class="h-10 w-50 min-w-[150px]">
                    <select
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 m-1"
            >
              SAVE
            </button>
            <button
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 m-1"
            >
              DELETE
            </button>
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 m-1"
            >
              BACK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPatientDetails;
