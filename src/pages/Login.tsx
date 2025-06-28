import { useState } from "react";
import Dropdown, { type DropdownOption } from "../components/ui/Dropdown";

const Login = () => {
  const [selected, setSelected] = useState<string | number>("");

  const handleCreateNew = () => {
    alert("Hi");
  };

  const options: DropdownOption[] = [
    { label: "Engineering", value: "eng" },
    { label: "Science", value: "sci" },
    { label: "Add new department", onClick: handleCreateNew },
  ];

  return <Dropdown className="w-1/2" label="Department" value={selected} onChange={setSelected} options={options} />;
};

export default Login;
