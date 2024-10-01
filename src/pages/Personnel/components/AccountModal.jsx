import { useMemo, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { getFile } from "../../../utils/serverFileUtils";
import { convertDate, formatDate } from "../../../utils/formatter";

const defaultFields = {
    _id: "",
    username: "",
    password: "",
    profile: {
        name: "",
        image: "",
        mobile: "",
        age: "",
        gender: "",
        birthday: "",
        address: ""
    },
    role: "staff",
};

const AccountModal = ({ handleCloseModal, isModalVisible, selectedAccount, isSuperAdmin = false }) => {

    const [formFields, setFormFields] = useState(defaultFields);
    const [error, setError] = useState("");

    useMemo(() => {
        if (selectedAccount._id)
            setFormFields({ password: "", ...selectedAccount });
        else
            setFormFields(defaultFields)
    }, [selectedAccount])

    const calculateAge = (birthday) => {
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle mobile number validation
        if (name === "mobile") {
            const regex = /^[0-9]*$/; // Allow only numbers
            if (value.length <= 11 && regex.test(value)) {
                setFormFields({
                    ...formFields,
                    profile: {
                        ...formFields.profile,
                        [name]: value,
                    }
                });
            }
            return;
        }

        // Handle birthday input and age calculation
        if (name === "birthday") {
            const age = calculateAge(value);
            setFormFields({
                ...formFields,
                profile: {
                    ...formFields.profile,
                    [name]: value,
                    age: age, // Set calculated age
                }
            });
            return;
        }

        if (name === "username" || name === "password" || name === "role") {
            setFormFields({
                ...formFields,
                [name]: value,
            });
            return;
        }

        setFormFields({
            ...formFields,
            profile: {
                ...formFields.profile,
                [name]: value,
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formFields._id)
            axiosClient
                .put("/personnel/" + selectedAccount._id, { ...formFields, profile: { ...formFields.profile, birthday: formatDate(formFields.profile.birthday) } }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(({ data: { message } }) => {
                    alert(message);
                    window.location.reload();
                })
                .catch(
                    ( {
                        response: {
                            data: { message },
                        },
                    }) => {
                        setError(message);
                    }
                );

        else
            axiosClient
                .post("/personnel", { ...formFields, profile: { ...formFields.profile, birthday: formatDate(formFields.profile.birthday) } }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(({ data: { message } }) => {
                    alert(message);
                    window.location.reload();
                })
                .catch(
                    ( {
                        response: {
                            data: { message },
                        },
                    }) => {
                        setError(message);
                    }
                );
    };

    const loadImage = (event) => {
        let reader = new FileReader();
        reader.onload = function () {
            let output = document.getElementById('ImagePreview');
            output.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        setFormFields({
            ...formFields,
            image: event.target.files[0]
        });
    };

    const deleteStaff = (id) => {
        if (confirm("Are you sure you want to delete this personnel?"))
            axiosClient
                .delete("/personnel/" + id)
                .then(({ data: { message } }) => {
                    alert(message);
                    window.location.reload();
                })
                .catch(
                    ( {
                        response: {
                            data: { message },
                        },
                    }) => {
                        console.log(message);
                    }
                );
    };

    if (!isModalVisible)
        return null;

    const {
        _id,
        username,
        password,
        profile: {
            name,
            image,
            mobile,
            age,
            gender,
            birthday,
            address,
        },
        role
    } = formFields;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form className="bg-white p-8 rounded-lg w-1/2 max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold mb-4">{_id ? "Edit" : "Add"} {role}:</h2>
                <div className="space-y-4">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                        {isSuperAdmin
                            ? <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={role}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                                >
                                    <option value="staff">Staff</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>
                            : <span></span>
                        }
                    </div>
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
                                Mobile
                            </label>
                            <input
                                type="tel"
                                name="mobile"
                                value={mobile}
                                onChange={handleChange}
                                maxLength={11}
                                pattern="\d{11}"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                                placeholder="Enter 11 digit mobile number"
                                required
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
                                readOnly // Make age read-only as it's calculated
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4">
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
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
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
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Avatar
                            </label>
                            <input
                                type="file"
                                onChange={loadImage}
                                accept="image/*"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                            <div className="mt-2 flex flex-wrap">
                                <img
                                    id="ImagePreview"
                                    src={image ? getFile(image) : "https://via.placeholder.com/150"}
                                    alt={name}
                                    className="mt-2 rounded-md border border-gray-300"
                                    style={{ maxWidth: "200px", marginRight: "10px" }}
                                />
                            </div>
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
                    {selectedAccount._id ? 
                        <button
                            type="button"
                            onClick={() => deleteStaff(selectedAccount._id)}
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

export default AccountModal;
