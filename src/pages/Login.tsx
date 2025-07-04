import { PageWrapper, ContentWrapper } from "../components/layout/Wrapper";
import logo from "../assets/images/cca-logo.png";
import TextInput, { PasswordInput } from "../components/ui/TextInput";
import { useState } from "react";
import Button from "../components/ui/Button";

const Login = () => {
  const [formContent, setFormContent] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormContent((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <div className="flex flex-col justify-center gap-10 items-center mx-auto w-full lg:max-w-[50%]">
          <div>
            <img src={logo} alt="CCA Logo" />
          </div>
          <h1>Login</h1>
          <h2>Welcome CCA Staff</h2>
          <form className="w-full flex flex-col gap-5" onSubmit={submitForm}>
            <TextInput
              label="Email"
              name="email"
              value={formContent.email}
              type="email"
              onChange={handleInputChange}
              placeholder="(eg. cca@slu.edu.ph)"
            />
            <PasswordInput label="Password" name="password" value={formContent.password} onChange={handleInputChange} placeholder="Password" />
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </div>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Login;
