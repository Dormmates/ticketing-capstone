import type { JSX } from "react";
import merge from "../../utils/merge";

interface Props {
  className?: string;
  label: string | JSX.Element;
}

const InputLabel = ({ className = "", label }: Props) => {
  return <h1 className={merge(className, "text-black text-sm mb-1")}>{label}</h1>;
};

export default InputLabel;
