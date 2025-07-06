import { useEffect, useRef, useState } from "react";
import InputLabel from "./InputLabel";
import icon from "../../assets/icons/dropdown.png";
import merge from "../../utils/merge";

export interface DropdownOption {
  label: string;
  value?: string | number;
  onClick?: () => void;
  disabled?: boolean;
}

interface DropdownProps {
  className?: string;
  label?: string;
  options: DropdownOption[];
  value: string | number | undefined;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const Dropdown = ({ label, options, value, onChange, className, disabled = false, isError, errorMessage }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: DropdownOption) => {
    setIsOpen(false);
    if (option.onClick) option.onClick();
    if (option.value !== undefined && onChange) {
      onChange(option.value);
    }
  };

  const baseStyle = "relative inline-block text-left";
  const selectedLabel = options.find((o) => o.value === value)?.label || "Select Value";

  return (
    <div className={merge(baseStyle, className)} ref={dropdownRef}>
      {label && <InputLabel label={label} />}
      <div
        className={merge(
          "border rounded px-4 py-2 shadow-sm flex justify-between items-center transition-colors duration-150 gap-5",
          isOpen ? "border-primary" : isError ? "border-red" : "border-lightGrey",
          disabled ? "bg-slate-100 cursor-not-allowed opacity-60" : "bg-white cursor-pointer"
        )}
        onClick={() => {
          if (!disabled) setIsOpen((prev) => !prev);
        }}
      >
        {selectedLabel}
        <img src={icon} alt="" className={`transition-all duration-200 ease-linear ${isOpen ? "-rotate-90" : "rotate-0"}`} />
      </div>
      {isError && errorMessage && <p className="text-sm text-red mt-1">{errorMessage}</p>}

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg overflow-y-auto max-h-[150px]">
          {options.map((option, idx) => {
            const isSelected = option.value === value;

            return (
              <div
                key={idx}
                className={`px-4 py-2 
                  ${isSelected ? "bg-darkGrey text-gray-400 opacity-20 cursor-not-allowed" : "hover:bg-blue-100 cursor-pointer"} 
                  ${option.disabled ? "opacity-50 pointer-events-none" : ""}
                `}
                onClick={() => {
                  if (!isSelected && !option.disabled) {
                    handleSelect(option);
                  }
                }}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
