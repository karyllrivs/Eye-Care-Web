import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { getFile } from "../../../utils/serverFileUtils";
import ProductModal from "../components/ProductModal";
import VirtualTryOnModal from "../components/VirtualTryOnModal";
import { printPage } from "../../../utils/printPage";
import PrintToPDFButton from "../components/PrintToPDFButton";

import useFilterSearch from "../components/FilterSearch";
import useTimeFrequencyFilter from "../components/TimeFrequencyFilter";

const InventoryManagement = () => {


    const [products, setProducts] = useState([]);
    const [TimeFrequencyFilter, timeFrequencyFilteredItems] = useTimeFrequencyFilter(products);
    const [FilterSearch, filteredData] = useFilterSearch(products, ["name"]);

    /** PRODUCT MODAL */
    const [selectedProduct, setSelectedProduct] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOpenEditModal = (product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };
    const handleOpenAddModal = () => {
        setSelectedProduct({});
        setIsModalVisible(true);
    };
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    /** VTO MODAL */
    const [isVTOModalVisible, setIsVTOModalVisible] = useState(false);
    const handleOpenVTOModal = (product) => {
        setSelectedProduct(product);
        setIsVTOModalVisible(true);
    };
    const handleCloseVTOModal = () => {
        setIsVTOModalVisible(false);
    };

    useEffect(() => {
        axiosClient
            .get("/products")
            .then(({ data }) => {
                setProducts(data);
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

    const divRef = useRef();
    const handlePrint = () => {
        const input = divRef.current;
        const title = "Inventory Reports";
        printPage(input, title);
    }

    return (
        <div className="px-16 py-8">
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold">Inventory</h1>
                <button onClick={handleOpenAddModal} className="text-white bg-green-500 shadow hover:bg-green-600 px-9 py-2 rounded">
                    Add Product
                </button>
            </div>
            {products.length == 0 ?
                <h2 className="text-2xl py-5">No data at the moment.</h2>
                :
                <>
                    <div className="my-10">
                        <div className="flex gap-2">
                            {FilterSearch}
                            {TimeFrequencyFilter}
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2" ref={divRef}>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Image
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Stock
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((product, index) => (
                                        <tr key={index} className="bg-white  dark:border-gray-700">
                                            <td className="px-6 py-4">
                                                <img className="h-28 w-28 mr-4" src={getFile(product.image)} alt="" />
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.name}
                                            </td>
                                            <td className="px-6 py-4">{product.category_name}</td>
                                            <td className="px-6 py-4">{product.description}</td>
                                            <td className="px-6 py-4">₱{product.price}</td>
                                            <td className="px-6 py-4">{product.stock}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                                                    onClick={() => handleOpenVTOModal(product)}
                                                >
                                                    VTO
                                                </button>
                                                <button
                                                    className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                                                    onClick={() => handleOpenEditModal(product)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <PrintToPDFButton handlePrint={handlePrint} />

                     
                     
                    </div>

                    {/* Product Modal */}
                    <ProductModal handleCloseModal={handleCloseModal} isModalVisible={isModalVisible} selectedProduct={selectedProduct} />

                    {/* Virtual Try On Modal */}
                    <VirtualTryOnModal handleCloseVTOModal={handleCloseVTOModal} isVTOModalVisible={isVTOModalVisible} selectedProduct={selectedProduct} />
                </>
            }
        </div>
    )
}

export default InventoryManagement