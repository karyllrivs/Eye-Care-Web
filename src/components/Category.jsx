import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../utils/axiosClient";
import { useParams } from "react-router-dom";
import Products from "./Products";

const Category = () => {
  const { category_id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/categories/" + category_id)
      .then(({ data: { products } }) => {
        setProducts(products);
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
  }, [category_id])

  return (
    <>
      <Navbar />
      <Products products={products} />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Category;
