import React from "react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
}

const NameCard: React.FC<Props> = ({ name }) => {
  return (
    <>
      <Link
        to="/home"
        className="inline-flex justify-center items-center text-white drop-shadow-md bg-tertiary rounded-md w-1/4 m-1 p-1"
      >
        <button>{name}</button>
      </Link>
    </>
  );
};

export default NameCard;

// TODO: props for passing name of each User
