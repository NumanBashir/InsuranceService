import { useLocation, useNavigate } from "react-router-dom";
import ServiceCard from "../../components/ServiceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { FaShoppingBasket } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const CustomerHome = () => {
  const location = useLocation();
  const state = location.state as { name: string; userId: string }; // Now we expect a userId to be passed as well
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handlePurchase = (serviceId: string, serviceName: string) => {
    const encodedServiceName = encodeURIComponent(serviceName);
    navigate(`/product/${serviceId}?name=${encodedServiceName}`);
  };

  useEffect(() => {
    if (state?.userId) {
      setLoading(true);
      axios
        .get(
          `http://localhost:3000/services/getUserSpecificService/${state.userId}`
        )
        .then((response) => {
          setServices(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching services for user:", error);
          setLoading(false);
        });
    }
  }, [state?.userId, navigate]); // Add navigate to the dependency array

  const goToShoppingCart = () => {
    navigate("/shopping-cart");
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
      <div className="pt-24">
        <div className="absolute top-36 left-0 right-0 flex justify-center items-center">
          <span className="font-bold text-white text-3xl">
            Velkommen til InsuranceService, {state.name}
          </span>
        </div>
        <div className="absolute top-60 left-0 right-0 flex justify-center items-center">
          <img src="billede.png" className="w-[700px]" />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col justify-center items-center my-16">
            <h1 className="text-4xl font-bold text-black text-center">
              Se hvilke servicer du er berettiget til og kan købe!
            </h1>
            <hr className="border border-gray-300 w-full max-w-4xl my-16" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 w-full max-w-4xl">
              {services.length > 0 ? (
                services.map((service) => (
                  <ServiceCard
                    key={service._id}
                    title={service.name}
                    price={service.price}
                    description={service.description}
                    onButtonClick={() =>
                      handlePurchase(service._id, service.name)
                    }
                  />
                ))
              ) : (
                <p>No available services to display.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerHome;
