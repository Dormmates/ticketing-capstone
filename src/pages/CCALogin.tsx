import { PageWrapper, ContentWrapper } from "../components/layout/Wrapper";
import logo from "../assets/images/cca-logo.png";
import TextInput, { PasswordInput } from "../components/ui/TextInput";
import { useState } from "react";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { useLogin } from "../_lib/@react-client-query/auth";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const login = useLogin();
  const { setUser } = useAuthContext();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loginError, setLoginError] = useState("");

  const [formContent, setFormContent] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormContent((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formContent.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formContent.email)) newErrors.email = "Invalid email";

    if (!formContent.password) newErrors.password = "Password is required";
    else if (formContent.password.length < 6) newErrors.password = "Password too short";

    setErrors(newErrors);
    setLoginError("");
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    login.mutate(
      { ...formContent, expectedRole: "head" },
      {
        onSuccess: (data) => {
          setUser(data);
        },

        onError: (er) => {
          setLoginError(er.message);
        },
      }
    );
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
              isError={!!errors.email}
              errorMessage={errors.email}
            />
            <PasswordInput
              label="Password"
              name="password"
              value={formContent.password}
              onChange={handleInputChange}
              placeholder="Password"
              isError={!!errors.password}
              errorMessage={errors.password}
            />
            <Button className="w-full" type="submit">
              Login
            </Button>
            {loginError && <h1 className="mx-auto text-red">{loginError}</h1>}
            <Link className="mx-auto hover:opacity-50 duration-500 ease-linear" to="/distributor/login">
              I'm a distributor
            </Link>
          </form>
        </div>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Login;
