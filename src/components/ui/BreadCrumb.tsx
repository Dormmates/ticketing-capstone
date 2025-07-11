import { Link } from "react-router-dom";
import icon from "../../assets/icons/back.png";

interface Props {
  backLink: string;
  items: {
    name: string;
    path: string;
  }[];
}

const BreadCrumb = ({ backLink, items }: Props) => {
  return (
    <div className="flex items-center gap-5">
      <Link className="hover:opacity-20 duration-300 ease-linear" to={backLink}>
        <img className="w-8" src={icon} alt="back" />
      </Link>
      <div>
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          return (
            <Link key={index} to={item.path} className={isLastItem ? "underline pointer-events-none" : ""}>
              <span className="hover:underline hover:opacity-50 duration-500 ease-linear">{item.name}</span> {isLastItem ? "" : <span>{"> "}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BreadCrumb;
