import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selector";
import axiosClient from "../utils/axiosClient";
import { getFile } from "../utils/serverFileUtils";
import AddRatingModal from "../components/AddRatingModal";

const OrderHistory = () => {

  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const currentUser = useSelector(selectCurrentUser);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const { _id } = currentUser;

    axiosClient
      .get("/orders/" + _id)
      .then(({ data }) => {
        setOrders(data);
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
  }, [currentUser]);

  // Modal
  const handleOpenModal = (product_id) => {
    setSelectedProduct(product_id);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow pl-[20rem] pr-[4rem]">
          <div className="container mx-auto mt-10 px-4 lg:px-0">
            <h1 className="text-2xl font-bold text-[#384D6C] mb-4 underline pb-8">
              Order History
            </h1>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Delivered On
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order._id.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={getFile(order.image)} alt="Glasses" className="h-8" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.delivered_on}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Confirmed" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
                            }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₱{order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleOpenModal(order.product_id)}
                          type="button">
                          Add Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />

      <AddRatingModal handleCloseModal={handleCloseModal} isModalVisible={isModalVisible} selectedProduct={selectedProduct} />
    </>
  );
};

export default OrderHistory;
