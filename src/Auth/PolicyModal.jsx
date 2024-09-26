import { useEffect, useState } from "react"
import axiosClient from "../utils/axiosClient";

const PolicyModal = ({ handleCloseModal, isModalVisible }) => {

    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        axiosClient
            .get("/policies/")
            .then(({ data }) => {
                setPolicies(data);
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

    if (!isModalVisible)
        return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-1/2 max-h-[90vh] overflow-y-auto">
                {policies.length > 0
                    ? <div dangerouslySetInnerHTML={{ __html: policies[0].content }}></div>
                    : <span></span>
                }
                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        className="text-white bg-blue-500 hover:bg-blue-600 px-9 py-2 rounded ml-2"
                        onClick={handleCloseModal}
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PolicyModal