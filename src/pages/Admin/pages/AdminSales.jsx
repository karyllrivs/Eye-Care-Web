// src/pages/AdminSales.jsx
import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import { Dropdown, months, years } from "../components/Dropdown";

const salesData = [
  {
    id: 1,
    date: "2023-05-01",
    invoice: "INV-001",
    orderNumber: "ORD-001",
    amount: 120.0,
  },
  {
    id: 2,
    date: "2023-05-02",
    invoice: "INV-002",
    orderNumber: "ORD-002",
    amount: 250.5,
  },
  {
    id: 3,
    date: "2023-05-03",
    invoice: "INV-003",
    orderNumber: "ORD-003",
    amount: 320.75,
  },
  {
    id: 4,
    date: "2023-05-04",
    invoice: "INV-004",
    orderNumber: "ORD-004",
    amount: 450.0,
  },
  {
    id: 5,
    date: "2023-05-05",
    invoice: "INV-005",
    orderNumber: "ORD-005",
    amount: 75.25,
  },
  {
    id: 6,
    date: "2023-05-01",
    invoice: "INV-006",
    orderNumber: "ORD-006",
    amount: 120.0,
  },
  {
    id: 7,
    date: "2023-05-02",
    invoice: "INV-007",
    orderNumber: "ORD-007",
    amount: 250.5,
  },
  {
    id: 8,
    date: "2023-05-03",
    invoice: "INV-008",
    orderNumber: "ORD-008",
    amount: 320.75,
  },
  {
    id: 9,
    date: "2023-05-04",
    invoice: "INV-009",
    orderNumber: "ORD-009",
    amount: 450.0,
  },
  {
    id: 10,
    date: "2023-05-05",
    invoice: "INV-010",
    orderNumber: "ORD-010",
    amount: 75.25,
  },
  {
    id: 11,
    date: "2023-05-06",
    invoice: "INV-011",
    orderNumber: "ORD-011",
    amount: 75.25,
  },
];

const AdminSales = () => {
  const handleSelectMonth = (selectedMonth) => {
    console.log("Selected month:", selectedMonth);
    // Perform actions based on the selected month
  };

  const handleSelectYear = (selectedYear) => {
    console.log("Selected year:", selectedYear);
    // Perform actions based on the selected year
  };

  const totalAmount = salesData.reduce((total, sale) => total + sale.amount, 0);

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto mt-8 pl-[15rem] pr-4">
        <h1 className="text-3xl font-semibold mb-8">Sales</h1>

        <div className="mb-8 flex space-x-4">
          <Dropdown
            options={months}
            onSelect={handleSelectMonth}
            placeholder="Select a month"
          />
          <Dropdown
            options={years}
            onSelect={handleSelectYear}
            placeholder="Select a year"
          />
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
          <div className="max-h-[36rem] overflow-y-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200 sticky top-0">
                <tr>
                  <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                    ID
                  </th>
                  <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                    Date
                  </th>
                  <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                    Invoice
                  </th>
                  <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                    Order Number
                  </th>
                  <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                    Amount (PHP)
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale) => (
                  <tr key={sale.id} className="bg-white border-b">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                      {sale.id}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {sale.date}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {sale.invoice}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {sale.orderNumber}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      ₱{sale.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-right font-semibold text-lg">
          Total Amount: ₱{totalAmount.toFixed(2)}
        </div>
      </div>
      <AdminSidebar />
    </>
  );
};

export default AdminSales;
