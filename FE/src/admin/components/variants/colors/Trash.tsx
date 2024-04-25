import {
  deleteAllColor,
  deleteColor,
  getAllColorSoft,
  restoreAllColor,
  restoreColor,
} from "@/api/variants/color";

import Loading from "@/components/Loading";
import MyPagination from "@/components/MyPagination";
import { Badge } from "@/components/ui/badge";
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
import { IColor } from "@/interfaces/color";
import { handleDownloadExcel } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  File,
  ListFilter,
  ListTodo,
  MoreHorizontal,
  PlusCircle,
  Trash2Icon,
} from "lucide-react";
import moment from "moment";
import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Trash = () => {
  const checkboxAll = useRef<HTMLInputElement>(null); // input checkbox (chọn tất cả)
  const btnSubmitAction = useRef<HTMLButtonElement>(null); // input submit action chọn tất cả

  //
  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal); // sweet alert
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const order = searchParams.get("order") ?? "all";
  const sortBy = searchParams.get("page") || "";
  const { data, isLoading } = useQuery({
    queryKey: ["GET_COLORS", page, order, sortBy],
    queryFn: async () => {
      const { data } = await getAllColorSoft(location.search);
      return data.data;
    },
  }); // get api  all  colors
  const handleExportExcel = () => {
    const header = [
      "Tên màu",
      "Trạng thái",
      "Ngày tạo",
      "Ngày cập nhập",
      "Ngày xoá",
    ];
    const body =
      data &&
      data?.docs.map((item: IColor) => [
        `${item.name}`,
        `${item.status ? "Active" : "Draft"}`,
        `${item.createdAt}`,
        `${item.updatedAt}`,
        `${item.deletedAt}`,
      ]);
    handleDownloadExcel(header, body, "table-colors", "Colors");
  };
  const listColor = data?.docs as IColor[]; // data get all colors
  // muate xoá vĩnh viễn one
  const mutaionDeleteSort = useMutation({
    mutationFn: async (id: string | number) => {
      await deleteColor(id);
    },
    onError: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Xoá thất bại.",
        icon: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_COLORS"] });
      Swal.fire({
        title: "Deleted!",
        text: "Bạn đã xoá thành công.",
        icon: "success",
      });
    },
  });
  // muate xoá vĩnh viễn all
  const mutaionDeleteAll = useMutation({
    mutationFn: async (colorIds: string[]) => {
      await deleteAllColor(colorIds);
    },
    onError: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Xoá thất bại.",
        icon: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_COLORS"] });
      Swal.fire({
        title: "Deleted!",
        text: "Bạn đã xoá thành công.",
        icon: "success",
      });
    },
  });
  // khôi phục one
  const mutaionRestoreColor = useMutation({
    mutationFn: async (id: string | number) => {
      await restoreColor(id);
    },
    onError: () => {
      Swal.fire({
        title: "Restore!",
        text: "Khôi phục thất bại.",
        icon: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_COLORS"] });
      Swal.fire({
        title: "Restore!",
        text: "Bạn đã khôi phục thành công.",
        icon: "success",
      });
    },
  });
  // khôi phục all
  const mutaionRestoreAllColor = useMutation({
    mutationFn: async (ids: string[]) => {
      await restoreAllColor(ids);
    },
    onError: () => {
      Swal.fire({
        title: "Restore!",
        text: "Khôi phục thất bại.",
        icon: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_COLORS"] });
      Swal.fire({
        title: "Restore!",
        text: "Bạn đã khôi phục thành công.",
        icon: "success",
      });
    },
  });

  const handleDelete = (id: string | number) => {
    MySwal.fire({
      title: "Bạn có chắc xoá không?",
      text: "Hành động này sẽ xoá vĩnh viễn không thể khôi phục được!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý, xoá nó!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutaionDeleteSort.mutate(id || 0);
      }
    });
  };
  // muate delete end
  // checkbox all
  const handleCheckboxAll = () => {
    const elementCheckboxAll = checkboxAll.current as HTMLInputElement;
    const isChecked = elementCheckboxAll.checked;
    const checkboxItems = document.querySelectorAll(
      ".colorIds"
    ) as NodeListOf<Element>;
    checkboxItems.forEach((item) => {
      const checkboxItem = item as HTMLInputElement;
      const elementBtnSubmitCheckbox =
        btnSubmitAction.current as HTMLButtonElement;
      checkboxItem.checked = isChecked;
      elementBtnSubmitCheckbox.disabled = !isChecked;
    });
  };
  const handleCheckboxItems = () => {
    const elementBtnSubmitCheckbox =
      btnSubmitAction.current as HTMLButtonElement;
    const elementCheckboxAll = checkboxAll.current as HTMLInputElement;
    const formData = new FormData(
      document.getElementById("myForms") as HTMLFormElement
    );
    const isChecked = (formData.getAll("colorIds").length > 0) as boolean;
    elementBtnSubmitCheckbox.disabled = !isChecked;
    elementCheckboxAll.checked = isChecked;
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const elementBtnSubmitCheckbox =
      btnSubmitAction.current as HTMLButtonElement;
    const elementCheckboxAll = checkboxAll.current as HTMLInputElement;
    const formData = new FormData(
      document.getElementById("myForms") as HTMLFormElement
    );
    const colorIds = formData.getAll("colorIds");
    const actionsCheckbox = formData.get("actions-checkbox");
    switch (actionsCheckbox) {
      case "delete-forever":
        Swal.fire({
          title: "Xoá vĩnh viễn?",
          text: "Hành động này sẽ không thể khôi phục sau khi bạn xoá!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            mutaionDeleteAll.mutate(colorIds as string[]);
            elementCheckboxAll.checked = false;
            elementBtnSubmitCheckbox.disabled = true;
          }
        });

        break;
      case "restore":
        mutaionRestoreAllColor.mutate(colorIds as string[]);
        elementCheckboxAll.checked = false;
        elementBtnSubmitCheckbox.disabled = true;
        break;
      default:
        toast.warn("Vui lòng chọn hành động", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
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
              <Link to={"/admin/variant/color"}>Màu sắc & Size</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/admin/variant/color"}>Màu sắc</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Thùng rác</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center">
        <div className="">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            Màu sắc đã xoá Soft
          </h2>
          <p className="text-sm text-muted-foreground">
            Quản lý màu sắc sản phẩm của bạn đã xoá.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <Link to={"/admin/variant/color"}>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListTodo className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Danh sách màu
                </span>
              </Button>
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
            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-8 gap-1"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </div>
          {/* Thêm mới màu */}
          <Link
            to={"/admin/variant/color/add"}
            className="bg-indigo-600 hover:bg-indigo-400 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <PlusCircle className="h-3.5 w-3.5" />{" "}
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
              Thêm mới màu
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
              ref={checkboxAll}
              onChange={handleCheckboxAll}
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
              <option value="delete-forever">Xoá vĩnh viễn</option>
              <option value="restore">Khôi phục</option>
            </select>
            <Button
              disabled
              ref={btnSubmitAction}
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
                <TableHead>Tên màu</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="hidden md:table-cell">Ngày tạo</TableHead>
                <TableHead className="hidden md:table-cell">
                  Ngày cập nhập
                </TableHead>
                <TableHead className="hidden md:table-cell">Ngày xoá</TableHead>
                <TableHead>
                  <span className="sr-only">Hành động</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listColor.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-base">
                    <div className="flex justify-center items-center">
                      <Trash2Icon size={16} /> Thùng rác trống
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                listColor &&
                listColor?.map((color) => (
                  <TableRow key={color._id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        name="colorIds"
                        className="colorIds"
                        value={color._id}
                        onChange={handleCheckboxItems}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{color.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {" "}
                        {color.status ? "Active" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {moment.utc(color.createdAt).format("YYYY-MM-DD hh:mm A")}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {moment.utc(color.updatedAt).format("YYYY-MM-DD hh:mm A")}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {moment.utc(color.deletedAt).format("YYYY-MM-DD hh:mm A")}
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
                          <DropdownMenuItem
                            onClick={() => {
                              mutaionRestoreColor.mutate(color._id as string);
                            }}
                          >
                            Khôi phục
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleDelete(color._id || 0);
                            }}
                          >
                            Xoá vĩnh viễn
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

export default Trash;
