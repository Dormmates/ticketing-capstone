import type { TableHTMLAttributes, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react";
import merge from "../../utils/merge";
import Button from "./Button";
import next from "../../assets/icons/next.png";
import prev from "../../assets/icons/prev.png";

type PaginationProps = {
  className?: string;
  currentPage: number;
  totalPage: number;
  onPageChange?: (newPage: number) => void;
};

export const Table = ({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-auto">
    <table className={merge("w-full caption-bottom text-sm text-left text-darkGrey", className)} {...props} />
  </div>
);

export const TableHeader = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={merge("bg-lightPrimary text-primary", className)} {...props} />
);

export const TableBody = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => <tbody className={merge("", className)} {...props} />;

export const TableRow = ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={merge("rounded-lg", className)} {...props} />
);

export const TableHead = ({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={merge("h-12 px-4 text-left align-middle font-medium", className)} {...props} />
);

export const TableCell = ({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={merge("p-4 align-middle border-b border-tableBorderb", className)} {...props} />
);

export const TableCaption = ({ className, ...props }: HTMLAttributes<HTMLTableCaptionElement>) => (
  <caption className={merge("mt-4 text-sm", className)} {...props} />
);

export const Pagination = ({ className = "", currentPage, totalPage, onPageChange }: PaginationProps) => {
  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center">
      <div className={`flex items-center gap-1 ${className}`}>
        <Button variant="plain" onClick={handlePrev} disabled={currentPage === 1} className="disabled:opacity-50">
          <img src={prev} alt="Previous" />
        </Button>

        <div className="text-sm text-darkGrey font-bold">
          {currentPage} / {totalPage}
        </div>

        <Button variant="plain" onClick={handleNext} disabled={currentPage === totalPage} className="disabled:opacity-50">
          <img src={next} alt="Next" />
        </Button>
      </div>
    </div>
  );
};
