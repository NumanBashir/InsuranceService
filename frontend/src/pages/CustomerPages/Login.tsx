import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import { useCart } from "../../context/CartContext";
import UserCard from "../../components/UserCard";

type User = {
  _id: string;
  name: string;
};

const Login = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCart();

  useEffect(() => {
    setLoading(true);
    clearCart();
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
        <>
          <div className="absolute top-40 left-0 right-96 flex justify-center z-10">
            <div className="bg-white shadow-lg rounded-2xl py-8 m-4 w-1/2 max-w-2xl">
              <div className="flex flex-col items-start mb-4 px-8 pr-24">
                <span className="text-xl font-semibold">Kunde Login:</span>
                {users.map((user) => (
                  <UserCard key={user._id} name={user.name} userId={user._id} />
                ))}
              </div>
              <div className="flex flex-col items-start px-8 pr-24">
                <span className="text-xl font-semibold">Admin Login:</span>
                <UserCard name="Allan Admin" />
              </div>
            </div>
          </div>
          <div className="absolute top-36 left-128 right-0 flex justify-center items-center z-0">
            <img src="/TopService.png" className="w-[500px] rounded-2xl" />
          </div>
        </>
      )}
    </>
  );
};

export default Login;
