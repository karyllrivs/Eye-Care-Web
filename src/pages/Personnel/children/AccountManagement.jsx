import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai"; // Import the search icon
import AccountModal from "../components/AccountModal";
import PrintToPDFButton from "../components/PrintToPDFButton";
import { printPage } from "../../../utils/printPage";

const AccountManagement = () => {
    const [accounts, setAccounts] = useState([]);
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
            .get("/personnels")
            .then(({ data }) => {
                setAccounts(data);
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
        const title = "Account Reports";
        printPage(input, title);
    };

    // Filtered accounts based on the search term
    const filteredAccounts = accounts.filter((account) =>
        account.profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-16 py-8">
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold">Account Management</h1>
                <button onClick={handleOpenAddModal} className="text-white bg-green-500 shadow hover:bg-green-600 px-9 py-2 rounded">
                    Add Account
                </button>
            </div>

            {accounts.length === 0 ? (
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
                                <br></br>
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
                                            Role
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAccounts.map((account, index) => (
                                        <tr key={index} className="bg-white dark:border-gray-700">
                                            <td className="px-6 py-4">
                                                <HiOutlineUser className="mr-2 text-xl inline" />
                                                {account.profile.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {account.profile.gender}
                                            </td>
                                            <td className="px-6 py-4">
                                                {account.profile.birthday}
                                            </td>
                                            <td className="px-6 py-4">
                                                {account.profile.age}
                                            </td>
                                            <td className="px-6 py-4">
                                                {account.profile.mobile}
                                            </td>
                                            <td className="px-6 py-4">
                                                {account.profile.address}
                                            </td>
                                            <td className="px-6 py-4">
                                                {account.role}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                                                    onClick={() => handleOpenEditModal(account)}
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
                </>
            )}

            {/* MODAL */}
            <AccountModal
                handleCloseModal={handleCloseModal}
                isModalVisible={isModalVisible}
                selectedAccount={selectedAccount}
                isSuperAdmin={true}
            />
        </div>
    );
};

export default AccountManagement;
