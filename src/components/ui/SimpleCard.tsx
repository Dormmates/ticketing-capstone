import merge from "../../utils/merge";

export interface SimpleCardProps {
  label: string;
  value: string | number;
  className?: string;
}

const baseStyle = "flex flex-col items-center p-4 border border-l-4 w-fit rounded-r-lg";

export const SimpleCard = ({ label = "Total Tickets", value = "700", className = "border-l-lime-500" }: SimpleCardProps) => {
  return (
    <div className={merge(baseStyle, className)}>
      <span className="text-sm">{label}</span>
      <span className="text-3xl">{value}</span>
    </div>
  );
};

export default SimpleCard;
// {merge(baseStyle, className) }
