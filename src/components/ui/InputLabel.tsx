import merge from "../../utils/merge";

interface Props {
  className?: string;
  label: string;
}

const InputLabel = ({ className = "", label }: Props) => {
  return <h1 className={merge(className, "text-black text-sm mb-1")}>{label}</h1>;
};

export default InputLabel;
