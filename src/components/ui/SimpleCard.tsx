import merge from "../../utils/merge";

export interface SimpleCardProps {
  label: string;
  value: string | number;
  className?: string;
}

const baseStyle = "flex flex-col  border py-8 px-16  border-l-4 w-fit rounded-r-lg bg-gray border-lightGrey relative";

export const SimpleCard = ({ label, value, className = "border-l-lime-500" }: SimpleCardProps) => {
  return (
    <div className={merge(baseStyle, className)}>
      <p className="text-sm absolute w-full top-3 left-3">{label}</p>
      <p className="text-4xl font-medium self-center mt-2">{value}</p>
    </div>
  );
};

export default SimpleCard;
