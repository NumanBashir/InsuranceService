import React from "react";

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const ServiceCard: React.FC<CardProps> = ({
  title,
  description,
  onButtonClick,
}) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden mx-auto">
        <img
          src="leakbot.png"
          alt={title}
          className="h-56 w-full object-cover"
        />
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-700 mb-4">{description}</p>
          <button
            onClick={onButtonClick}
            className="w-full bg-tertiary hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Se mere
          </button>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
