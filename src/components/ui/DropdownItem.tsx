import React from "react";

interface DropdownItemProps {
  children: React.ReactNode;
  value?: string | number;
  onClick?: () => void;
}

const itemStyle = "p-3 border cursor pointer first:rounded-t-lg last:rounded-b-lg cursor-pointer border-gray-400 hover:bg-blue-200";

const DropdownItem = ({ children, value, onClick }: DropdownItemProps) => {
  return (
    <div className={itemStyle} onClick={onClick} data-value={value}>
      {children}
    </div>
  );
};

export default DropdownItem;
