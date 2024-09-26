import React from "react";
import Logo from "../assets/Logo2.png";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import appStore from "../assets/appstore.png";
import googleStore from "../assets/googlestore.png";
import gcash from "../assets/gcash.png";
import BackgroundImage from "../assets/background.png";

const Footer = () => {
  return (
    <>
      <footer
        className="bg-white pt-11"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-1 py-8 md:py-7 max-w-[90%]">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 md:w-1/3">
              <div className="flex items-center mb-8">
                <img src={Logo} className="me-3" alt="FlowBite Logo" />
              </div>
              <div className="flex items-center mb-3">
                <FaMapMarkerAlt className="text-[#253D4E] mr-2" />
                <span className="text-[#253D4E]">
                  159 M. L. Quezon Ave, Street, Antipolo, 1870 Rizal
                </span>
              </div>
              <div className="flex items-center mb-3">
                <FaPhone className="text-[#253D4E] mr-2" />
                <span className="text-[#253D4E]">(02) 8641 0560</span>
              </div>
              <div className="flex items-center mb-3">
                <FaEnvelope className="text-[#253D4E] mr-2" />
                <span className="text-[#253D4E]">Solapco@gmail.com</span>
              </div>
              <div className="flex items-center">
                <FaClock className="text-[#253D4E] mr-2" />
                <span className="text-[#253D4E]">
                  10:00 AM - 8:00 PM, Mon - Sat
                </span>
              </div>
            </div>
            <div className="w-1/4">
              <h2 className="mb-6 text-lg font-bold text-[#253D4E] uppercase">
                Store
              </h2>
              <ul className="text-[#253D4E]">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Delivery Information
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-1/4">
              <h2 className="mb-6 text-lg font-bold text-[#253D4E] uppercase">
                Account
              </h2>
              <ul className="text-[#253D4E]">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Create Account
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-1/4">
              <h2 className="mb-6 text-lg font-bold text-[#253D4E] uppercase">
                Install
              </h2>
              <ul className="text-[#253D4E]">
                <li className="mb-6 text-[#253D4E] font-semibold">
                  <a href="#" className="hover:underline">
                    From Google Play
                  </a>
                </li>
                <li className="mb-4 flex items-center">
                  <a href="#" className="hover:underline">
                    <img src={googleStore} className="h-12" alt="Google Play" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-6 border-gray-200 dark:border-gray-700" />
          <div className="text-sm  text-[#253D4E] text-center ">
            © 2023{" "}
            <a href="" className="hover:underline">
              EYECARE™
            </a>
            . All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
