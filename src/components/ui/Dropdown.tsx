import React, { useState } from "react";
import merge from "../../utils/merge";
import getTextFromChildren from "../../utils/getTextFromChildren";
import Button from "./Button";

export interface DropdownProps {
  replace?: boolean;
  label?: string;
  width?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const dropdownStyle = "absolute w-full bg-gray-200 text-black flex flex-col rounded-lg";

const Dropdown = ({ children, label = "Something", width = "", onClick, replace = true }: Dropdown) => {
  const [display, setDisplay] = useState(false);
  const [selected, setSelected] = useState<string>("Choose");

  const handleClick = () => {
    setDisplay((prev) => !prev);
  };

  const elements = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const originalOnClick = child.props.onClick;
      const childrenTextContent = getTextFromChildren(child.props.children);

      return React.cloneElement(child, {
        onClick: (e: React.MouseEvent) => {
          originalOnClick?.(e);
          if (replace) setSelected(childrenTextContent);
          setDisplay(false);
        },
      });
    }
    return child;
  });

  return (
    <div className={`flex flex-col gap-1 p-2 ${width}`} onClick={onClick}>
      {replace ? <span>{label}</span> : ""}
      <Button onClick={handleClick}>{replace ? selected : label}</Button>
      {display && (
        <div className="relative top-2">
          <div className={merge(dropdownStyle)}>{elements}</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
