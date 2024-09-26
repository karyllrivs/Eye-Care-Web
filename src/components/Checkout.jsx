import React from "react";
import Navbar from "./Navbar";

const Checkout = ({ cart }) => {
  // Check if cart is undefined or empty
  if (!cart || cart.length === 0) {
    return <div className="container mx-auto px-4 py-8">No items in cart</div>;
  }
  console.log("this is the data", cart); // check if cart data is available
  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6">Checkout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-contain h-48 w-full mb-4"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p>{product.type}</p>
              <p className="font-semibold">{product.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Total Price: ${totalPrice}</h3>
        </div>
      </div>
    </>
  );
};

export default Checkout;
