import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { FaShoppingBasket } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import useUserState from "../../hooks/userUseState";

interface Service {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
}

const ProductDetails = () => {
  const [service, setService] = useState<Service>({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();
  const userState = useUserState();

  const handleAddToCart = () => {
    console.log("Adding to cart", service);
    if (service._id && service.name && service.price !== undefined) {
      addToCart({
        _id: service._id,
        name: service.name,
        price: service.price,
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/services/${id}`)
      .then((response) => {
        setService(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service id: ", error);
        setLoading(false);
      });
  }, [id]);

  const goToShoppingCart = () => {
    navigate("/shopping-cart", { state: userState });
  };

  return (
    <>
      <div className="absolute top-2 right-2 p-8 flex items-center justify-center">
        <button type="button" onClick={goToShoppingCart} className="relative">
          <FaShoppingBasket className="text-3xl text-gray-700" />
          {cartItems.length < 1 ? (
            ""
          ) : (
            <span className="absolute -top-4 -right-4 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="absolute top-32 right-0 left-0 flex justify-center items-center p-5 my-10">
          <img src="/fysio.jpeg" className="w-2/5 rounded-lg" />
          <div className="ml-5 w-1/4">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-3">{service.name}</h2>
              <p className="mb-3">{service.description}</p>
              <p className="font-bold mb-5">{service.price} DKK</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleAddToCart}
                className="bg-white hover:bg-gray-100 text-tertiary border-2 border-tertiary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                LÆG I INDKØBSKURVEN
              </button>
              <button
                className="bg-tertiary hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={goToShoppingCart}
              >
                KØB NU
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center w-1/3 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </>
  );
};

export default ProductDetails;
