import React from "react";

const CustomerInfoCard = () => {
  return (
    <div className="flex justify-center items-center my-6">
      <div className="bg-userColor rounded-xl p-4 flex justify-between items-center w-1/2">
        <div>
          <div className="text-lg font-bold">Reece James</div>
          <div className="text-gray-600">Adresse 12, 2750 Ballerup</div>
          <div className="text-gray-600">reece@chelsea.com</div>
        </div>
        <button className="text-tertiary font-bold px-4">
          Se mere &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
