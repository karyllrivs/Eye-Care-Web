import { useEffect, useMemo, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { getFile } from "../../../utils/serverFileUtils";


const emptyFields = {
    _id: "",
    category_id: "",
    category_name: "",
    name: "",
    image: "",
    description: "",
    price: "",
    stock: "",
};

const ProductModal = ({ handleCloseModal, isModalVisible, selectedProduct }) => {

    const [formFields, setFormFields] = useState(emptyFields);
    const [error, setError] = useState("");

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axiosClient
            .get("/categories/")
            .then(({ data }) => {
                setCategories(data);
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

    useMemo(() => {
        if (selectedProduct._id)
            setFormFields(selectedProduct);
        else
            setFormFields(emptyFields)
    }, [selectedProduct])

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "category_id") {
            const category_name = categories.find((category) => category._id == value).name;
            setFormFields({
                ...formFields,
                category_name,
                [name]: value,
            });
        } else {
            setFormFields({
                ...formFields,
                [name]: value,
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formFields._id)

            axiosClient
                .put("/products/" + selectedProduct._id, formFields, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
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
                .post("/products", formFields, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
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

    const loadImage = (event) => {
        let reader = new FileReader();
        reader.onload = function () {
            let output =
                document.getElementById('ImagePreview');
            output.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        setFormFields({
            ...formFields,
            image: event.target.files[0]
        });
    }


    const deleteProduct = (id) => {
        if (confirm("Are you sure you want to delete this product?"))
            axiosClient
                .delete("/products/" + id)
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
                        console.error(message);
                    }
                );
    }

    if (!isModalVisible)
        return null;



    const {
        _id,
        category_id,
        name,
        image,
        description,
        price,
        stock, } = formFields;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form className="bg-white p-8 rounded-lg w-1/2 max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold mb-4">{_id ? "Edit" : "Add"} Product:</h2>
                <div className="space-y-4">

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={price}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Stock Quantity
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={stock}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Category
                            </label>
                            <select
                                id="category_id"
                                name="category_id"
                                onChange={handleChange}
                                value={category_id}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2" >
                                {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700">
                                Thumbnails
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
                        className="text-white bg-green-500 hover:bg-green-600  px-9 py-2 rounded"
                    >
                        Save
                    </button>
                    {selectedProduct._id ?
                        <button
                            type="button"
                            onClick={() => deleteProduct(selectedProduct._id)}
                            className="text-white bg-red-500 hover:bg-red-600 px-9 py-2 rounded ml-2"
                        >
                            Delete
                        </button> : null
                    }
                    <button
                        type="button"
                        className="text-white bg-blue-500 hover:bg-blue-600  px-9 py-2 rounded ml-2"
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductModal;
