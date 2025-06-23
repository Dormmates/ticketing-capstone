import { useState } from "react";
import { Table, TableCaption, TableBody, TableCell, TableHead, TableHeader, TableRow, Pagination } from "../components/ui/Table";
const CCALayout = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const data = Array.from({ length: 47 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));

  const rowsPerPage = 10;

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6  bg-white rounded ">
      <h1>
        I am on CCA Module
        <ul>
          <li>Try /distributor</li>
          <li>Try /customer</li>
        </ul>
      </h1>
      <Table>
        <TableCaption>
          Items — Page {currentPage} of {totalPages}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Pagination currentPage={currentPage} totalPage={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default CCALayout;
