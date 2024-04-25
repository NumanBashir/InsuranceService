import React from "react";

type ButtonProps = {
  text: string;
  className?: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, className, onClick }) => {
  return (
    <button
      className={`px-4 py-1 border rounded focus:outline-none ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
