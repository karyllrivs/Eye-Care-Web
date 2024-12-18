import 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";
import { getMonths, placeCustomersOnMonth, placePatientsOnMonth, placeSalesOnMonth } from '../../../utils/chartUtils';
import { useEffect, useMemo, useRef, useState } from 'react';
import axiosClient from '../../../utils/axiosClient';
import { printPage } from '../../../utils/printPage';
import PrintToPDFButton from '../components/PrintToPDFButton';

const defaultValue = {
    totalSalesAmount: 0,
    customerTotal: 0,
    orderTotal: 0,
    patientTotal: 0,
    customers: [],
    sales: [],
    patients: []
};

const Analytics = () => {
    const [analytics, setAnalytics] = useState(defaultValue);
    const [timeFilter, setTimeFilter] = useState("all");

    useEffect(() => {
        axiosClient
            .get("/analytics")
            .then(({ data }) => {
                setAnalytics(data);
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

    const { totalSalesAmount, customerTotal, orderTotal, patientTotal, customers, sales, patients } = analytics;

    const filterDataByTime = (data) => {
        const currentDate = new Date();
        let filteredData;

        switch (timeFilter) {
            case "daily":
                filteredData = data.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate.toDateString() === currentDate.toDateString();
                });
                break;
            case "weekly":
                filteredData = data.filter(item => {
                    const itemDate = new Date(item.date);
                    const weekStart = new Date(currentDate);
                    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
                    return itemDate >= weekStart && itemDate <= currentDate;
                });
                break;
            case "monthly":
                filteredData = data.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate.getMonth() === currentDate.getMonth() && itemDate.getFullYear() === currentDate.getFullYear();
                });
                break;
            case "6months":
                filteredData = data.filter(item => {
                    const itemDate = new Date(item.date);
                    const sixMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
                    return itemDate >= sixMonthsAgo;
                });
                break;
            case "annual":
                filteredData = data.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate.getFullYear() === currentDate.getFullYear();
                });
                break;
            default: 
                filteredData = data;
                break;
        }
        return filteredData;
    };

    const filteredCustomers = useMemo(() => filterDataByTime(customers), [customers, timeFilter]);
    const filteredSales = useMemo(() => filterDataByTime(sales), [sales, timeFilter]);
    const filteredPatients = useMemo(() => filterDataByTime(patients), [patients, timeFilter]);

    const barData = useMemo(() => {
        return {
            labels: getMonths,
            datasets: [
                {
                    label: 'Customers',
                    data: placeCustomersOnMonth(filteredCustomers),
                    backgroundColor: '#FF6384',
                },
                {
                    label: 'Patients',
                    data: placePatientsOnMonth(filteredPatients),
                    backgroundColor: '#36A2EB',
                },
            ],
        };
    }, [filteredCustomers, filteredPatients]);

    const lineData = useMemo(() => {
        return {
            labels: getMonths,
            datasets: [{
                label: 'Sales',
                data: placeSalesOnMonth(filteredSales),
                fill: false,
                borderColor: '#FF6384',
                tension: 0.1
            }]
        };
    }, [filteredSales]);

    // Added divRef and handlePrint
    const divRef = useRef();
    const handlePrint = () => {
        const input = divRef.current;
        const title = "Analytics Reports";
        printPage(input, title);
    };

    return (
        <div className="px-16 py-8">
            <h1 className="text-5xl font-bold">Analytics</h1>

            {/* Updated Filter Row */}
            <div className="my-10 flex items-center">
                <div className="flex space-x-2">
                    <button onClick={() => setTimeFilter("monthly")} className={`px-4 py-2 rounded ${timeFilter === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>Monthly</button>
                    <button onClick={() => setTimeFilter("6months")} className={`px-4 py-2 rounded ${timeFilter === "6months" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>6 Months</button>
                    <button onClick={() => setTimeFilter("annual")} className={`px-4 py-2 rounded ${timeFilter === "annual" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>Annual</button>
                    <button onClick={() => setTimeFilter("all")} className={`px-4 py-2 rounded ${timeFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>All Time</button>
                </div>
                <div className="ml-auto">
                    <PrintToPDFButton handlePrint={handlePrint} />
                </div>
            </div>

            <div ref={divRef}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 my-10">
                    <div className="bg-blue-100 p-4 rounded">
                        <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
                        <p className="text-2xl font-bold">₱{totalSalesAmount.toFixed(2)}</p>
                    </div>

                    <div className="bg-green-100 p-4 rounded">
                        <h2 className="text-xl font-semibold mb-2">Total Customers</h2>
                        <p className="text-2xl font-bold">{customerTotal}</p>
                    </div>

                    <div className="bg-yellow-100 p-4 rounded">
                        <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
                        <p className="text-2xl font-bold">{orderTotal}</p>
                    </div>

                    <div className="bg-red-100 p-4 rounded">
                        <h2 className="text-xl font-semibold mb-2">Total Patients</h2>
                        <p className="text-2xl font-bold">{patientTotal}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
                    <div className="p-4 bg-white border-2 rounded flex-1">
                        <h2 className="text-xl font-semibold mb-4">Monthly Customers/Patients</h2>
                        <Bar data={barData} />
                    </div>

                    <div className="p-4 bg-white border-2 rounded flex-1">
                        <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
                        <Line data={lineData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
