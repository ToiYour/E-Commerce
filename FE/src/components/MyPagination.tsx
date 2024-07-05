import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
const MyPagination = ({ totalPages }: { totalPages: string | number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageCount, setPageCount] = useState(0);
  const [pageOffSet, setPageOffSet] = useState(0);
  // Handle Paginate
  const handlePageClick = (event: { selected: number }) => {
    let queryParams = {};
    setPageOffSet(event.selected);
    for (const [key, value] of searchParams.entries()) {
      queryParams = { ...queryParams, [key]: value };
    }

    setSearchParams({
      ...queryParams,
      page: String(event.selected + 1),
    });
  };
  useEffect(() => {
    if (searchParams.get("page")) {
      setPageOffSet(Number(searchParams.get("page")) - 1);
    }
    setPageCount(Number(totalPages));
  }, [totalPages]);

  return (
    <ReactPaginate
      forcePage={pageOffSet as number}
      breakLabel={<Ellipsis />}
      nextLabel={<ChevronRight />}
      previousLabel={<ChevronLeft />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      // class css
      containerClassName="flex flex-row items-center justify-end gap-1" // CSS class wrapper phân trang
      activeLinkClassName="border border-gray-100" // CSS cho page đang được active
      pageLinkClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      breakClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      nextLinkClassName="capitalize items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 flex"
      previousLinkClassName="capitalize items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 flex"
      disabledLinkClassName="opacity-35 cursor-default"
    />
  );
};

export default MyPagination;
