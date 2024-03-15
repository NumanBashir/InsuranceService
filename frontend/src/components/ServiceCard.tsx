import React from "react";

interface CardProps {
  title: string;
  description: string;
  price: number;
  onButtonClick: () => void;
}

const ServiceCard: React.FC<CardProps> = ({
  title,
  description,
  price,
  onButtonClick,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mx-auto flex flex-col">
      <img src="leakbot.png" alt={title} className="h-56 w-full object-cover" />
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-700 font-semibold">{`${price}KR`}</p>
          </div>
          <p className="text-gray-700 my-4">{description}</p>
        </div>
        <button
          onClick={onButtonClick}
          className="mt-2 bg-tertiary hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Se mere
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
