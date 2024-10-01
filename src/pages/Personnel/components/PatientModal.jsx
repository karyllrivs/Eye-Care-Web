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
            setFormFields(emptyFields);
    }, [selectedPatient]);

    // Helper function to calculate age from birthday
    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Adjust the age if the birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If the birthday field is changed, calculate and update the age
        if (name === "birthday") {
            const age = calculateAge(value);
            setFormFields({
                ...formFields,
                [name]: value,
                age: age // Automatically update the age field
            });
        } else {
            setFormFields({
                ...formFields,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, mobile, address, age, birthday, gender } = formFields;

        // Validate required fields
        if (!name || !email || !mobile || !address || !age || !birthday || !gender) {
            setError("All fields are required.");
            return;
        }

        // Validate mobile length
        if (mobile.length !== 11) {
            setError("Mobile number must be 11 digits.");
            return;
        }

        // Clear error if validation passes
        setError("");

        // If email is empty, set it to "NA"
        const finalEmail = email === "" ? "NA" : email;

        const formData = { ...formFields, email: finalEmail, birthday: formatDate(birthday) };

        if (formFields._id) {
            axiosClient
                .put("/patients/" + selectedPatient._id, formData)
                .then(({ data: { message } }) => {
                    alert(message);
                    window.location.reload();
                })
                .catch(({ response: { data: { message } } }) => {
                    setError(message);
                });
        } else {
            axiosClient
                .post("/patients", formData)
                .then(({ data: { message } }) => {
                    alert(message);
                    window.location.reload();
                })
                .catch(({ response: { data: { message } } }) => {
                    setError(message);
                });
        }
    };

    const deletePatient = (id) => {
        if (confirm("Are you sure you want to delete this patient?"))
            axiosClient
                .delete("/patients/" + id)
                .then(({ data: { message } }) => {
                    alert(message);
                    window.location.reload();
                })
                .catch(({ response: { data: { message } } }) => {
                    console.log(message);
                });
    };

    if (!isModalVisible) return null;

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
                    {error && <p className="text-red-500 text-sm">{error}</p>} {/* Error message display */}
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
                                type="text"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Enter email or 'NA' if not available"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                            <small className="text-gray-500">
                                If email is not available, type "NA".
                            </small>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Mobile
                            </label>
                            <input
                                type="tel"
                                name="mobile"
                                value={mobile}
                                onChange={handleChange}
                                pattern="\d{11}" // Allows only 11 digits
                                maxLength="11" // Limit to 11 digits
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                                placeholder="Enter 11-digit mobile number"
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
                                readOnly // Make the age field read-only as it's calculated automatically
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={gender}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            >
                                <option value="">Select Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other</option>
                            </select>
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
                    {_id ? (
                        <button
                            type="button"
                            onClick={() => deletePatient(_id)}
                            className="text-white bg-red-500 hover:bg-red-600 px-9 py-2 rounded ml-2"
                        >
                            Delete
                        </button>
                    ) : null}
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
