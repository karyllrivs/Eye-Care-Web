import axiosClient from "../../../utils/axiosClient";
import { getFile } from "../../../utils/serverFileUtils";

const OrderModal = ({ handleCloseModal, isModalVisible, selectedOrders }) => {

    if (!isModalVisible)
        return null;

    const updateOrderStatus = (id, status) => {
        axiosClient
            .put("/orders/" + id, { status })
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

    const deleteOrder = (id) => {
        if (confirm("Are you sure you want to delete this order?"))
            axiosClient
                .delete("/orders/" + id)
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-1/2 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4">Orders</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                    <thead className="bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedOrders.map(({ _id, product, quantity, total, status }) => (
                            <tr key={_id} className="bg-white  dark:border-gray-700">
                                <td className="px-6 py-4"><img className="h-24" src={getFile(product.image)} alt="" /> <span className="font-bold">{product.name}</span></td>
                                <td className="px-6 py-4">{quantity}</td>
                                <td className="px-6 py-4">₱{total}</td>
                                <td className="px-6 py-4">{status}</td>
                                <td className="px-6 py-4">
                                    {status == "Pending" ?
                                        <>
                                            <button
                                                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={() => updateOrderStatus(_id, "Confirmed")}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={() => updateOrderStatus(_id, "Canceled")}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                        : status == "Confirmed" ?
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={() => updateOrderStatus(_id, "Delivered")}
                                            >
                                                Delivered
                                            </button>
                                            : <button
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={() => deleteOrder(_id)}
                                            >
                                                Delete
                                            </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        className="text-white bg-blue-500 hover:bg-blue-600 px-9 py-2 rounded ml-2"
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderModal