import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import CustomerServiceCard from "../../components/CustomerServiceCard";

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

const CustomerDetails: React.FC<User> = ({}) => {
  const [user, setUser] = useState<User>({});
  const [services, setServices] = useState<Service[]>([]);
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

  useEffect(() => {
    if (state?.userId) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/users/${state.userId}/services`)
        .then((response) => {
          setServices(response.data); // Directly setting the array of strings
        })
        .catch((error) => {
          console.error("Error fetching services: ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [state?.userId]);

  function printHello(): void {
    console.log("Hello!");
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
          <p>Navn: {state.name}</p>
          <p>Email: {state.email}</p>
          <p>Adresse: {state.address}</p>
        </div>
      )}
      {/* TODO: CustomerServiceCard */}
      {services.length > 0 ? (
        <div>
          <h3>Services:</h3>
          <ul>
            {services.map((service) => (
              <li key={service._id}>
                <p>Name: {service.name}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No services found for this user.</p>
      )}
      <h1 className="font-bold text-black text-2xl">Kundens servicer</h1>
      <CustomerServiceCard name={""} deleteServiceButton={printHello} />
    </>
  );
};

export default CustomerDetails;
