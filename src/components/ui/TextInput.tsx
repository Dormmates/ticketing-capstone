import { type ChangeEvent } from "react";
import InputLabel from "./InputLabel";

interface TextInputProps {
  label?: string;
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  isError?: boolean;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
}

const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  isError = false,
  errorMessage = "Invalid input",
  className = "",
  disabled = false,
}: TextInputProps) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <InputLabel label={label} />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full border rounded px-4 py-2 shadow-sm outline-none border-lightGrey 
            focus:border-primary
          ${isError ? "border-red" : "border-lightGrey"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        `}
      />
      {isError && <p className="text-sm text-red mt-1">{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
