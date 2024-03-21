import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

interface User {
  _id?: string;
  name?: string;
  description?: string;
  email?: string;
  address?: string;
}

const CustomerDetails: React.FC<User> = ({}) => {
  const [user, setUser] = useState<User>({});
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
    </>
  );
};

export default CustomerDetails;
