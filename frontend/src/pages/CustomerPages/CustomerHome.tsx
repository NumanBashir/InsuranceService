// CustomerHome.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import ServiceCard from "../../components/ServiceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";

interface Service {
  _id: string;
  name: string;
  description: string;
}
const CustomerHome = () => {
  const location = useLocation();
  const state = location.state as { name: string };
  const [serviceName, setServiceName] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = (serviceId: string, serviceName: string) => {
    const encodedServiceName = encodeURIComponent(serviceName);
    navigate(`/product/${serviceId}?name=${encodedServiceName}`);
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
    <div className="pt-24">
      <div className="absolute top-36 left-0 right-0 flex justify-center items-center">
        <span className="font-bold text-white text-3xl">
          Velkommen til InsuranceService, {state.name}
        </span>
      </div>
      <div className="absolute top-60 left-0 right-0 flex justify-center items-center">
        <img src="/fotowithman.png" className="w-[700px]" />
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
            {serviceName.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.name}
                description={service.description}
                onButtonClick={() => handlePurchase(service._id, service.name)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerHome;
