import Dropdown from "../components/ui/Dropdown";
import DropdownItem from "../components/ui/DropdownItem";
import SimpleCard from "../components/ui/SimpleCard";
import LongCard from "../components/ui/LongCard";
import LongCardItem from "../components/ui/LongCardItem";

const Login = () => {
  return (
    <div>
      <Dropdown label="Distributor Type">
        <DropdownItem>CCA Member</DropdownItem>
        <DropdownItem>Faculty</DropdownItem>
        <DropdownItem>Sponsor</DropdownItem>
      </Dropdown>
      <Dropdown label="Sample Name">
        <DropdownItem>Marshall</DropdownItem>
        <DropdownItem>Rory</DropdownItem>
        <DropdownItem>Mark</DropdownItem>
      </Dropdown>
      <Dropdown label="Department">
        <DropdownItem>SAMCIS</DropdownItem>
        <DropdownItem>STELLA</DropdownItem>
        <DropdownItem>SOHNABS</DropdownItem>
      </Dropdown>
      <SimpleCard />
      <LongCard>
        <LongCardItem />
        <LongCardItem />
        <LongCardItem />
        <LongCardItem />
      </LongCard>

      <span>Please Login First</span>
    </div>
  );
};

export default Login;
