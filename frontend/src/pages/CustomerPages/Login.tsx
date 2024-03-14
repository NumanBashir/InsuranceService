import axios from "axios";
import NameCard from "../../components/NameCard";
import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import AdminNameCard from "../../components/AdminNameCard";

const Login = () => {
  const [userNames, setUserNames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const names = response.data.data.map(
          (user: { name: any }) => user.name
        );
        setUserNames(names);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-2xl py-8 m-4 w-1/2 max-w-2xl">
            <div className="flex flex-col items-center mb-4">
              <span className="text-xl font-semibold">Customer Login:</span>
              {userNames.map((name, index) => (
                <NameCard key={index} name={name} />
              ))}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-semibold">Admin Login:</span>
              <AdminNameCard name="Allan Admin" />
              {/* This will be changed to AdminCard Login */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
