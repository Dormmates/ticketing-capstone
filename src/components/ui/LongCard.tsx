import React from "react";

export interface LongCardProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export interface LongCardItemProps {
  label: string;
  value: string | number;
}

export const LongCard = ({ label = "Ticket Breakdown", children }: LongCardProps) => {
  return (
    <div className="flex flex-col gap-1 p-4 border border-l-4 border-l-black rounded-r-lg">
      <span>{label}</span>
      <div className="flex flex-row justify-between items-center">{children}</div>
    </div>
  );
};

export const LongCardItem = ({ label = "Label", value = "100" }: LongCardItemProps) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
};
