import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";

const SearchProduct = () => {
    const { keyword } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosClient
            .get("/products-search/" + keyword)
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
    }, [keyword])

    return (
        <>
            <Navbar />
            {
                products.length < 1 ?
                    <div className="p-10" style={{ height: "80vh" }}>
                        <h1 className="bold text-2xl">No result found for keyword: <span className="text-blue-600 text-2xl">{keyword}</span></h1>
                    </div>
                    : <Products products={products} />
            }

            <Footer />
            <ToastContainer />
        </>
    );
}

export default SearchProduct;
