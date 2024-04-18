import axios from "axios";
import NameCard from "../../components/NameCard";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import AdminNameCard from "../../components/AdminNameCard";
import { useCart } from "../../context/CartContext";

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
          <div className="relative mt-1 ml-52 flex justify-start z-10">
            <div className="bg-white shadow-lg rounded-2xl py-8 m-4 w-1/2 max-w-2xl z-10">
              <div className="flex flex-col items-start mb-4 px-8 pr-24">
                <span className="text-xl font-semibold">Kunde Login:</span>
                {users.map((user) => (
                  <NameCard key={user._id} name={user.name} userId={user._id} />
                ))}
              </div>
              <div className="flex flex-col items-start px-8 pr-24">
                <span className="text-xl font-semibold">Admin Login:</span>
                <AdminNameCard name="Allan Admin" />
              </div>
            </div>
          </div>

          <div className="mt-64 ml-64 flex justify-center items-center z-0">
            <img
              src="/TopService.png"
              className="w-[500px] rounded-2xl absolute top-24 right-52"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Login;
