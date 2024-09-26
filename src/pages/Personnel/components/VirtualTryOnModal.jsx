import { useMemo, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { getFile } from "../../../utils/serverFileUtils";

const VirtualTryOnModal = ({ handleCloseVTOModal, isVTOModalVisible, selectedProduct }) => {

    const [tryons, setTryons] = useState([]);
    const [formFields, setFormFields] = useState({
        image: ""
    })

    useMemo(() => {
        if (selectedProduct._id == undefined) return;
        axiosClient
            .get("/objects/" + selectedProduct._id)
            .then(({ data }) => {
                setTryons(data);
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
    }, [selectedProduct])


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

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosClient
            .post("/objects/" + selectedProduct._id, formFields, {
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
                    alert(message);
                }
            );
    }

    const deleteVirtualTryOnImage = (id) => {
        if (confirm("Are you sure you want to delete this image?"))
            axiosClient
                .delete("/objects/" + id)
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

    if (!isVTOModalVisible)
        return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-1/2 max-h-[90vh]">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between">
                    <h2 className="text-xl font-semibold text-gray-700">Virtual Try-On</h2>
                    <button
                        type="button"
                        className="text-white bg-blue-500 hover:bg-blue-600  px-9 py-2 rounded ml-2"
                        onClick={handleCloseVTOModal}
                    >
                        Close
                    </button>
                </div>
                {/* Modal Body */}
                <div className="p-6 h-96 grid grid-cols-3 gap-10">
                    {/* Form Section */}
                    <form className="col-span-1" onSubmit={handleSubmit}>
                        <h2 className="text-lg font-semibold mb-4">Add Virtual Try-On</h2>
                        <div className="mb-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Eyeware with Transparent BG
                            </label>
                            <div className="mt-2 flex flex-wrap">
                                <img
                                    id="ImagePreview"
                                    src="https://via.placeholder.com/150"
                                    className="mt-2 rounded-md border border-gray-300"
                                    style={{ maxWidth: "200px" }}
                                />
                            </div>
                            <input
                                type="file"
                                onChange={loadImage}
                                accept="image/*"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"

                            />
                        </div>
                        <div className="mb-2 flex justify-end">
                            <button type="submit" className="text-white bg-green-500 hover:bg-green-600  px-9 py-2 rounded">Save</button>
                        </div>
                    </form>
                    {/* Table Section */}
                    <div className="col-span-2 overflow-y-auto">
                        {tryons.length == 0
                            ? <h2 className="text-2xl py-5">No data at the moment.</h2>
                            : <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Image</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tryons.map(tryon => <tr key={tryon._id}>
                                        <td className="px-6 py-4">
                                            <img className="h-15" src={getFile(tryon.image)} alt="" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                type="button"
                                                className="text-white bg-red-500 hover:bg-red-600 px-9 py-2 rounded ml-2"
                                                onClick={() => deleteVirtualTryOnImage(tryon._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        }
                    </div>

                </div>
                {/* Modal Footer */}
            </div>
        </div>
    );
};

export default VirtualTryOnModal;
