import Navbar from "../../components/Navbar";
import Hero from "./Hero";
import Brands from "./Brands";
import Products from "../../components/Products";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";

const Main = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/products/")
      .then(({ data }) => {
        setProducts(data);
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
  return (
    <>
      <Navbar />
      <Hero />
      <Brands />
      {products && <Products products={products.slice(0, 10)} />}
      <Footer />
    </>
  );
};

export default Main;
