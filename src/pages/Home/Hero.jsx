import React from "react";
import Image1 from "../../assets/Hero2.png"; // Import the hero image

const Home = () => {
  return (
    <>
      <div className="relative mx-auto">
        {/* Hero image */}
        <div className="w-full h-[500px] relative">
          <img
            src={Image1}
            className="block w-full h-full object-cover"
            alt="Hero Image"
          />
          {/* Add h1 text over the hero image */}
          <div className="absolute top-0 left-0 p-4 md:p-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
              Solapco Optical Clinic
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
