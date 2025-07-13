import { Link } from "react-router-dom";
import { PageWrapper, ContentWrapper } from "../components/layout/Wrapper";
import Button from "../components/ui/Button";
import errorIcon from "../assets/icons/error.png";

const Unauthorized = () => {
  return (
    <>
      <PageWrapper>
        <ContentWrapper className="grid place-items-center m-0 h-dvh">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <img className="w-full max-w-[80px]" src={errorIcon} alt="error-icon" />
            <h1 className="text-3xl font-bold">401 Unauthorized</h1>
            <p className="text-sm font-normal text-gray-500">You are not allowed to access this resource</p>
            <Link to="/">
              <Button className="w-full">Return Home</Button>
            </Link>
          </div>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
};

export default Unauthorized;
