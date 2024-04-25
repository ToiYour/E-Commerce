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
      breakLabel={<Ellipsis />} // Icon ...
      nextLabel={<ChevronRight />} // Icon next page
      previousLabel={<ChevronLeft />} // Icon previous page
      onPageChange={handlePageClick} // Sử lý khi chuyển trang
      pageRangeDisplayed={3} // Số trang được hiện thị (Số trang bên tay trái)
      marginPagesDisplayed={2} // Lề trang được hiện thị (Số trang bên tay phải)
      pageCount={totalPages as number} // Tổng số trang
      renderOnZeroPageCount={null}
      // class css
      containerClassName="flex flex-row items-center justify-end gap-1" // CSS class wrapper phân trang
      activeLinkClassName="border " // CSS cho page đang được active
      pageLinkClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      breakClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      nextLinkClassName="capitalize items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 flex"
      previousLinkClassName="capitalize items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5 flex"
      disabledLinkClassName="opacity-35 cursor-default"
    />
  );
};

export default MyPagination;