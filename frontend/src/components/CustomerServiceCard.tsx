import React from "react";

interface CardProps {
  name: string;
  deleteServiceButton: () => void;
}

const CustomerServiceCard: React.FC<CardProps> = ({}) => {
  return (
    <>
      <div className="mx-auto mt-8 bg-userColor shadow-sm rounded-lg w-[500px] h-[50px] font-bold flex items-center">
        <div className="flex justify-between mx-4 w-full text-lg">
          <div>Leakbot</div>
          <button>
            <img src="/trash-bin 1.png" className="w-8" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomerServiceCard;
