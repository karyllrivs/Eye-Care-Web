import { useState } from "react";
import axiosClient from "../utils/axiosClient";


const emptyFields = {
    otp: ""
};

const VerifyPaymentModal = ({ handleCloseModal, isModalVisible, setIsPaymentVerified }) => {

    const [formFields, setFormFields] = useState(emptyFields);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({
            ...formFields,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosClient
            .post("/verify-payment", formFields)
            .then(({ data: { message } }) => {
                alert(message);
                setIsPaymentVerified(true);
                handleCloseModal();
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

    if (!isModalVisible)
        return null;

    const { otp } = formFields;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form className="bg-white p-8 rounded-lg w-1/5 max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold mb-4">Check your email to get the OTP.</h2>
                <div className="space-y-4">
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                OTP
                            </label>
                            <input
                                type="text"
                                name="otp"
                                value={otp}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        type="submit"
                        className="text-white bg-green-500 hover:bg-green-600 px-9 py-2 rounded"
                    >
                        Submit
                    </button>
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

export default VerifyPaymentModal;
