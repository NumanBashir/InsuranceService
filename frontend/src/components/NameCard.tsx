import React from "react";
import { Link } from "react-router-dom";

const NameCard = () => {
  return (
    <>
      <Link
        to="/home"
        className="inline-flex justify-center items-center text-white drop-shadow-md bg-tertiary rounded-md w-1/5 m-1"
      >
        <button>Navn Navnsen</button>
      </Link>
    </>
  );
};

export default NameCard;

// TODO: props for passing name of each User
