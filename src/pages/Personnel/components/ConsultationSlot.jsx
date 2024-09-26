import { useEffect, useState } from "react"
import axiosClient from "../../../utils/axiosClient";
import { formatDate, formatTimeToAMPM } from "../../../utils/formatter";

const ConsultationSlot = () => {

    const [slots, setSlots] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axiosClient
            .get("/consultation-slots")
            .then(({ data }) => {
                setSlots(data);
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

    const deleteConsultationSlot = (id) => {
        if (confirm("Are you sure you want to delete this consultation slot?"))
            axiosClient
                .delete("/consultation-slot/" + id)
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

    /** Form */
    const [formFields, setFormFields] = useState({ date: "", time: "" });
    const { date, time } = formFields;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedFormFields = {
            time: formatTimeToAMPM(formFields.time),
            date: formatDate(formFields.date),
        }
        console.log(formattedFormFields);

        axiosClient
            .post("/consultation-slots/", formattedFormFields)
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
                    setError(message);
                }
            );
    }

    return (
        <>

            <h2 className="mt-5 text-3xl font-bold">Consultation Slots</h2>
            <div className="my-10 grid grid-cols-2 gap-4">
                <div className="relative overflow-x-auto h-fit shadow-md sm:rounded-lg bg-white p-8 rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-lg font-semibold mb-4">Add Slot:</h2>
                        <div className="space-y-4">
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={date}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={time}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="text-white bg-green-500 hover:bg-green-600 px-9 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <div className="relative overflow-x-auto h-fit shadow-md sm:rounded-lg">
                    {slots.length == 0 ?
                        <h2 className="text-xl py-5 text-center">No data at the moment.</h2>
                        :
                        <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Time
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {slots.map(({ _id, date, time, isAvailable }, index) => (
                                    <tr key={index} className="bg-white  dark:border-gray-700">
                                        <td className="px-6 py-4">{date}</td>
                                        <td className="px-6 py-4">{time}</td>
                                        <td className="px-6 py-4">{isAvailable ? "Available" : "Occupied"}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => deleteConsultationSlot(_id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default ConsultationSlot