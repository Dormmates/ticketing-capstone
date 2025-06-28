import { useState } from "react";
import Dropdown, { type DropdownOption } from "../components/ui/Dropdown";
import TextInput from "../components/ui/TextInput";

const Login = () => {
  const [selected, setSelected] = useState<string | number>("");
  const [input, setInput] = useState<string>("");

  const handleCreateNew = () => {
    alert("Hi");
  };

  const options: DropdownOption[] = [
    { label: "Engineering", value: "eng" },
    { label: "Science", value: "sci" },
    { label: "Add new department", onClick: handleCreateNew },
  ];

  return (
    <div className="flex flex-col p-10 gap-2 max-w-lg">
      <Dropdown label="Department" value={selected} onChange={setSelected} options={options} />
      <TextInput label="Name" onChange={(e) => setInput(e.target.value)} value={input} />
    </div>
  );
};

export default Login;
