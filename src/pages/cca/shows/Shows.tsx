import { ContentWrapper } from "../../../components/layout/Wrapper";
import SimpleCard from "../../../components/ui/SimpleCard";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";
import { useGetShows } from "../../../_lib/@react-client-query/show";
import { useMemo, useState } from "react";
import TextInput from "../../../components/ui/TextInput";
import Dropdown from "../../../components/ui/Dropdown";
import { useGetDepartments } from "../../../_lib/@react-client-query/department";
import type { Department } from "../../../types/department";
import { useAuthContext } from "../../../context/AuthContext";
import { Pagination, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table";
import { useDebounce } from "../../../hooks/useDeabounce";
import type { ShowType } from "../../../types/show";

const showTypes = [
  { label: "All Show Type", value: "" },
  { label: "Major Concert", value: "majorConcert" },
  { label: "Show Case", value: "showCase" },
];

const parseDeparments = (departments: Department[]) => {
  const data = departments.map((department) => ({ label: department.name, value: department.departmentId }));
  data.unshift({ label: "All Departments", value: "" });
  return data;
};

const Shows = () => {
  const [page, setPage] = useState(1);
  const [showType, setShowType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 2000);
  const { user } = useAuthContext();
  const { data: showsData, isLoading: showsLoading } = useGetShows({
    page,
    departmentId: user?.role == "trainer" ? user.department[0].departmentId : (selectedDepartment as string),
    showType: showType as ShowType,
    search: debouncedSearch,
  });
  const { data: departmentsData, isLoading: departmentsLoading } = useGetDepartments();

  const departments = useMemo(() => {
    return parseDeparments(departmentsData?.departments ?? []);
  }, [departmentsData]);

  if (showsLoading || departmentsLoading) {
    return <h1>Loading</h1>;
  }

  if (!showsData || !departmentsData || !user) {
    return <h1>No Shows Fetched Error</h1>;
  }

  return (
    <ContentWrapper className="lg:!p-20">
      <h1 className="text-3xl">Shows</h1>
      <div className="flex justify-between">
        <div className="flex gap-5 mt-10">
          <SimpleCard label="Total Show" value={showsData.total} />
          <SimpleCard className="border-l-red" label="Major Concert" value={showsData.totalMajorConcert} />
          <SimpleCard className="border-l-orange-300" label="Show Case" value={showsData.totalShowCase} />
        </div>
        <Link className="self-end" to={"/shows/add"}>
          <Button className="text-black">Add New Show</Button>
        </Link>
      </div>

      <div className="mt-10 flex gap-5">
        <TextInput
          className="w-[450px] min-w-[450px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Show by Title"
        />
        <Dropdown
          disabled={user?.role !== "head"}
          className="min-w-[200px]"
          onChange={(value) => setSelectedDepartment(value)}
          value={(user.role === "head" ? selectedDepartment : user.department[0].departmentId) as string}
          options={departments}
        />
        <Dropdown className="min-w-[200px]" onChange={(value) => setShowType(value)} value={showType} options={showTypes} />
      </div>

      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Show Type</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showsData.shows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-gray-400">
                  No shows found.
                </TableCell>
              </TableRow>
            ) : (
              showsData.shows.map((show, idx) => (
                <TableRow key={idx}>
                  <TableCell>{show.title}</TableCell>
                  <TableCell className="capitalize">{show.showType}</TableCell>
                  <TableCell>{show.department.name}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/shows/${show.showId}`}>
                      <Button variant="plain">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="mt-5">
          <Pagination currentPage={page} totalPage={showsData.totalPages} onPageChange={(newPage) => setPage(newPage)} />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Shows;
