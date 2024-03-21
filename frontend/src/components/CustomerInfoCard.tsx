import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  address: string;
  email: string;
  userId: string;
}

const CustomerInfoCard: React.FC<Props> = ({
  name,
  address,
  email,
  userId,
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/customer/${userId}`, { state: { name } });
  };
  return (
    <div className="flex justify-center items-center my-6">
      <div className="bg-userColor rounded-xl p-4 flex justify-between items-center w-full md:w-1/2">
        <div>
          <div className="text-lg font-bold">{name}</div>
          <div className="text-gray-600">{address}</div>
          <div className="text-gray-600">{email}</div>
        </div>
        <button
          className="text-tertiary font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300"
          onClick={handleNavigate}
        >
          Se mere &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
