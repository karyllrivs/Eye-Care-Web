import { useEffect, useRef, useState } from "react";
import { MdEventNote } from "react-icons/md";
import axiosClient from "../../../utils/axiosClient";
import PatientModal from "../components/PatientModal";
import { printPage } from "../../../utils/printPage";
import PrintToPDFButton from "../components/PrintToPDFButton";
import useTimeFrequencyFilter from "../components/TimeFrequencyFilter";
import useFilterSearch from "../components/FilterSearch.jsx";

const PatientManagement = () => {

    const [patients, setPatients] = useState([]);
    const [TimeFrequencyFilter, timeFrequencyFilteredItems] = useTimeFrequencyFilter(patients);
    const [FilterSearch, filteredData] = useFilterSearch(patients, ["name",
        "email",
        "mobile",
        "address",
        "age",
        "birthday",
        "gender"]);

    /** MODAL */
    const [selectedPatient, setSelectedPatient] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOpenEditModal = (patient) => {
        setSelectedPatient(patient);
        setIsModalVisible(true);
    };
    const handleOpenAddModal = () => {
        setSelectedPatient({});
        setIsModalVisible(true);
    };
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        axiosClient
            .get("/patients")
            .then(({ data }) => {
                setPatients(data);
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
    }, []);

    const divRef = useRef();
    const handlePrint = () => {
        const input = divRef.current;
        const title = "Patients Reports";
        printPage(input, title);
    }

    return (
        <div className="px-16 py-8">
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold">Patient Management</h1>
                <button
                    className="text-white bg-green-500 shadow hover:bg-green-600 px-9 py-2 rounded"
                    onClick={handleOpenAddModal}
                >
                    Add Patient
                </button>
            </div>

            {patients.length == 0 ?
                <h2 className="text-2xl py-5">No data at the moment.</h2>
                :
                <>
                    <div className="my-10">
                        <div className="flex gap-2">
                            {FilterSearch}
                            {TimeFrequencyFilter}
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2" ref={divRef}>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Contact Number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Age
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Birthday
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Gender
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((patient, index) => (
                                        <tr key={index} className="bg-white  dark:border-gray-700">
                                            <td className="px-6 py-4">
                                                <MdEventNote className="mr-2 text-xl inline" />
                                                {patient.name}
                                            </td>
                                            <td className="px-6 py-4">{patient.email}</td>
                                            <td className="px-6 py-4">{patient.mobile}</td>
                                            <td className="px-6 py-4">{patient.address}</td>
                                            <td className="px-6 py-4">{patient.age}</td>
                                            <td className="px-6 py-4">{patient.birthday}</td>
                                            <td className="px-6 py-4">{patient.gender}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                                                    onClick={() => handleOpenEditModal(patient)}
                                                >
                                                    Edit
                                                </button>
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

                    {/* MODAL */}
                    <PatientModal
                        handleCloseModal={handleCloseModal}
                        isModalVisible={isModalVisible}
                        selectedPatient={selectedPatient}
                    />
                </>
            }
        </div>
    )
}

export default PatientManagement