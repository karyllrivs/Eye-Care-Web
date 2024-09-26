import React from "react";
import Glasses6 from "../assets/Sample-glasses-review/Angle4.png";
import Angle1 from "../assets/Sample-glasses-review/Angle1.png";
import Angle2 from "../assets/Sample-glasses-review/Angle2.png";
import Angle3 from "../assets/Sample-glasses-review/Angle3.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ViewProduct() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="md:w-1/2">
          <img src={Angle3} alt="Product" className="w-full mb-4 rounded-md" />
          <div className="flex justify-between">
            <img src={Angle1} alt="Angle 1" className="w-1/3 rounded-md" />
            <img src={Angle2} alt="Angle 2" className="w-1/3 rounded-md" />
            <img src={Glasses6} alt="Angle 3" className="w-1/3 rounded-md" />
          </div>
        </div>
        <div className="md:w-1/2 pl-4">
          <h2 className="text-xl font-semibold mb-2">Product Name</h2>
          <div className="flex items-center mb-2">
            {/* Stars for reviews */}
            <span className="text-gray-600">4.5 (250 reviews)</span>
          </div>
          <p className="mb-2">Quantity: 1</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4">
            Add to Cart
          </button>
          <div className="text-gray-700">
            <p>
              Description: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Nullam viverra ante non risus tempor, sed ultricies enim
              pharetra. Integer lobortis leo ac sapien ultrices, ut dignissim
              nunc elementum. Curabitur at commodo magna. Donec scelerisque,
              libero non molestie lacinia, elit nulla faucibus magna, nec
              iaculis nulla lorem at ipsum. Sed eu leo vitae purus tempor
              gravida. Vivamus auctor sit amet magna vitae finibus. Nullam
              bibendum malesuada tellus, eu consequat lorem sodales ut. Vivamus
              sed rhoncus lacus. Phasellus convallis tellus a condimentum
              lacinia. Nam eget felis in felis commodo scelerisque. Fusce sed
              enim nec leo faucibus interdum. Phasellus at libero non arcu
              fringilla tempus at et nunc. Curabitur vulputate consequat sem et
              tempus. Integer auctor, lacus at fermentum convallis, sapien justo
              ullamcorper risus, sit amet sodales dui est et nunc.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewProduct;
