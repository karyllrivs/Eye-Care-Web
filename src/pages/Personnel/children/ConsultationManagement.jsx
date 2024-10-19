import { useEffect, useMemo, useRef, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { MdEventNote } from "react-icons/md";
import { ConsultationStatus } from "../../../enums/consultation.enums"; // Ensure correct import
import ConsultationSlot from "../components/ConsultationSlot";
import { printPage } from "../../../utils/printPage";
import PrintToPDFButton from "../components/PrintToPDFButton";
import useFilterSearch from "../components/FilterSearch";

const ConsultationManagement = () => {
    const [consultations, setConsultations] = useState([]);
    const [isArchivedList, setIsArchivedList] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("ALL"); // State for selected status
    const [dateOrder, setDateOrder] = useState("NEW"); // State for date order

    // Custom hooks for filtering
    const [FilterSearch, filteredData] = useFilterSearch(consultations, ["date", "time"]);

    // Filter consultations by status and sort them
    const filteredByStatusAndSorted = useMemo(() => {
        let filtered = selectedStatus === "ALL" ? filteredData : filteredData.filter((consultation) => {
            return consultation.status === selectedStatus;
        });

        // Sort the filtered consultations based on status
        filtered.sort((a, b) => {
            const statusOrder = {
                [ConsultationStatus.PENDING]: 0,
                [ConsultationStatus.CONFIRMED]: 1,
                [ConsultationStatus.CANCELED]: 2,
                "FULLY BOOKED": 3,
            };

            return (statusOrder[a.status] || 4) - (statusOrder[b.status] || 4); // Default to 4 for any unknown status
        });

        // Sort by date (latest first)
        if (dateOrder === "NEW") {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        return filtered;
    }, [filteredData, selectedStatus, dateOrder]);

    // Fetch the consultations list from the server
    const fetchList = (url) => {
        axiosClient
            .get(url)
            .then(({ data }) => setConsultations(data))
            .catch((error) => alert(error?.response?.data?.message));
    };

    // Fetch list on component mount and when isArchivedList changes
    useEffect(() => {
        const url = isArchivedList ? "/consultations/archive" : "/consultations";
        fetchList(url);
    }, [isArchivedList]);

    // Update consultation status
    const updateConsultationStatus = (id, status) => {
        axiosClient
            .put("/consultations/" + id, { status })
            .then(({ data: { message } }) => {
                alert(message);
                fetchList(isArchivedList ? "/consultations/archive" : "/consultations");
            })
            .catch((error) => console.log(error?.response?.data?.message));
    };

    // Delete a consultation
    const deleteConsultation = (id) => {
        if (confirm("Are you sure you want to delete this consultation?")) {
            axiosClient
                .delete("/consultations/" + id)
                .then(({ data: { message } }) => {
                    alert(message);
                    fetchList(isArchivedList ? "/consultations/archive" : "/consultations");
                })
                .catch((error) => console.log(error?.response?.data?.message));
        }
    };

    // Restore a consultation
    const restoreConsultation = (id) => {
        if (confirm("Are you sure you want to restore this consultation?")) {
            axiosClient
                .put("/consultations/restore/" + id)
                .then(({ data: { message } }) => {
                    alert(message);
                    fetchList("/consultations/archive");
                })
                .catch((error) => console.log(error?.response?.data?.message));
        }
    };

    // Toggle between active and archived list
    const toggleList = () => setIsArchivedList(!isArchivedList);

    const divRef = useRef();
    const handlePrint = () => {
        const input = divRef.current;
        const title = "Consultations Reports";
        printPage(input, title);
    };

    return (
        <div className="px-16 py-8">
            <h1 className="text-5xl font-bold">Consultation</h1>

            {consultations.length === 0 ? (
                <h2 className="text-2xl py-5 text-center">No data at the moment.</h2>
            ) : (
                <>
                    <div className="my-10">
                        <div className="flex justify-between items-end">
                            <div className="flex gap-2 items-center"> {/* Added 'items-end' to align items */}
                              {FilterSearch}
                                 {/* Status Filter Dropdown */}
                                    <div className="relative">
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="p-3 border border-gray-300 rounded-lg bg-white text-gray-600 text-sm"
                                >
                                        <option value="ALL">All Statuses</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="CONFIRMED">Confirmed</option>
                                        <option value="CANCELED">Canceled</option>
                                        <option value="FULLY BOOKED">Fully Booked</option>
                                        </select>
                    </div>

                        {/* Date Order Dropdown */}
                        <div className="relative">
                            <select
                                value={dateOrder}
                                onChange={(e) => setDateOrder(e.target.value)}
                                className="p-3 border border-gray-300 rounded-lg bg-white text-gray-600 text-sm"
                            >
                            <option value="NEW">New Dates</option>
                            <option value="OLD">Old Dates</option>
                            </select>
                    </div>
                 </div>
                        <div className="flex items-center gap-4 ml-auto">
                            <PrintToPDFButton handlePrint={handlePrint} />
                                <button
                                    onClick={toggleList}
                                    className={`text-white font-bold py-2 px-5 rounded-full transition duration-300 ${
                                    isArchivedList ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                            >
                                    {isArchivedList ? "Consultation List" : "Archives"}
                                </button>
                        </div>
                    </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2" ref={divRef}>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Contact Number</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Time</th>
                                        <th scope="col" className="px-6 py-3">Date</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredByStatusAndSorted.map((consultation, index) => (
                                        <tr key={index} className="bg-white dark:border-gray-700">
                                            <td className="px-6 py-4">
                                                <MdEventNote className="mr-2 text-xl inline" />
                                                {consultation.name}
                                            </td>
                                            <td className="px-6 py-4">{consultation.mobile}</td>
                                            <td className="px-6 py-4">{consultation.email}</td>
                                            <td className="px-6 py-4">{consultation.time}</td>
                                            <td className="px-6 py-4">{consultation.date}</td>
                                            <td className="px-6 py-4">{consultation.status}</td>
                                            <td className="px-6 py-4">
                                                {isArchivedList ? (
                                                    <button
                                                        onClick={() => restoreConsultation(consultation._id)}
                                                        className="text-green-500 hover:underline"
                                                    >
                                                        Restore
                                                    </button>
                                                ) : consultation.status === ConsultationStatus.PENDING ? (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                updateConsultationStatus(consultation._id, "CONFIRMED")
                                                            }
                                                            className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                                                        >
                                                            Confirm
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                updateConsultationStatus(consultation._id, "CANCELED")
                                                            }
                                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => deleteConsultation(consultation._id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ConsultationManagement;
