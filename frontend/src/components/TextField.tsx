// TextField.tsx
import React from "react";

type TextFieldProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Include the onChange handler
};

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  value,
  placeholder,
  readOnly,
  onChange, // Ensure onChange is received as a prop
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange} // Bind the onChange handler to the input's onChange event
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default TextField;
