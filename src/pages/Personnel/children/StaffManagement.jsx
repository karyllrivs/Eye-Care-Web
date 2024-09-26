import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { HiOutlineUser } from "react-icons/hi";
import AccountModal from "../components/AccountModal";
import PrintToPDFButton from "../components/PrintToPDFButton";
import { printPage } from "../../../utils/printPage";
import useTimeFrequencyFilter from "../components/TimeFrequencyFilter";


const StaffManagement = () => {

    const [staffs, setStaffs] = useState([]);
    const [TimeFrequencyFilter, timeFrequencyFilteredItems] = useTimeFrequencyFilter(staffs);


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
    }

    return (
        <div className="px-16 py-8">
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold">Staff Management</h1>
                <button onClick={handleOpenAddModal} className="text-white bg-green-500 shadow hover:bg-green-600 px-9 py-2 rounded">
                    Add Staff
                </button>
            </div>

            {staffs.length == 0 ?
                <h2 className="text-2xl py-5">No data at the moment.</h2>
                :
                <>
                    <div className="my-10">
                        <div className="flex gap-2">
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
    {/** Changed currentItems.map to timeFrequencyFilteredItems.map */}
    {timeFrequencyFilteredItems.map((staff, index) => (
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

                    <div className="flex justify-between">
                        <PrintToPDFButton handlePrint={handlePrint} />

                 
                    </div>

                    {/* MODAL */}
                    <AccountModal
                        handleCloseModal={handleCloseModal}
                        isModalVisible={isModalVisible}
                        selectedAccount={selectedAccount}
                    />
                </>
            }
        </div>
    )
}

export default StaffManagement