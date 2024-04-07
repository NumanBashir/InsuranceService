import React from "react";

interface PopupProps {
  onRedirectToHome?: () => void;
  title?: string;
  message?: string;
}

const Popup: React.FC<PopupProps> = ({ onRedirectToHome, title, message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg text-center">
        <h2 className="font-bold mb-4">{title}</h2>
        <h3 className="mb-4">{message}</h3>
        <button
          className="px-6 py-2 bg-tertiary text-white rounded-lg shadow hover:bg-blue-400"
          onClick={onRedirectToHome}
        >
          Shop mere
        </button>
      </div>
    </div>
  );
};

export default Popup;
