import { useNavigate } from "react-router-dom";
import ServiceCard from "../../components/ServiceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import useUserState from "../../hooks/userUseState";
import Cart from "../../components/Cart";

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const CustomerHome = () => {
  const userState = useUserState();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = (serviceId: string, serviceName: string) => {
    const encodedServiceName = encodeURIComponent(serviceName);
    navigate(`/product/${serviceId}?name=${encodedServiceName}`, {
      state: userState,
    });
  };

  useEffect(() => {
    if (userState?.userId) {
      setLoading(true);
      axios
        .get(
          `http://localhost:3000/services/getUserSpecificService/${userState.userId}`
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
  }, [userState?.userId, navigate]);

  return (
    <>
      <Cart />
      <div className="pt-24">
        <div className="absolute top-36 left-0 right-0 flex justify-center items-center">
          <span className="font-bold text-white text-3xl">
            Velkommen til InsuranceService, {userState?.name}
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
                <div className="w-full flex justify-center items-center">
                  <span className="text-lg">
                    Der er desværre ingen servicer 😢
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerHome;
