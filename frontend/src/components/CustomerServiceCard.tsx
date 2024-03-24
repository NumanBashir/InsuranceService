import React from "react";

interface CardProps {
  name: string;
  deleteServiceButton: () => void;
}

const CustomerServiceCard: React.FC<CardProps> = ({
  name,
  deleteServiceButton,
}) => {
  return (
    <>
      <div className="mx-auto my-4 bg-userColor shadow-sm rounded-lg w-[500px] h-[50px] font-bold flex items-center">
        <div className="flex justify-between mx-4 w-full text-lg">
          <div>{name}</div>
          <button onClick={deleteServiceButton}>
            <img src="/trash-bin 1.png" className="w-8" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomerServiceCard;
