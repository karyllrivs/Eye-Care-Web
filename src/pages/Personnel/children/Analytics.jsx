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
    }, [])

    const { totalSalesAmount, customerTotal, orderTotal, patientTotal, customers, sales, patients } = analytics;

    const barData = useMemo(() => {
        return {
            labels: getMonths,
            datasets: [
                {
                    label: 'Customers',
                    data: placeCustomersOnMonth(customers),
                    backgroundColor: '#FF6384',
                },
                {
                    label: 'Patients',
                    data: placePatientsOnMonth(patients),
                    backgroundColor: '#36A2EB',
                },
            ],
        }
    }, [patients, customers]);

    const lineData = useMemo(() => {
        return {
            labels: getMonths,
            datasets: [{
                label: 'Sales',
                data: placeSalesOnMonth(sales),
                fill: false,
                borderColor: '#FF6384',
                tension: 0.1
            }]
        };
    }, [sales]);

    const divRef = useRef();
    const handlePrint = () => {
        const input = divRef.current;
        const title = "Analytics Reports";
        printPage(input, title);
    }

    return (
        <div className="px-16 py-8">
            <h1 className="text-5xl font-bold">Analytics</h1>

            <div ref={divRef}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6  my-10">
                    <div className="bg-blue-100 p-4 rounded">
                        <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
                        <p className="text-2xl font-bold">₱{totalSalesAmount}</p>
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
            <PrintToPDFButton handlePrint={handlePrint} />
        </div >
    );
}

export default Analytics