import React from "react";

export interface LongCardProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const LongCard = ({ label = "Ticket Breakdown", children }: LongCardProps) => {
  return (
    <div className="flex flex-col gap-1 p-4 border border-l-4 border-l-black rounded-r-lg">
      <span>{label}</span>
      <div className="flex flex-row justify-between items-center">{children}</div>
    </div>
  );
};

export default LongCard;
