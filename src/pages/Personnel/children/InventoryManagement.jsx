import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { getFile } from "../../../utils/serverFileUtils";
import ProductModal from "../components/ProductModal";
import VirtualTryOnModal from "../components/VirtualTryOnModal";
import { printPage } from "../../../utils/printPage";
import PrintToPDFButton from "../components/PrintToPDFButton";
import useFilterSearch from "../components/FilterSearch";

const InventoryManagement = () => {
    const [products, setProducts] = useState([]);

    // Apply search filter on the items
    const [FilterSearch, filteredData] = useFilterSearch(products, ["name"]);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");

    const [brands, setBrands] = useState(["All Brands", "Dazzle", "Giordano", "Hangten"]);
    const [selectedBrand, setSelectedBrand] = useState("All Brands");

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

    // Fetch products and categories
    useEffect(() => {
        axiosClient
            .get("/products")
            .then(({ data }) => {
                console.log(data); // Log products data
                setProducts(data);
                const uniqueCategories = [
                    "All Categories",
                    ...new Set(data.map((product) => product.category_name)),
                ];
                setCategories(uniqueCategories);
            })
            .catch(({ response: { data: { message } } }) => {
                alert(message);
            });
    }, []);

    const divRef = useRef();
    const handlePrint = () => {
        const input = divRef.current;
        const title = "Inventory Reports";
        printPage(input, title);
    };

    // Filter products based on the selected category and brand
    const filteredByCategory =
        selectedCategory === "All Categories"
            ? filteredData
            : filteredData.filter((product) => product.category_name === selectedCategory);

    const filteredByBrand =
        selectedBrand === "All Brands"
            ? filteredByCategory
            : filteredByCategory.filter((product) => {
                  // Check if product.brand exists before trimming and comparing
                  if (!product.brand) {
                      console.log("Product without brand:", product); // Log products without a brand
                      return false; // Exclude products without a brand
                  }
                  // Extract brand from product name if applicable (modify this logic based on how brands are represented in product names)
                  const brandFromName = product.name.split(" ")[0]; // Example: Assuming brand is the first word in the name
                  return brandFromName.trim().toLowerCase() === selectedBrand.trim().toLowerCase();
              });

    return (
        <div className="px-16 py-8">
            <div className="flex justify-between">
                <h1 className="text-5xl font-bold">Inventory</h1>
                <button
                    onClick={handleOpenAddModal}
                    className="text-white bg-green-500 shadow hover:bg-green-600 px-9 py-2 rounded"
                >
                    Add Product
                </button>
            </div>
            {products.length === 0 ? (
                <h2 className="text-2xl py-5">No data at the moment.</h2>
            ) : (
                <>
                    <div className="my-10">
                        <div className="flex gap-2 items-center">
                            {/* Search Bar */}
                            {FilterSearch}

                            {/* Category Selection */}
                            <div className="flex items-center">
                                <select
                                    id="category-select"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-lg bg-white text-gray-600 text-sm"
                                    style={{ height: '46px' }}
                                >
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Brand Selection */}
                            <div className="flex items-center">
                                <select
                                    id="brand-select"
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-lg bg-white text-gray-600 text-sm"
                                    style={{ height: '46px' }}
                                >
                                    {brands.map((brand, index) => (
                                        <option key={index} value={brand}>
                                            {brand}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="ml-auto">
                                <PrintToPDFButton handlePrint={handlePrint} />
                            </div>
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2" ref={divRef}>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Image</th>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Category</th>
                                        <th scope="col" className="px-6 py-3">Brand</th>
                                        <th scope="col" className="px-6 py-3">Description</th>
                                        <th scope="col" className="px-6 py-3">Price</th>
                                        <th scope="col" className="px-6 py-3">Stock</th>
                                        <th scope="col" className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredByBrand.map((product, index) => (
                                        <tr key={index} className="bg-white dark:border-gray-700">
                                            <td className="px-6 py-4">
                                                <img className="h-28 w-28 mr-4" src={getFile(product.image)} alt="" />
                                            </td>
                                            <td className="px-6 py-4">{product.name}</td>
                                            <td className="px-6 py-4">{product.category_name}</td>
                                            <td className="px-6 py-4">{product.brand || "N/A"}</td>
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

                    {/* Product Modal */}
                    <ProductModal
                        handleCloseModal={handleCloseModal}
                        isModalVisible={isModalVisible}
                        selectedProduct={selectedProduct}
                    />

                    {/* Virtual Try-On Modal */}
                    <VirtualTryOnModal
                        handleCloseModal={handleCloseVTOModal}
                        isModalVisible={isVTOModalVisible}
                        selectedProduct={selectedProduct}
                    />
                </>
            )}
        </div>
    );
};

export default InventoryManagement;
