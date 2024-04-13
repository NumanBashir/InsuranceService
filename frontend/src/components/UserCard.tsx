import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  userId?: string;
}

const UserCard: React.FC<Props> = ({ name, userId }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (userId) {
      navigate("/home", { state: { name, userId } });
    } else {
      navigate("/admin", { state: { name } });
    }
  };

  return (
    <div
      className="flex justify-start items-center text-white bg-tertiary rounded-lg shadow-lg w-full my-2 py-2 cursor-pointer"
      onClick={handleNavigate}
    >
      <button className="text-lg font-medium w-full text-center px-4">
        {name}
      </button>
    </div>
  );
};

export default UserCard;
