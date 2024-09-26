import { useMemo, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { convertDate, formatDate } from "../../../utils/formatter";


const emptyFields = {
    _id: "",
    name: "",
    email: "",
    mobile: "",
    address: "",
    age: "",
    birthday: "",
    gender: ""
};

const PatientModal = ({ handleCloseModal, isModalVisible, selectedPatient }) => {

    const [formFields, setFormFields] = useState(emptyFields);
    const [error, setError] = useState("");

    useMemo(() => {
        if (selectedPatient._id)
            setFormFields(selectedPatient);
        else
            setFormFields(emptyFields)
    }, [selectedPatient])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({
            ...formFields,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formFields);

        if (formFields._id)
            axiosClient
                .put("/patients/" + selectedPatient._id, { ...formFields, birthday: formatDate(birthday), })
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

        else
            axiosClient
                .post("/patients", { ...formFields, birthday: formatDate(birthday), })
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

    const deletePatient = (id) => {
        if (confirm("Are you sure you want to delete this patient?"))
            axiosClient
                .delete("/patients/" + id)
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

    if (!isModalVisible)
        return null;



    const {
        _id,
        name,
        email,
        mobile,
        address,
        age,
        birthday,
        gender
    } = formFields;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form className="bg-white p-8 rounded-lg w-1/2 max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold mb-4">{_id ? "Edit" : "Add"} patient:</h2>
                <div className="space-y-4">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Mobile
                            </label>
                            <input
                                type="text"
                                name="mobile"
                                value={mobile}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Birthday
                            </label>
                            <input
                                type="date"
                                name="birthday"
                                value={convertDate(birthday)}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Age
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={age}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Gender
                            </label>
                            <input
                                type="text"
                                name="gender"
                                value={gender}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={address}
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
                    {selectedPatient._id ?
                        <button
                            type="button"
                            onClick={() => deletePatient(selectedPatient._id)}
                            className="text-white bg-red-500 hover:bg-red-600 px-9 py-2 rounded ml-2"
                        >
                            Delete
                        </button> : null
                    }
                    <button
                        type="button"
                        className="text-white bg-blue-500 hover:bg-blue-600 px-9 py-2 rounded ml-2"
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientModal;
