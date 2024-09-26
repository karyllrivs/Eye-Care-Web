import { AiOutlineShoppingCart } from "react-icons/ai";
import { getFile } from "../utils/serverFileUtils";

const ProductItem = ({ product, handleAddToCart,
    handleOpenModal }) => {

    return (
        <div
            className="bg-white rounded-lg border border-[#28292E] overflow-hidden relative transition duration-300 transform hover:scale-105 cursor-pointer"
            style={{ height: "450px" }}
            onClick={() => handleOpenModal(product)}
        >
            <img
                src={getFile(product.image)}
                alt={product.name}
                className="object-contain h-48 w-full mx-auto mt-6"
            />
            <div className="p-4 mt-auto w-full bg-[#28292E] bg-opacity-90 absolute bottom-0 left-0">
                <h3 className="text-lg font-semibold mb-2 text-white">
                    {product.name}
                </h3>
                <p className="text-white">{product.category_name}</p>
                <div className="flex justify-between items-end mt-4">
                    <p className="text-white font-semibold">{"₱" + product.price}</p>
                    <button
                        aria-label="Add to cart"
                        className="bg-[#4AC76D] text-white hover:bg-gray-300 hover:text-black rounded-md font-semibold px-4 py-2 flex items-center justify-center transition duration-300"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                        }}
                    >
                        Add
                        <AiOutlineShoppingCart className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductItem