import { useEffect, useMemo, useRef, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { MdEventNote } from "react-icons/md";
import { ConsultationStatus } from "../../../enums/consultation.enums";
import ConsultationSlot from "../components/ConsultationSlot";
import { printPage } from "../../../utils/printPage";
import PrintToPDFButton from "../components/PrintToPDFButton";
import useTimeFrequencyFilter from "../components/TimeFrequencyFilter";
import useFilterSearch from "../components/FilterSearch";

const ConsultationManagement = () => {

    const [consultations, setConsultations] = useState([]);
    const [TimeFrequencyFilter, timeFrequencyFilteredItems] = useTimeFrequencyFilter(consultations);
    const [FilterSearch, filteredData] = useFilterSearch(consultations, ["date", "time"]);

    const [isArchivedList, setIsArchivedList] = useState(false);

    const fetchList = url => {
        axiosClient
            .get(url)
            .then(({ data }) => {
                setConsultations(data);
            })
            .catch(
                ({
                    response: {
                        data: { message },
                    },
                }) => {
                    alert(message);
                }
            );
    }

    useEffect(() => {
        fetchList("/consultations")
    }, []);

    useMemo(() => {
        let url = "/consultations";

        if (isArchivedList)
            url = "/consultations/archive";

        fetchList(url);
    }, [isArchivedList])

    const updateConsultationStatus = (id, status) => {
        axiosClient
            .put("/consultations/" + id, { status })
            .then(({ data: { message } }) => {
                alert(message);
                window.location.reload();
            })
            .catch(
                ({
                    response: {
                        data: { message },
                    },
                }) => {
                    console.log(message);
                }
            );
    }

    const deleteConsultation = (id) => {
        if (confirm("Are you sure you want to delete this consultation?"))
            axiosClient
                .delete("/consultations/" + id)
                .then(({ data: { message } }) => {
                    alert(message);
                    window.location.reload();
                })
                .catch(
                    ({
                        response: {
                            data: { message },
                        },
                    }) => {
                        console.log(message);
                    }
                );
    }

    const restoreConsultation = (id) => {
        if (confirm("Are you sure you want to restore this consultation?"))
            axiosClient
                .put("/consultations/restore/" + id)
                .then(({ data: { message } }) => {
                    alert(message);
                    window.location.reload();
                })
                .catch(
                    ({
                        response: {
                            data: { message },
                        },
                    }) => {
                        console.log(message);
                    }
                );
    }

    const toggleList = () => {
        setIsArchivedList(!isArchivedList);
    }

    const divRef = useRef();
    const handlePrint = () => {
        const input = divRef.current;
        const title = "Consultations Reports";
        printPage(input, title);
    }

    return (
        <div className="px-16 py-8">
            <h1 className="text-5xl font-bold">Consultation</h1>
            {consultations.length == 0 ?
                <h2 className="text-2xl py-5 text-center">No data at the moment.</h2>
                :
                <>
                    <div className="my-10">
                        <div className="flex justify-between items-end">
                            <div className="flex gap-2">
                                {FilterSearch}
                                {TimeFrequencyFilter}
                            </div>
                            <button onClick={toggleList} className="no-underline hover:underline text-blue-500 text-xl"> {isArchivedList ? "Consultation List" : "Archived"}</button>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2" ref={divRef}>
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
                                        <th scope="col" className="px-6 py-3">
                                            Time
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((consultation, index) => (
                                        <tr key={index} className="bg-white  dark:border-gray-700">
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
                                                {
                                                    isArchivedList ?
                                                        <button
                                                            onClick={() => restoreConsultation(consultation._id)}
                                                            className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                                                        >
                                                            Restore
                                                        </button> : null
                                                }

                                                {consultation.status == ConsultationStatus.PENDING ?
                                                    <>
                                                        <button
                                                            onClick={() => updateConsultationStatus(consultation._id, "CONFIRMED")}
                                                            className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                                                        >
                                                            Confirm
                                                        </button>
                                                        <button
                                                            onClick={() => updateConsultationStatus(consultation._id, "CANCELED")}
                                                            className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={() => updateConsultationStatus(consultation._id, "FULLY BOOKED")}
                                                            className="bg-[#FAB005] hover:bg-[#fab005da] text-white font-bold py-2 px-4 rounded-full"
                                                        >
                                                            Full
                                                        </button>
                                                    </> :
                                                    <button
                                                        onClick={() => deleteConsultation(consultation._id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                                    >
                                                        Delete
                                                    </button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <PrintToPDFButton handlePrint={handlePrint} />

                    </div>
                </>
            }

            <ConsultationSlot />
        </div>
    )
}

export default ConsultationManagement