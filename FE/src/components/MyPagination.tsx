import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
const MyPagination = ({ totalPages }: { totalPages: string | number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Handle Paginate
  const handlePageClick = (event: { selected: number }) => {
    let queryParams = {};
    for (const [key, value] of searchParams.entries()) {
      queryParams = { ...queryParams, [key]: value };
    }
    setSearchParams({
      ...queryParams,
      page: String(event.selected + 1),
    });
  };
  return (
    <ReactPaginate
      breakLabel={<Ellipsis />}
      nextLabel={<ChevronRight />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={totalPages as number}
      previousLabel={<ChevronLeft />}
      renderOnZeroPageCount={null}
      // class css
      containerClassName="flex flex-row items-center justify-end gap-1"
      activeLinkClassName="border "
      pageLinkClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      breakClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      nextLinkClassName="capitalize items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 flex"
      previousLinkClassName="capitalize items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 flex"
      disabledLinkClassName="opacity-35 cursor-default"
    />
  );
};

export default MyPagination;
