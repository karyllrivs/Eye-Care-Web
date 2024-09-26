import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-toastify";

const AddRatingModal = ({ handleCloseModal, isModalVisible, selectedProduct }) => {
    const [rating, setRating] = useState(0);
    const defaultFormFields = {
        product_id: "",
        rating: 0,
        review: "",
    };
    const [formFields, setFormFields] = useState(defaultFormFields);

    const handleStarClick = (index) => {
        setRating(index + 1);
        setFormFields({
            ...formFields,
            product_id: selectedProduct,
            rating: index + 1
        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            product_id: selectedProduct,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { review } = formFields;
        if (!review) alert("Review is required.");

        console.log(formFields);

        axiosClient
            .post("/ratings", formFields)
            .then(({ data: { message, newRating } }) => {
                console.log(newRating);
                toast.success(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })
            .catch(
                ({
                    response: {
                        data: { message },
                    },
                }) => {
                    toast.error(message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            );
        resetFormFields();
        handleCloseModal();
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
        setRating(0);
    }

    if (!isModalVisible)
        return null;

    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 ">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Add a Review:
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={() => { handleCloseModal(); resetFormFields(); }}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form onSubmit={handleSubmit}>
                        <div className="p-4 md:p-5 space-y-4">
                            <div className="mb-4">
                                <label
                                    htmlFor="rating"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Rating
                                </label>
                                <div className="inline-flex items-center">
                                    {[...Array(5)].map((_, index) => (
                                        <span
                                            key={index}
                                            onClick={() => handleStarClick(index)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className={`w-6 h-6 ${index < rating ? "text-yellow-300" : ""
                                                    }  cursor-pointer`}
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </span>
                                    ))}

                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="review"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Review
                                </label>
                                <textarea
                                    id="review"
                                    name="review"
                                    onChange={handleChange}
                                    value={formFields.review}
                                    rows="4"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                ></textarea>
                            </div>
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => { handleCloseModal(); resetFormFields(); }}
                                type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRatingModal;
