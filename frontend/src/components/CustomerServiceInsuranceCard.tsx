import React from "react";

interface CardProps {
  name: string;
  serviceId?: string;
  deleteServiceButton?: (serviceId: string) => void;
}

const CustomerServiceInsuranceCard: React.FC<CardProps> = ({
  name,
  serviceId,
  deleteServiceButton,
}) => {
  return (
    <>
      <div className="mx-auto my-4 bg-userColor shadow-sm rounded-lg w-[500px] h-[50px] font-bold flex items-center">
        <div className="flex justify-between mx-4 w-full text-lg">
          <div>{name}</div>
          {deleteServiceButton && serviceId && (
            <button onClick={() => deleteServiceButton(serviceId)}>
              <img src="/trash-bin 1.png" className="w-8" alt="Delete" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerServiceInsuranceCard;
