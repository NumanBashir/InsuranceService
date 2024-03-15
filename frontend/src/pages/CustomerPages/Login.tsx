// Login.tsx
import axios from "axios";
import NameCard from "../../components/NameCard";
import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";

type User = {
  _id: string;
  name: string;
};

const Login = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const firstThreeUsers = response.data.data.slice(0, 3);
        setUsers(firstThreeUsers);
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
              {users.map((user) => (
                <NameCard key={user._id} name={user.name} userId={user._id} />
              ))}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-semibold">Admin Login:</span>
              <NameCard name="Allan Admin" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
