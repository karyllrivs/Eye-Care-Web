import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import image1 from "../../../assets/glasses1.png";

const products = [
  {
    id: 1,
    name: "Classic Sunglasses",
    stock: 20,
    type: "sunglasses",
    brand: "Ray-Ban",
    price: "$150",
    salePrice: "$130",
    description: "Stylish classic sunglasses.",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: 2,
    name: "Modern Eyeglasses",
    stock: 15,
    type: "eyeglasses",
    brand: "Oakley",
    price: "$200",
    salePrice: "$180",
    description: "Modern design eyeglasses.",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: 3,
    name: "Sport Sunglasses",
    stock: 10,
    type: "sunglasses",
    brand: "Nike",
    price: "$120",
    salePrice: "$100",
    description: "Perfect for sports activities.",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: 4,
    name: "Fashion Eyeglasses",
    stock: 8,
    type: "eyeglasses",
    brand: "Gucci",
    price: "$250",
    salePrice: "$230",
    description: "Trendy fashion eyeglasses.",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    id: 5,
    name: "Casual Sunglasses",
    stock: 25,
    type: "sunglasses",
    brand: "Prada",
    price: "$180",
    salePrice: "$160",
    description: "Casual wear sunglasses.",
    thumbnails: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
];

const AdminInventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    salePrice: "",
    thumbnails: [], // Updated to handle multiple images
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setProductData({
      name: product.name,
      description: product.description,
      category: product.type,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      salePrice: product.salePrice,
      thumbnails: product.thumbnails || [], // Handle multiple images
    });
    setImagePreviews(product.thumbnails || []);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
    setImagePreviews([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleThumbnailsChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData({
      ...productData,
      thumbnails: files,
    });

    // Display image previews
    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
      });
    });

    Promise.all(previews).then((images) => {
      setImagePreviews(images);
    });
  };

  const updateProduct = () => {
    // Update the product in the state or send it to an API
    console.log("Updated Product:", productData);
    closeModal();
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="container mx-auto mt-8 pl-[15rem] pr-4">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Inventory
          </h1>
          <div className=" rounded-lg shadow">
            <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {/* Item */}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <img
                        src={image1}
                        alt={product.name}
                        className="w-13 h-14 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-semibold">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                      <button
                        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full"
                        onClick={() => openModal(product)}
                      >
                        Update Product
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-1/2 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
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
                  value={productData.description}
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
                    type="text"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="text"
                    name="stock"
                    value={productData.stock}
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
                  <input
                    type="text"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={productData.brand}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Sale Price
                  </label>
                  <input
                    type="text"
                    name="salePrice"
                    value={productData.salePrice}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Thumbnails
                  </label>
                  <input
                    type="file"
                    onChange={handleThumbnailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                    multiple
                  />
                  {imagePreviews.length > 0 && (
                    <div className="mt-2 flex flex-wrap">
                      {imagePreviews.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt={`Thumbnail Preview ${index + 1}`}
                          className="mt-2 rounded-md border border-gray-300"
                          style={{ maxWidth: "200px", marginRight: "10px" }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full ml-2"
                onClick={updateProduct}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminInventory;
