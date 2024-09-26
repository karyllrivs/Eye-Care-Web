import { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import "./Brands.css"; // Import CSS file for styling 
import { brands } from "./brands";

const Brands = () => {
  const [currentIndexBrands, setCurrentIndexBrands] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next"); // State for slide direction 

  const numVisibleLogos = 8;

  const handleNextBrands = () => {
    setCurrentIndexBrands((prevIndex) => (prevIndex + 1) % brands.length);
    setSlideDirection("next"); // Set slide direction to "next"
  };

  const handlePreviousBrands = () => {
    setCurrentIndexBrands(
      (prevIndex) => (prevIndex - 1 + brands.length) % brands.length
    );
    setSlideDirection("prev"); // Set slide direction to "prev"
  };

  return (
    <section className="bg-cover bg-center pb-9">
      <div className="relative mx-auto ml-[80px] mr-[80px] p-2">
        <h2 className="text-4xl text-neutralDGrey font-semibold pt-8 mb-8 flex items-center justify-between ">
          Brands
          <div>
            <button
              className="text-gray-500 mr-3"
              onClick={handlePreviousBrands}
            >
              <IoIosArrowDropleft className="h-6 w-6" />
            </button>
            <button className="text-gray-500" onClick={handleNextBrands}>
              <IoIosArrowDropright className="h-6 w-6" />
            </button>
          </div>
        </h2>
        <div className={`flex justify-between slide-${slideDirection}`}>
          {" "}
          {/* Dynamic class */}
          {Array.from({ length: numVisibleLogos }).map((_, index) => {
            const brandIndex = (currentIndexBrands + index) % brands.length;
            const brand = brands[brandIndex];
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-[#F2FCE4]  rounded-lg p-4 mb-2 w-40 h-48 flex flex-col justify-center items-center hover:transform hover:scale-105 transition duration-300 ease-in-out">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-[100px] h-auto mb-2"
                    style={{ margin: "auto" }}
                  />
                  <p className="text-center mt-auto mb-2 font-bold">
                    {brand.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Brands;
