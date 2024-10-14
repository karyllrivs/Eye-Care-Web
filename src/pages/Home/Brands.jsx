import { useState, useEffect } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import "./Brands.css"; // Import CSS file for styling 
import { brands } from "./brands";

const Brands = () => {
  const [currentIndexBrands, setCurrentIndexBrands] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next"); // State for slide direction
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // State for screen size

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

  useEffect(() => {
    // Update isMobile when the window is resized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="bg-cover bg-center pb-9">
      <div className="relative mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl md:text-4xl text-neutralDGrey font-semibold pt-8 mb-8 flex items-center justify-between">
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
        <div className="brands-container">
          {/* Display multiple logos on larger screens, or one on mobile */}
          {isMobile ? (
            <div className="brand flex flex-col items-center">
              <div className="bg-brand rounded-lg h-48 flex flex-col justify-center items-center hover:transform hover:scale-105 transition duration-300 ease-in-out">
                <img
                  src={brands[currentIndexBrands].logo}
                  alt={brands[currentIndexBrands].name}
                  className="max-w-full h-24 mb-2"
                  style={{ objectFit: 'contain' }} // Ensures the image scales correctly
                />
                <p className="text-center mt-auto mb-2 font-bold">
                  {brands[currentIndexBrands].name}
                </p>
              </div>
            </div>
          ) : (
            brands.map((brand, index) => (
              <div key={index} className="brand flex flex-col items-center">
                <div className="bg-brand rounded-lg h-48 flex flex-col justify-center items-center hover:transform hover:scale-105 transition duration-300 ease-in-out">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full h-24 mb-2"
                    style={{ objectFit: 'contain' }} // Ensures the image scales correctly
                  />
                  <p className="text-center mt-auto mb-2 font-bold">
                    {brand.name}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Brands;
