import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
}

const AdminNameCard: React.FC<Props> = ({ name }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin", { state: { name } });
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

export default AdminNameCard;
