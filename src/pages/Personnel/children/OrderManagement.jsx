import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { formatDateToLong } from "../../../utils/formatter";
import OrderModal from "../components/OrderModal";
import { printPage } from "../../../utils/printPage";
import PrintToPDFButton from "../components/PrintToPDFButton";
import useTimeFrequencyFilter from "../components/TimeFrequencyFilter";
import useFilterSearch from "../components/FilterSearch";

const OrderManagement = () => {

    const [checkouts, setCheckouts] = useState([]);
    const [TimeFrequencyFilter, timeFrequencyFilteredItems] = useTimeFrequencyFilter(checkouts);
    const [FilterSearch, filteredData] = useFilterSearch(checkouts, ["checkout_id"]);


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

    /** MODAL */
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOpenAddModal = (orders) => {
        setSelectedOrders(orders)
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
    }

    return (
        <div className="px-16 py-8">
            <h1 className="text-5xl font-bold">Order</h1>

            {checkouts.length == 0 ?
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
                                            Checkout ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            User Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total Amount
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date Created
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Payment Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map(({ checkout_id, user, payment_status, total_amount, date_created, orders }, index) => (
                                        <tr key={index} className="bg-white  dark:border-gray-700">
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

                    <div className="flex justify-between">
                        <PrintToPDFButton handlePrint={handlePrint} />

            
                    </div>

                    {/* Order Modal */}
                    <OrderModal isModalVisible={isModalVisible} selectedOrders={selectedOrders} handleCloseModal={handleCloseModal} />
                </>
            }
        </div>
    )
}

export default OrderManagement