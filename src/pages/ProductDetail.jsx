import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { getFile } from "../utils/serverFileUtils";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/products/" + id)
      .then(({ data }) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          setError(message);
        }
      );
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={getFile(product.image)} alt={product.name} />
      <p>{product.description}</p>
      <p>₱{product.price}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductDetail;
