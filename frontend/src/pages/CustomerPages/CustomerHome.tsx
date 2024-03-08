// CustomerHome.tsx
import { useLocation } from "react-router-dom";
import ServiceCard from "../../components/ServiceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";

interface Service {
  name: string;
  description: string;
}
const CustomerHome = () => {
  const location = useLocation();
  const state = location.state as { name: string };
  const [serviceName, setServiceName] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePurchase = () => {
    console.log("Purchase clicked");
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/services")
      .then((response) => {
        setServiceName(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="absolute top-0 left-0 right-0 h-72 flex justify-center items-center">
        <span className="font-bold text-white">
          Velkommen til Insurance service, {state.name}
        </span>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-start h-screen">
          <h1 className="text-4xl font-bold text-black mt-4">
            Se hvilke servicer du er berettiget til og kan købe!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 my-4">
            {serviceName.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.name}
                description={service.description}
                buttonText="KØB NU"
                onButtonClick={handlePurchase}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerHome;
