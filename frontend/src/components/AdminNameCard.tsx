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
      className="inline-flex justify-center items-center text-white drop-shadow-md bg-tertiary rounded-md w-1/4 m-1 p-1"
      onClick={handleNavigate}
    >
      <button>{name}</button>
    </div>
  );
};

export default AdminNameCard;
