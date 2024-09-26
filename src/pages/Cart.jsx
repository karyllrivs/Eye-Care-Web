import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { selectCartItems, selectCartTotal } from "../redux/cart/cart.selector"
import CartItem from "../components/CartItem"
import axiosClient from "../utils/axiosClient"
import { resetCart } from "../redux/cart/cart.action"
import { useEffect, useState } from "react"
import VerifyPaymentModal from "../components/VerifyPaymentModal"
import { selectCurrentUserProfile } from "../redux/profile/profile.selector"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const currentUserProfile = useSelector(selectCurrentUserProfile);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    axiosClient
      .post("/paymongo/checkout", { cartItems })
      .then(({
        data: { orders, checkoutUrl },
      }) => {
        console.log(orders);
        window.open(checkoutUrl, "_blank");
        dispatch(resetCart());
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


  /** MODAL */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handlePlaceOrder = () => {
    if (!currentUserProfile) return navigate("/login");
    axiosClient
      .post("/payment")
      .then(({
        data: { message }
      }) => {
        alert(message)
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
    handleOpenModal();
  }

  /** Payment */
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  useEffect(() => {
    axiosClient
      .get("/own-payment")
      .then(({
        data: { isVerified }
      }) => {
        setIsPaymentVerified(isVerified)
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
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
        {cartItems.length > 0 ?
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Unit Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((cartItem) => <CartItem key={cartItem._id} cartItem={cartItem} />)}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>{"₱" + parseFloat(cartTotal.toFixed(2))}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>₱0.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>₱0.00</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{"₱" + parseFloat(cartTotal.toFixed(2))}</span>
                </div>
                {isPaymentVerified ?
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full" onClick={handleCheckout}>Checkout</button>
                  :
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full" onClick={handlePlaceOrder}>Place Order</button>
                }
              </div>
            </div>
          </div> : <p>The shopping cart is empty.</p>}
      </div>

      {/* MODAL */}
      <VerifyPaymentModal isModalVisible={isModalVisible} handleCloseModal={handleCloseModal} setIsPaymentVerified={setIsPaymentVerified} />
    </>
  )
}

export default Cart