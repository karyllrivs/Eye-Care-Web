import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai"; // Import the search icon
import AccountModal from "../components/AccountModal";
import PrintToPDFButton from "../components/PrintToPDFButton";
import { printPage } from "../../../utils/printPage";

const StaffManagement = () => {
    const [staffs, setStaffs] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    /** MODAL */
    const [selectedAccount, setSelectedAccount] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOpenEditModal = (staff) => {
        setSelectedAccount(staff);
        setIsModalVisible(true);
    };
    const handleOpenAddModal = () => {
        setSelectedAccount({});
        setIsModalVisible(true);
    };
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        axiosClient
            .get("/personnel/staff")
            .then(({ data }) => {
                setStaffs(data);
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
        const title = "Staff Reports";
        printPage(input, title);
    };

    // Filter staffs based on search term
    const filteredStaffs = staffs.filter(staff => 
        staff.profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-16 py-8">
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold">Staff Management</h1>
                <button onClick={handleOpenAddModal} className="text-white bg-green-500 shadow hover:bg-green-600 px-9 py-2 rounded">
                    Add Staff
                </button>
            </div>

            {staffs.length === 0 ? (
                <h2 className="text-2xl py-5">No data at the moment.</h2>
            ) : (
                <>
                    <div className="my-10">
                        <div className="flex gap-2 items-center">
                            {/* Search Input Field with Icon */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="px-4 border border-gray-300 rounded-lg bg-white text-gray-600 text-sm h-12 w-50 pl-10" // Add padding to left for icon
                                />
                                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" /> {/* Position the icon */}
                            </div>

                            <div className="ml-auto">
                                <PrintToPDFButton handlePrint={handlePrint} />
                                <br />
                            </div>
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg" ref={divRef}>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Gender
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Birthday
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Age
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Mobile
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStaffs.map((staff, index) => (
                                        <tr key={index} className="bg-white dark:border-gray-700">
                                            <td className="px-6 py-4">
                                                <HiOutlineUser className="mr-2 text-xl inline" />
                                                {staff.profile.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {staff.profile.gender}
                                            </td>
                                            <td className="px-6 py-4">
                                                {staff.profile.birthday}
                                            </td>
                                            <td className="px-6 py-4">
                                                {staff.profile.age}
                                            </td>
                                            <td className="px-6 py-4">
                                                {staff.profile.mobile}
                                            </td>
                                            <td className="px-6 py-4">
                                                {staff.profile.address}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                                                    onClick={() => handleOpenEditModal(staff)}
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

                    {/* MODAL */}
                    <AccountModal
                        handleCloseModal={handleCloseModal}
                        isModalVisible={isModalVisible}
                        selectedAccount={selectedAccount}
                    />
                </>
            )}
        </div>
    );
};

export default StaffManagement;
