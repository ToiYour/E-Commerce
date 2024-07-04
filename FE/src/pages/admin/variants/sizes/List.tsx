import {
  deleteSoftAllSize,
  deleteSoftSize,
  getAllSize,
} from "@/services/variants/size";
import BadgeStatus from "@/components/BadgeStatus";
import Loading from "@/components/LoadingFixed";
import MyPagination from "@/components/MyPagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISize } from "@/interfaces/size";
import {
  handleDownloadExcel,
  SwalWarningConfirm,
  ToastError,
  ToastSuccess,
} from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Trash2,
} from "lucide-react";
import moment from "moment";
import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
const List = () => {
  const checkboxAllSize = useRef<HTMLInputElement>(null); // input checkbox (chọn tất cả)
  const btnSubmitActionSize = useRef<HTMLButtonElement>(null); // input submit action chọn tất cả
  //
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const order = searchParams.get("order") ?? "all";
  const sortBy = searchParams.get("page") || "";
  const { data, isLoading } = useQuery({
    queryKey: ["GET_SIZES", page, order, sortBy],
    queryFn: async () => {
      const { data } = await getAllSize(location.search);
      return data.data;
    },
  }); // get api  all  sizes
  const handleExportExcel = () => {
    const header = [
      "Kích thước size",
      "Trạng thái",
      "Ngày tạo",
      "Ngày cập nhập",
    ];
    const body =
      data &&
      data?.docs.map((item: ISize) => [
        `${item.name}`,
        `${item.status ? "Active" : "Draft"}`,
        `${item.createdAt}`,
        `${item.updatedAt}`,
      ]);
    handleDownloadExcel(header, body, "table-sizes", "Sizes");
  };
  const listSizes = data?.docs as ISize[]; // data get all sizes
  // muate delete
  const mutaionDeleteSort = useMutation({
    mutationFn: async (id: string | number) => {
      await deleteSoftSize(id);
    },
    onError: () => {
      ToastError("Xoá thất bại!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_SIZES"] });
      ToastSuccess("Bạn đã xoá thành công.");
    },
  });
  const mutaionDeleteSortAll = useMutation({
    mutationFn: async (sizeIds: string[]) => {
      await deleteSoftAllSize(sizeIds);
    },
    onError: () => {
      ToastError("Xoá thất bại.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_SIZES"] });
      ToastSuccess("Bạn đã xoá thành công.");
    },
  });

  const handleDelete = (id: string | number) => {
    SwalWarningConfirm("Xoá", "Bạn có chắc chắn xoá không?").then((result) => {
      if (result.isConfirmed) {
        mutaionDeleteSort.mutate(id || 0);
      }
    });
  };
  // muate delete end
  // checkbox all
  const handlecheckboxAllSize = () => {
    const elementcheckboxAllSize = checkboxAllSize.current as HTMLInputElement;
    const isChecked = elementcheckboxAllSize.checked;
    const checkboxItems = document.querySelectorAll(
      ".sizeIds"
    ) as NodeListOf<Element>;
    checkboxItems.forEach((item) => {
      const checkboxItem = item as HTMLInputElement;
      const elementBtnSubmitCheckboxSize =
        btnSubmitActionSize.current as HTMLButtonElement;
      checkboxItem.checked = isChecked;
      elementBtnSubmitCheckboxSize.disabled = !isChecked;
    });
  };
  const handleCheckboxItems = () => {
    const elementBtnSubmitCheckboxSize =
      btnSubmitActionSize.current as HTMLButtonElement;
    const elementcheckboxAllSize = checkboxAllSize.current as HTMLInputElement;
    const formData = new FormData(
      document.getElementById("myForms") as HTMLFormElement
    );
    const isChecked = (formData.getAll("sizeIds").length > 0) as boolean;
    elementBtnSubmitCheckboxSize.disabled = !isChecked;
    elementcheckboxAllSize.checked = isChecked;
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const elementBtnSubmitCheckboxSize =
      btnSubmitActionSize.current as HTMLButtonElement;
    const elementcheckboxAllSize = checkboxAllSize.current as HTMLInputElement;
    const formData = new FormData(
      document.getElementById("myForms") as HTMLFormElement
    );
    const sizeIds = formData.getAll("sizeIds");
    const actionsCheckbox = formData.get("actions-checkbox");
    switch (actionsCheckbox) {
      case "delete":
        SwalWarningConfirm(
          "Xoá",
          "Bạn có chắc chắn xoá các mục đã chọn không?"
        ).then((result) => {
          if (result.isConfirmed) {
            mutaionDeleteSortAll.mutate(sizeIds as string[]);
            elementcheckboxAllSize.checked = false;
            elementBtnSubmitCheckboxSize.disabled = true;
          }
        });

        break;

      default:
        ToastError("Vui lòng chọn hành động");
        break;
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <form
      id="myForms"
      onSubmit={onSubmit}
      className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8"
    >
      <Breadcrumb className="hidden md:flex mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/admin"}>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/admin/variant/size"}>Màu sắc & Size</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Size</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center">
        <div className="">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            Size
          </h2>
          <p className="text-sm text-muted-foreground">
            Quản lý size sản phẩm của bạn.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <Link
              to={"/admin/variant/size/trash"}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-sizes focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-8 gap-1"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Thùng rác
              </span>
            </Link>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Lọc
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Lọc theo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={order == "all"}
                onClick={() => {
                  const search = {
                    order: "all",
                    page: "1",
                    sortBy: "status",
                  };
                  setSearchParams(search);
                }}
              >
                Tất cả
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={order == "true"}
                onClick={() => {
                  const search = {
                    order: "true",
                    page: "1",
                    sortBy: "status",
                  };
                  setSearchParams(search);
                }}
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={order == "false"}
                onClick={() => {
                  const search = {
                    order: "false",
                    page: "1",
                    sortBy: "status",
                  };
                  setSearchParams(search);
                }}
              >
                Draft
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            onClick={handleExportExcel}
            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-sizes focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-8 gap-1"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </div>
          {/* Thêm mới màu */}
          <Link
            to={"/admin/variant/size/add"}
            className="bg-indigo-600 hover:bg-indigo-400 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-sizes focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <PlusCircle className="h-3.5 w-3.5" />{" "}
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
              Thêm mới size
            </span>{" "}
          </Link>
        </div>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <div className="flex justify-items-start items-center gap-x-2">
            <input
              id="checkbox-all"
              type="checkbox"
              ref={checkboxAllSize}
              onChange={handlecheckboxAllSize}
            />
            <label
              htmlFor="checkbox-all"
              className="block text-sm font-medium text-gray-900"
            >
              Chọn tất cả
            </label>
            <select
              className=" py-2 px-5 rounded  border-gray-300 text-gray-700 sm:text-sm"
              name="actions-checkbox"
            >
              <option value="" hidden>
                --Hành động
              </option>
              <option value="delete">Xoá</option>
            </select>
            <Button
              disabled
              ref={btnSubmitActionSize}
              className="py-0 bg-indigo-600 hover:bg-indigo-400 "
            >
              Thực hiện
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Kích thước size</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="hidden lg:table-cell">Ngày tạo</TableHead>
                <TableHead>
                  <span className="sr-only">Hành động</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listSizes.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-base">
                    Chưa màu sản phẩm nào.{" "}
                    <Link
                      to={"/admin/variant/size/add"}
                      className="text-sky-700 underline font-semibold "
                    >
                      Thêm màu
                    </Link>
                  </TableCell>
                </TableRow>
              ) : (
                listSizes &&
                listSizes?.map((size) => (
                  <TableRow key={size._id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        name="sizeIds"
                        className="sizeIds"
                        value={size._id}
                        onChange={handleCheckboxItems}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{size.name}</TableCell>
                    <TableCell>
                      <BadgeStatus status={size.status as boolean} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {moment.utc(size.createdAt).format("YYYY-MM-DD hh:mm A")}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link to={`/admin/variant/size/update/${size._id}`}>
                              Cập nhập
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleDelete(size._id || 0);
                            }}
                          >
                            Xoá
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-white hover:bg-white">
                <TableCell colSpan={7} className="py-0 pt-2 ">
                  <MyPagination totalPages={data.totalPages} />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </form>
  );
};

export default List;
