import React from "react";

export interface LongCardItem {
  label: string;
  value: string | number;
}

const LongCardItem = ({ label = "Label", value = "100" }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
};

export default LongCardItem;
