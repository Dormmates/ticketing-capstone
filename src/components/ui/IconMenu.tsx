import React, { useState } from "react";
import merge from "../../utils/merge";

export interface IconOptionProps {
  imagePath: string;
  label?: string;
  isClicked?: boolean;
  onClick?: () => void;
}

interface IconMenuProps {
  options: IconOptionProps[];
  className?: string;
  onSelect?: (selectedLabel: string) => void;
}

const iconOptionStyle =
  "w-full max-w-[150px] h-[120px] flex flex-col items-center justify-center p-5 rounded-lg cursor-pointer hover:bg-lightPrimary transition";
const selectedIconStyle = "transition bg-lightPrimary shadow-inner";

export const IconOption = ({ imagePath, label, isClicked = false, onClick }: IconOptionProps) => {
  return (
    <div onClick={onClick} className={merge(iconOptionStyle, isClicked ? selectedIconStyle : "")}>
      <img className="w-full max-w-[60px] max-h-[60px]" src={imagePath} alt={label || "icon"} />
      <span className="text-[12px] h-[16px] mt-2 text-center">{label || ""}</span>
    </div>
  );
};

const iconMenuStyle = "flex flex-row gap-10 justify-evenly";

export const IconMenu = ({ options, className, onSelect }: IconMenuProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(index);
    if (onSelect) onSelect(options[index].label ?? "");
  };

  return (
    <div className={merge(iconMenuStyle, className)}>
      {options.map((item, index) => (
        <IconOption
          key={index}
          label={item.label}
          imagePath={item.imagePath}
          onClick={() => handleClick(index)}
          isClicked={index === openIndex}
        />
      ))}
    </div>
  );
};

export default IconMenu;
