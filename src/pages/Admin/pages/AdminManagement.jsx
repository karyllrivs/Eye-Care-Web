import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import Glasses1 from "../../../assets/glasses1.png";

const AdminManagement = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const allOrders = [
    {
      id: 1,
      name: "Kim Dahyun",
      product: "Oakley",
      total: "P134",
      date: "02/12/12",
      quantity: 1,
      status: "Pending",
      orderId: "2201223FJA0OQ",
      address: "123 Main St, Seoul, Korea",
      logistics: "In Transit",
      deliveryDate: "02/15/12",
      steps: {
        received: "02/10/12",
        beingPrepared: "02/11/12",
        prepared: "02/12/12",
        outForDelivery: "02/14/12",
        delivered: "02/15/12",
      },
    },
    {
      id: 2,
      name: "Minatozaki Sana",
      product: "Ray-Ban",
      total: "P200",
      date: "03/12/12",
      quantity: 2,
      status: "Complete",
      orderId: "2201223FJA0OR",
      address: "456 Elm St, Tokyo, Japan",
      logistics: "Delivered",
      deliveryDate: "03/15/12",
      steps: {
        received: "03/10/12",
        beingPrepared: "03/11/12",
        prepared: "03/12/12",
        outForDelivery: "03/14/12",
        delivered: "03/15/12",
      },
    },
    {
      id: 3,
      name: "Im Nayeon",
      product: "Gucci",
      total: "P300",
      date: "04/12/12",
      quantity: 1,
      status: "Pending",
      orderId: "2201223FJA0OS",
      address: "789 Maple St, Busan, Korea",
      logistics: "In Transit",
      deliveryDate: "04/15/12",
      steps: {
        received: "04/10/12",
        beingPrepared: "04/11/12",
        prepared: "04/12/12",
        outForDelivery: "04/14/12",
        delivered: "04/15/12",
      },
    },
    {
      id: 4,
      name: "Myoui Mina",
      product: "Prada",
      total: "P250",
      date: "05/12/12",
      quantity: 3,
      status: "Complete",
      orderId: "2201223FJA0OT",
      address: "101 Pine St, Osaka, Japan",
      logistics: "Delivered",
      deliveryDate: "05/15/12",
      steps: {
        received: "05/10/12",
        beingPrepared: "05/11/12",
        prepared: "05/12/12",
        outForDelivery: "05/14/12",
        delivered: "05/15/12",
      },
    },
  ];

  const pendingOrders = allOrders.filter((order) => order.status === "Pending");
  const completeOrders = allOrders.filter(
    (order) => order.status === "Complete"
  );

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  const renderOrders = (orders) => {
    return orders.map((order) => (
      <React.Fragment key={order.id}>
        <tr className="border-solid border-2 border-[#f2f2f2]-200">
          <td className="flex p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span>{order.name}</span>
          </td>
          <td colSpan="5" className="p-3">
            <div className="grid justify-items-stretch">
              <span className="justify-self-end">
                ORDER ID: {order.orderId}
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td className="px-[4rem] py-5 ">
            <img
              src={Glasses1}
              className="w-13 h-14 object-cover rounded"
              alt="product"
            />
            {order.product}
          </td>
          <td className="px-[4rem] py-5">{order.total}</td>
          <td className="px-[4rem] py-5">{order.date}</td>
          <td className="px-[5rem] py-5">{order.quantity}</td>
          <td
            className={`px-[5rem] py-5 ${
              order.status === "Pending" ? "text-red-500" : "text-green-500"
            }`}
          >
            {order.status}
          </td>
          <td className="px-[4rem] py-5">
            <button className="text-blue-600" onClick={() => openModal(order)}>
              Order Details
            </button>
          </td>
        </tr>
      </React.Fragment>
    ));
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto mt-8 pl-[15rem] pr-4 w-100">
        <h1 className="text-3xl font-semibold mb-8">Order Management</h1>

        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="me-2">
            <a
              href="#"
              onClick={() => setActiveTab("All")}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "All"
                  ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                  : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }`}
            >
              All
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              onClick={() => setActiveTab("Pending")}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "Pending"
                  ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                  : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }`}
            >
              Pending ({pendingOrders.length})
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              onClick={() => setActiveTab("Complete")}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "Complete"
                  ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                  : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }`}
            >
              Complete
            </a>
          </li>
        </ul>

        <table className="table-auto w-full">
          <thead className="bg-[#f2f2f2]">
            <tr>
              <th className="px-[4rem] py-5">Product</th>
              <th className="px-[4rem] py-5">Total</th>
              <th className="px-[4rem] py-5">Date</th>
              <th className="px-[4rem] py-5">Quantity</th>
              <th className="px-[4rem] py-5">Order Details</th>
              <th className="px-[4rem] py-5"></th>
            </tr>
          </thead>
          <tbody className="border-solid border-2 border-[#f2f2f2]-200">
            {activeTab === "All" && renderOrders(allOrders)}
            {activeTab === "Pending" && renderOrders(pendingOrders)}
            {activeTab === "Complete" && renderOrders(completeOrders)}
          </tbody>
        </table>
      </div>
      <AdminSidebar />

      {modalVisible && selectedOrder && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-11/12 max-w-3xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Order Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="row flex h-full">
              <div class="col w-1/2 h-full">
                <div className="space-y-4">
                <p>
                  <strong>Order ID</strong> 
                </p>
                <p class="text-gray-500">
                  {selectedOrder.orderId}
                </p>
                <p>
                  <strong>Delivery Address</strong> 
                </p>
                <p class="text-gray-500">
                  {selectedOrder.name}
                </p>
                <p class="text-gray-500">
                  {selectedOrder.address}
                </p>
                <p>
                  <strong>Logistics Information </strong>
                  {" "}
                  {/* loading shipping channel etc */}
                </p>
               
                <div class="flex items-center ">
                  <div class="p-2">
                    <img
                      src={Glasses1}
                      className="w-20 object-cover rounded"
                      alt="product"
                    />
                  </div>
                  <div class="pl-5">
                    <p>
                      <strong>Product:</strong> {selectedOrder.product}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {selectedOrder.quantity}
                    </p>
                    <p>
                      <strong>Date:</strong> {selectedOrder.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col w-1/2 h-full">
                <div class="pb-5">
                  <p>{selectedOrder.logistics}</p>
                  <p>
                    <strong>Delivery Date:</strong> {selectedOrder.deliveryDate}
                  </p>
                </div>

                <div>
                  <ol class="relative border-s border-gray-300 dark:border-blue-700">
                    <li class="mb-5 ms-4">
                      <div class="absolute w-3 h-3 bg-blue-300 rounded-full mt-3.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                      <div class="p-2 bg-gray-50 text-sm w-full">
                        <time class="pr-5 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          {selectedOrder.steps.received}
                        </time>
                        <strong>Received</strong>{" "}
                      </div>
                    </li>
                    <li class="mb-5 ms-4">
                      <div class="absolute w-3 h-3 bg-blue-200 rounded-full mt-3.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                      <div class="p-2 bg-gray-50 text-sm">
                        <time class="pr-5 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          {selectedOrder.steps.beingPrepared}
                        </time>
                        <strong>Order being prepared</strong>{" "}
                      </div>
                    </li>
                    <li class="mb-5 ms-4">
                      <div class="absolute w-3 h-3 bg-blue-200 rounded-full mt-3.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                      <div class="p-2 bg-gray-50 text-sm">
                        <time class="pr-5 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          {selectedOrder.steps.prepared}
                        </time>
                        <strong>Prepared</strong>{" "}
                      </div>
                    </li>
                    <li class="mb-5 ms-4">
                      <div class="absolute w-3 h-3 bg-blue-200 rounded-full mt-3.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                      <div class="p-2 bg-gray-50 text-sm">
                        <time class="pr-5 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          {selectedOrder.steps.outForDelivery}
                        </time>
                        <strong>Out for Delivery</strong>{" "}
                      </div>
                    </li>
                    <li class="mb-5 ms-4">
                      <div class="absolute w-3 h-3 bg-blue-500 rounded-full mt-3.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                      <div class="p-2 bg-gray-50 text-sm">
                        <time class="pr-5 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          {selectedOrder.steps.delivered}
                        </time>
                        <strong>Delivered</strong>{" "}
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminManagement;
