import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
}

const NameCard: React.FC<Props> = ({ name }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home", { state: { name } });
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

export default NameCard;
