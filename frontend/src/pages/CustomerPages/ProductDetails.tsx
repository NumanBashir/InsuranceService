import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useCart } from "../../context/CartContext";
import useUserState from "../../hooks/userUseState";
import Cart from "../../components/Cart";
import Popup from "../../components/PopUp";

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
  const { addToCart, isDuplicateItem, setDuplicateItem } = useCart();
  const navigate = useNavigate();
  const userState = useUserState();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isDuplicateItem) {
      setShowPopup(true);
      setDuplicateItem(false);
    }
  }, [isDuplicateItem, setDuplicateItem]);

  const handleAddToCart = () => {
    if (service._id && service.name && service.price !== undefined) {
      addToCart({
        _id: service._id,
        name: service.name,
        price: service.price,
      });
    }
  };

  // Ensure you handle the Popup close action
  const closePopup = () => {
    setShowPopup(false);
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
      <Cart />
      {showPopup && (
        <Popup
          title="Notice"
          message="This item is already in your cart"
          showButton={false}
          behavior={closePopup}
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        <div className="absolute top-24 right-0 left-0 flex justify-center items-center p-5 my-10">
          <img src="/fysio.jpeg" className="w-2/5 rounded-lg" />
          <div className="ml-5 w-1/4">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-3">{service.name}</h2>
              <p className="mb-3">{service.description}</p>
              <p className="font-bold mb-10">{service.price} DKK</p>
            </div>

            <div className="flex flex-col gap-4">
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
    </>
  );
};

export default ProductDetails;
