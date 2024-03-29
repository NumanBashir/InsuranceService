import React from "react";

type TextFieldProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  value,
  placeholder,
  readOnly,
  onChange,
}) => {
  return (
    <div className={`mb-4 ${readOnly ? "text-gray-500" : ""}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          readOnly ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default TextField;
