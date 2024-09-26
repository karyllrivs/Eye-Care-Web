import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFile } from "../utils/serverFileUtils";
import ProductItem from "./ProductItem";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cart/cart.action";
import { useNavigate } from "react-router-dom";

const Products = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);

  /** Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(products.length / itemsPerPage);


  /** Add to Cart */
  const dispatch = useDispatch();
  const handleAddToCart = (product, quantity = 1) => {
    if (product.stock < quantity) return;
    dispatch(addItemToCart({ productToAdd: product, quantity }));
    setProductQuantity(1);

    toast.success(`${product.name} has been added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  /** Modal */
  // Function to handle opening the modal
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  };
  const handleModalProductQuantity = (e) => {
    const { value } = e.target;
    setProductQuantity(value);
  }
  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navigate = useNavigate();

  const gotoVirtualTryOn = (product_id) => {
    handleCloseModal();
    navigate("/virtual/" + product_id);
  }

  return (
    <>
      <div className="relative mx-auto ml-[80px] mr-[80px] mt-[50px] p-2 pt-8 pb-11">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {products.slice(startIndex, endIndex).map((product) => <ProductItem key={product._id} product={product} handleAddToCart={handleAddToCart} handleOpenModal={handleOpenModal} />)}
        </div>
      </div>


      {/* Pagination controls */}
      {itemsPerPage < products.length && <div className="flex justify-center mt-4 pb-8">
        <button
          aria-label="Previous page"
          className="mx-1 px-3 py-1 rounded-full bg-gray-200"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            aria-label={`Page ${index + 1}`}
            className={`mx-1 px-3 py-1 font-semibold ${currentPage === index + 1 ? "bg-[#67BCEE]" : "bg-gray-200"
              }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          aria-label="Next page"
          className="mx-1 px-3 py-1 rounded-full bg-gray-200"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>}

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 modal-enter modal-enter-active">
          <div className="bg-white rounded-lg p-8 relative max-w-[50%]">
            <button
              aria-label="Close modal"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img
              src={getFile(selectedProduct.image)}
              alt={selectedProduct.name}
              className="object-contain h-48 w-full mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, index) => (
                <AiFillStar key={index} className="text-yellow-500" />
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-4">
              {selectedProduct.description}
            </p>
            <div className="items-center mb-4 flex gap-10 align-middle justify-between">
              <p className="text-3xl font-semibold mb-4">
                {"₱" + selectedProduct.price}
              </p>
              <button onClick={() => gotoVirtualTryOn(selectedProduct._id)} className="bg-blue-500 text-white rounded-md font-semibold px-4 py-2 w-[10rem] mb-4">
                Virtual Try-On
              </button>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="number"
                min="1"
                value={productQuantity}
                name="quantity"
                onChange={handleModalProductQuantity}
                max={selectedProduct.stock}
                className="border border-gray-300 rounded-md px-3 py-3 w-16 mr-4"
              />
              <button
                aria-label="Add to cart"
                className="bg-green-500 text-white rounded-md font-semibold px-4 py-3 w-full"
                onClick={() => handleAddToCart(selectedProduct, productQuantity)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div >
      )}
      <ToastContainer />
    </>
  );
};

export default Products;
