import { useDispatch } from "react-redux";
import { getFile } from "../utils/serverFileUtils";
import {
    addItemToCart,
    removeItemFromCart,
} from "../redux/cart/cart.action";

const CartItem = ({ cartItem }) => {

    const { name, image, description, price, quantity, stock } = cartItem;

    const dispatch = useDispatch();
    const addItemHandler = () => {
        if (stock > quantity)
            dispatch(addItemToCart({ productToAdd: cartItem, quantity: 1 }))
    };
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));

    return (
        <tr>
            <td className="py-4">
                <div className="flex items-center">
                    <img className="h-16 w-16 mr-4" src={getFile(image)} alt={description} />
                    <span className="font-semibold">{name}</span>
                </div>
            </td>
            <td className="py-4">{"₱" + price}</td>
            <td className="py-4">
                <div className="flex items-center">
                    <button className="border rounded-md py-2 px-4 mr-2" onClick={removeItemHandler}>-</button>
                    <span className="text-center w-8">{quantity}</span>
                    <button className="border rounded-md py-2 px-4 ml-2" onClick={addItemHandler}>+</button>
                </div>
            </td>
            <td className="py-4">{"₱" + parseFloat((price * quantity).toFixed(2))}</td>
        </tr>
    )
}

export default CartItem