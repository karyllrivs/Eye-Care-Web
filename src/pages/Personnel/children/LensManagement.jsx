import { useEffect, useRef, useState } from "react"
import LensConsultationModal from "../components/LensConsultationModal"
import { MdEventNote } from "react-icons/md";
import axiosClient from "../../../utils/axiosClient";
import { formatDateToLong, formatTimeToAMPM } from "../../../utils/formatter";
import { getPatientsWithLensConsultation } from "../../../utils/filterPatient";
import { printPage } from "../../../utils/printPage";
import PrintToPDFButton from "../components/PrintToPDFButton";
import useTimeFrequencyFilter from "../components/TimeFrequencyFilter";
import useFilterSearch from "../components/FilterSearch";

const LensManagement = () => {

    const [patients, setPatients] = useState([]);
    const [TimeFrequencyFilter, timeFrequencyFilteredItems] = useTimeFrequencyFilter(patients);
    const [FilterSearch, filteredData] = useFilterSearch(patients, ["name"]);

    useEffect(() => {
        axiosClient
            .get("/patients")
            .then(({ data }) => {
                setPatients(getPatientsWithLensConsultation(data));
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
    }, [])

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


    const divRef = useRef();
    const handlePrint = () => {
        const input = divRef.current;
        const title = "Lens Reports";
        printPage(input, title);
    }

    return (
        <div className="px-16 py-8">
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold">Lens Management</h1>
                <button
                    className="text-white bg-green-500 shadow hover:bg-green-600 px-9 py-2 rounded"
                    onClick={handleOpenAddModal}
                >
                    Add Patient Lens
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

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg" ref={divRef}>
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
                                            Mobile
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Consultation Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Consultation Time
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
                                            <td className="px-6 py-4">
                                                {patient.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {patient.mobile}
                                            </td>
                                            <td className="px-6 py-4">
                                                {patient.address}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatDateToLong(patient.lensConsultation.consultationDate)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatTimeToAMPM(patient.lensConsultation.consultationTime)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
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

                    <LensConsultationModal handleCloseModal={handleCloseModal} isModalVisible={isModalVisible} selectedPatient={selectedPatient} />
                </>
            }
        </div>
    )
}

export default LensManagement