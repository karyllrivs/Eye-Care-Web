import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { formatDate, formatTimeToAMPM } from "../../../utils/formatter";

const ConsultationSlot = () => {
    const [slots, setSlots] = useState([]);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({ dateError: "", timeError: "" });

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

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
    };

    /** Form */
    const [formFields, setFormFields] = useState({ date: "", time: "" });
    const { date, time } = formFields;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value,
        });
        setFieldErrors({ ...fieldErrors, [`${name}Error`]: "" }); // Clear error on change
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Form validation: Check if date or time is empty
        let hasError = false;

        // Check if the selected date is a Sunday
        const selectedDate = new Date(date);
        if (selectedDate.getDay() === 0) { // 0 is Sunday
            setFieldErrors((prev) => ({ ...prev, dateError: "Sundays are not available for selection." }));
            hasError = true;
        } else {
            if (!date) {
                setFieldErrors((prev) => ({ ...prev, dateError: "Please select a date." }));
                hasError = true;
            }
        }

        if (!time) {
            setFieldErrors((prev) => ({ ...prev, timeError: "Please select a time slot." }));
            hasError = true;
        }

        if (hasError) return;

        const formattedFormFields = {
            time: formatTimeToAMPM(formFields.time),
            date: formatDate(formFields.date),
        };

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
    };

    const timeOptions = [
        "14:00", // 2:00 PM
        "14:30", // 2:30 PM
        "15:00", // 3:00 PM
        "15:30", // 3:30 PM
        "16:00", // 4:00 PM
        "16:30", // 4:30 PM
        "17:00", // 5:00 PM
        "17:30", // 5:30 PM
        "18:00", // 6:00 PM
        "18:30", // 6:30 PM
        "19:00", // 7:00 PM
    ];

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
                                    <label className="block text-sm font-semibold text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={date}
                                        onChange={handleChange}
                                        min={today} // Disable past dates
                                        className={`mt-1 block w-full border ${
                                            fieldErrors.dateError
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md shadow-sm px-3 py-2`}
                                    />
                                    {fieldErrors.dateError && (
                                        <p className="text-red-500 text-sm">{fieldErrors.dateError}</p>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-700">Time</label>
                                    <select
                                        name="time"
                                        value={time}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full border ${
                                            fieldErrors.timeError
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md shadow-sm px-3 py-2`}
                                    >
                                        <option value="">Select a time</option>
                                        {timeOptions.map((time, index) => (
                                            <option key={index} value={time}>
                                                {formatTimeToAMPM(time)}
                                            </option>
                                        ))}
                                    </select>
                                    {fieldErrors.timeError && (
                                        <p className="text-red-500 text-sm">{fieldErrors.timeError}</p>
                                    )}
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
                    {slots.length === 0 ? (
                        <h2 className="text-xl py-5 text-center">No data at the moment.</h2>
                    ) : (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Time</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slots.map(({ _id, date, time, isAvailable }, index) => (
                                    <tr key={index} className="bg-white  dark:border-gray-700">
                                        <td className="px-6 py-4">{date}</td>
                                        <td className="px-6 py-4">{time}</td>
                                        <td className="px-6 py-4">
                                            {isAvailable ? "Available" : "Occupied"}
                                        </td>
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
                    )}
                </div>
            </div>
        </>
    );
};

export default ConsultationSlot;
