import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { formatDateToLong } from "../../../utils/formatter";
import OrderModal from "../components/OrderModal";
import { printPage } from "../../../utils/printPage";
import PrintToPDFButton from "../components/PrintToPDFButton";
import useFilterSearch from "../components/FilterSearch";

const OrderManagement = () => {
    const [checkouts, setCheckouts] = useState([]);
    const [FilterSearch, filteredData] = useFilterSearch(checkouts, ["checkout_id"]);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortedData, setSortedData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(""); // State for status dropdown
    const [selectedDateFilter, setSelectedDateFilter] = useState(""); // State for new/old filter

    useEffect(() => {
        axiosClient
            .get("/orders-checkouts")
            .then(({ data }) => {
                setCheckouts(data);
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

    useEffect(() => {
        setSortedData(filteredData);
    }, [filteredData]);

    /** MODAL */
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOpenAddModal = (orders) => {
        setSelectedOrders(orders);
        setIsModalVisible(true);
    };
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const divRef = useRef();
    const handlePrint = () => {
        const input = divRef.current;
        const title = "Orders Reports";
        printPage(input, title);
    };

    const sortDataByPaymentStatus = () => {
        const sorted = [...filteredData].sort((a, b) => {
            const statusA = a.payment_status === "paid" ? 1 : 0;
            const statusB = b.payment_status === "paid" ? 1 : 0;
            return sortDirection === 'asc' ? statusA - statusB : statusB - statusA;
        });
        setSortedData(sorted);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    // Filter by selected status
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    // Filter by new/old
    const handleDateFilterChange = (e) => {
        setSelectedDateFilter(e.target.value);
    };

    // Filter the data based on status
    const filteredByStatus = selectedStatus
        ? sortedData.filter(order => order.payment_status === selectedStatus)
        : sortedData;

    // Further filter the data based on date
    const filteredByDate = selectedDateFilter === "new"
        ? filteredByStatus.sort((a, b) => new Date(b.date_created) - new Date(a.date_created)) // Latest first
        : selectedDateFilter === "old"
            ? filteredByStatus.sort((a, b) => new Date(a.date_created) - new Date(b.date_created)) // Oldest first
            : filteredByStatus; // No date filter applied

    return (
        <div className="px-16 py-8">
            <h1 className="text-5xl font-bold">Order</h1>

            {checkouts.length === 0 ? (
                <h2 className="text-2xl py-5">No data at the moment.</h2>
            ) : (
                <>
                    <div className="my-10">
                        <div className="flex gap-2 items-center">
                            {FilterSearch}
                            
                            {/* Dropdown for Payment Status */}
                            <select
                                value={selectedStatus}
                                onChange={handleStatusChange}
                                className="border rounded-md px-3 py-3 focus:outline-none focus:ring focus:ring-blue-500 text-md  text-gray-500"
                            >
                                <option value="">Status</option>
                                <option value="paid">Paid</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="failed">Failed</option>
                            </select>

                            {/* Dropdown for New/Old Filter */}
                            <select
                                value={selectedDateFilter}
                                onChange={handleDateFilterChange}
                                className="border rounded-md px-3 py-3 focus:outline-none focus:ring focus:ring-blue-500 text-md text-gray-500"
                            >
                                <option value="">Order Dates</option>
                                <option value="new">New</option>
                                <option value="old">Old</option>
                            </select>

                            <div className="ml-auto">
                                <PrintToPDFButton handlePrint={handlePrint} />
                            </div>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2" ref={divRef}>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Checkout ID</th>
                                        <th scope="col" className="px-6 py-3">User Name</th>
                                        <th scope="col" className="px-6 py-3">Total Amount</th>
                                        <th scope="col" className="px-6 py-3">Date Created</th>
                                        <th scope="col" className="px-6 py-3">Payment Status</th>
                                        <th scope="col" className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredByDate.map(({ checkout_id, user, payment_status, total_amount, date_created, orders }, index) => (
                                        <tr key={index} className="bg-white dark:border-gray-700">
                                            <td className="px-6 py-4">{checkout_id}</td>
                                            <td className="px-6 py-4">{user?.first_name || "N/A"} {user?.last_name || "N/A"}</td>
                                            <td className="px-6 py-4">₱{total_amount}</td>
                                            <td className="px-6 py-4">{formatDateToLong(date_created)}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${payment_status === "paid"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                >
                                                    {payment_status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                                                    onClick={() => handleOpenAddModal(orders)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Order Modal */}
                    <OrderModal isModalVisible={isModalVisible} selectedOrders={selectedOrders} handleCloseModal={handleCloseModal} />
                </>
            )}
        </div>
    );
};

export default OrderManagement;
