import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

interface User {
  _id?: string;
  name?: string;
  description?: string;
}

const CustomerDetails = () => {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { name: string; userId: string };
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
          <h1>HEJ {state.name}</h1>
          <h1>{user.name}</h1>
        </div>
      )}
    </>
  );
};

export default CustomerDetails;
