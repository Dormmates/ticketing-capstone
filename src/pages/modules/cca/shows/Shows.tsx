import { ContentWrapper } from "../../../../components/layout/Wrapper";
import SimpleCard from "../../../../components/ui/SimpleCard";
import Button from "../../../../components/ui/Button";
import { Link } from "react-router-dom";

const Shows = () => {
  return (
    <ContentWrapper className="lg:!p-20">
      <h1 className="text-3xl">Shows</h1>
      <div className="flex gap-5 mt-10">
        <SimpleCard label="Total Show" value="3" />
        <SimpleCard label="Total Show" value="3" />
        <SimpleCard label="Total Show" value="3" />
      </div>
      <Link to={"/shows/add"}>
        <Button>Add New Show</Button>
      </Link>
    </ContentWrapper>
  );
};

export default Shows;
