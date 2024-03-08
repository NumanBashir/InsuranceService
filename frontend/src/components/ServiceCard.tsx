import React from "react";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  onButtonClick: () => void;
}

const ServiceCard: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onButtonClick,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden max-w-sm mx-auto">
      <img src={imageUrl} alt={title} className="h-56 w-full object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <button
          onClick={onButtonClick}
          className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Se mere
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
