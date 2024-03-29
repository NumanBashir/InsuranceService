import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import CustomerServiceInsuranceCard from "../../components/CustomerServiceInsuranceCard";

interface User {
  _id?: string;
  name?: string;
  description?: string;
  email?: string;
  address?: string;
}

interface Service {
  _id: string;
  name: string;
}

interface Insurance {
  _id: string;
  name: string;
}

const CustomerDetails: React.FC<User> = ({}) => {
  const [user, setUser] = useState<User>({});
  const [services, setServices] = useState<Service[]>([]);
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    email: string;
    name: string;
    userId: string;
    address: string;
  };

  const { id } = useParams();
  const { id: userId } = useParams();

  useEffect(() => {
    if (state?.userId) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/users/${id}/services`)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching service id: ", error);
          setLoading(false);
        });
    }
  }, [state?.userId, navigate]);

  // useParam to get proper id
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/users/${id}/services`)
      .then((response) => {
        console.log("Services response:", response.data);
        setServices(response.data); // Directly setting the array of services
      })
      .catch((error) => {
        console.error("Error fetching services: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/users/${id}/insurances`)
      .then((response) => {
        console.log("Insurances response:", response.data);
        setInsurances(response.data);
      })
      .catch((error) => {
        console.error("Error fetching insurances: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function deleteService(serviceId: string): void {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (isConfirmed && userId) {
      // Ensure userId is defined
      axios
        .delete(`http://localhost:3000/users/${userId}/services/${serviceId}`)
        .then(() => {
          // Logic after successful deletion
          setServices((currentServices) =>
            currentServices.filter((service) => service._id !== serviceId)
          );
        })
        .catch((error) => {
          console.error("Error deleting service: ", error);
        });
    }
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="absolute top-36 left-0 right-0 flex justify-center items-center">
            <span className="font-bold text-white text-3xl">
              Her kan du se informationer om {state.name}
            </span>
          </div>
          <div className="w-1/3 p-4 my-4 mx-auto text-center font-medium text-xl bg-userColor shadow-sm rounded-lg">
            <p>Navn: {state.name}</p>
            <p>Email: {state.email}</p>
            <p>Adresse: {state.address}</p>
          </div>
        </div>
      )}
      <div className="my-8">
        <h1 className="font-bold text-black text-2xl flex justify-center">
          Kundens servicer
        </h1>
        {services.length > 0 ? (
          services.map((service) => (
            <CustomerServiceInsuranceCard
              key={service._id}
              name={service.name}
              serviceId={service._id}
              deleteServiceButton={deleteService}
            />
          ))
        ) : (
          <p className="flex justify-center w-full text-lg mt-4 italic">
            Kunden har ikke nogen servicer.
          </p>
        )}
      </div>
      <div>
        <h1 className="font-bold text-black text-2xl flex justify-center">
          Kundens forsikringer
        </h1>
        {insurances.length > 0 ? (
          insurances.map((insurance) => (
            <div>
              <CustomerServiceInsuranceCard
                key={insurance._id}
                name={insurance.name}
              />
            </div>
          ))
        ) : (
          <p>Kunden har ikke nogen forsikringer.</p>
        )}
      </div>
    </>
  );
};

export default CustomerDetails;
