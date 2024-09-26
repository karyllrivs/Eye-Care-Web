import { useState, useEffect } from "react";
import {
  FaTimes,
  FaBars,
  FaUser,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo2.png";
import BackgroundImage from "../assets/background.png";
import axiosClient from "../utils/axiosClient";
import { useSelector } from "react-redux";
import { selectCartCount } from "../redux/cart/cart.selector";

const Navbar = () => {
  const [categories, setCategories] = useState(null);
  const cartCount = useSelector(selectCartCount);

  useEffect(() => {
    axiosClient
      .get("/categories/")
      .then(({ data }) => {
        setCategories(data);
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
  }, [])

  const [navbar, setNavbar] = useState(false);

  // Search Features
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    navigate("/search/" + keyword);
  }
  const handleChangeSearchInput = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <nav
      className="w-full h-auto bg-white lg:px-20 md:px-16 sm:px-14 px-12 py-2 shadow-sm z-20 sticky top-0"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="justify-between mx-auto lg:w-full md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link
              to="/"
              className="text-3xl text-orange-500 font-semibold tracking-[0.1rem]"
            >
              <img src={Logo} alt="Logo" className="h-[8rem] w-auto" />
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none border border-transparent focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <FaTimes className="text-gray-400 cursor-pointer" size={24} />
                ) : (
                  <FaBars className="text-gray-400 cursor-pointer" size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col items-center justify-center md:block ${navbar ? "block" : "hidden"
            }`}
        >
          <ul className="list-none lg:flex md:flex sm:block block gap-x-5 lg:gap-x-3 items-center">
            <li>
              <Link
                to="/"
                className="text-[#253D4E] text-[.95rem] font-bold tracking-wider hover:text-[#00C0FF] ease-out duration-300 py-2"
              >
                Home
              </Link>
            </li>
            {categories && categories.map(({ _id, name, isInNavbar }) => isInNavbar && (
              <li key={_id}>
                <Link
                  to={"/category/" + _id}
                  className="text-[#253D4E] text-[.95rem] font-bold tracking-wider hover:text-[#00C0FF] ease-out duration-300 py-2"
                >
                  {name}
                </Link>
              </li>
            ))}
            <li >
              <Link
                to="/consultation"
                className="text-[#253D4E] text-[.95rem] font-bold tracking-wider hover:text-[#00C0FF] ease-out duration-300 py-2"
              >
                Consultation
              </Link>
            </li>
            <li className="relative flex items-center">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={keyword}
                  onChange={handleChangeSearchInput}
                  className="border border-solid border-[#BCE3C9] rounded-md w-[14rem] py-4 px-6 text-gray-600 placeholder-gray-600 focus:outline-none focus:border-gray-400"
                />
              </form>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <FaSearch className="text-gray-600" />
              </div>
            </li>
            <li className="flex items-center relative">
              <Link
                to="/cart"
                className="flex items-center text-[#253D4E] text-[.95rem] font-bold tracking-wider hover:text-[#00C0FF] ease-out duration-300 py-2"
              >
                <FaShoppingCart className="mr-2 h-6 w-6" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/profile"
                className="flex items-center text-[#253D4E] text-[.95rem] font-bold tracking-wider hover:text-[#00C0FF] ease-out duration-300 py-2"
              >
                <FaUser className="mr-2 h-6 w-6" />
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
