import {
  deleteAllCustomer,
  deleteCustomer,
  getAllCustomer,
  updateAccountStatus,
} from "@/api/customer";
import Loading from "@/components/Loading";
import MyPagination from "@/components/MyPagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICustomer } from "@/interfaces/customer";
import { handleDownloadExcel } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import moment from "moment";
import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const List = () => {
  const checkboxAllSize = useRef<HTMLInputElement>(null); // input checkbox (chọn tất cả)
  const btnSubmitActionSize = useRef<HTMLButtonElement>(null); // input submit action chọn tất cả
  //
  const queryClient = useQueryClient();
  const MySwal = withReactContent(Swal); // sweet alert
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const order = searchParams.get("order") ?? "all";
  const sortBy = searchParams.get("page") || "";
  const { data, isLoading } = useQuery({
    queryKey: ["GET_CUSTOMERS", page, order, sortBy],
    queryFn: async () => {
      const { data } = await getAllCustomer(location.search);
      return data.data;
    },
  }); // get api  all  sizes
  const handleExportExcel = () => {
    const header = ["Họ tên", "Địa chỉ", "Email", "Số điện thoại", "Vai trò"];
    const body =
      data &&
      data?.docs.map((item: ICustomer) => [
        `${item.name?.last_name?.concat(" ", item.name?.first_name as string)}`,
        `${item.address?.commune?.concat(
          " ",
          item.address.district as string,
          " ",
          item.address.province as string
        )}`,
        `${item.email}`,
        `${item.phone}`,
        `${item.role}`,
      ]);
    handleDownloadExcel(header, body, "table-customers", "customer");
  };
  const mutationUpdateStatusAccount = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string | number;
      status: boolean;
    }) => {
      await updateAccountStatus(id as string, status);
    },
    onError: () => {
      Swal.fire({
        title: "Update!",
        text: "Cập nhập trạng thái thất bại.",
        icon: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CUSTOMERS"] });
      Swal.fire({
        title: "Update!",
        text: "Bạn đã cập nhập trạng thái thành công.",
        icon: "success",
      });
    },
  });
  const listCustomer = data?.docs as ICustomer[]; // data get all sizes
  // muate delete
  const mutaionDelete = useMutation({
    mutationFn: async (id: string | number) => {
      await deleteCustomer(id);
    },
    onError: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Xoá thất bại.",
        icon: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CUSTOMERS"] });
      Swal.fire({
        title: "Deleted!",
        text: "Bạn đã xoá thành công.",
        icon: "success",
      });
    },
  });
  const mutaionDeleteAll = useMutation({
    mutationFn: async (customerIds: string[]) => {
      await deleteAllCustomer(customerIds);
    },
    onError: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Xoá thất bại.",
        icon: "error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CUSTOMERS"] });
      Swal.fire({
        title: "Deleted!",
        text: "Bạn đã xoá thành công.",
        icon: "success",
      });
    },
  });

  const handleDelete = (id: string | number) => {
    MySwal.fire({
      title: "Bạn có chắc xoá không?",
      text: "Hành động này sẽ không khôi phục được nếu bạn xoá!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý, xoá nó!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutaionDelete.mutate(id || 0);
      }
    });
  };
  // muate delete end
  // checkbox all
  const handlecheckboxAllSize = () => {
    const elementcheckboxAllSize = checkboxAllSize.current as HTMLInputElement;
    const isChecked = elementcheckboxAllSize.checked;
    const checkboxItems = document.querySelectorAll(
      ".customerIds"
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
    const isChecked = (formData.getAll("customerIds").length > 0) as boolean;
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
    const customerIds = formData.getAll("customerIds");
    const actionsCheckbox = formData.get("actions-checkbox");
    switch (actionsCheckbox) {
      case "delete":
        Swal.fire({
          title: "Delete?",
          text: "Hành động này sẽ không khôi phục được nếu bạn xoá!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            mutaionDeleteAll.mutate(customerIds as string[]);
            elementcheckboxAllSize.checked = false;
            elementBtnSubmitCheckboxSize.disabled = true;
          }
        });

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
              <Link to={"/admin/customer"}>Khách hàng</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center">
        <div className="">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            Khách hàng
          </h2>
          <p className="text-sm text-muted-foreground">
            Quản lý khách hàng của bạn.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
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
            to={"/admin/customers/add"}
            className="bg-indigo-600 hover:bg-indigo-400 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-sizes focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <PlusCircle className="h-3.5 w-3.5" />{" "}
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
              Thêm mới khách hàng
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
                <TableHead>Tên khách hàng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Ngày tạo</TableHead>
                <TableHead className="hidden md:table-cell">Khoá</TableHead>
                <TableHead className="hidden md:table-cell">Vai trò</TableHead>
                <TableHead>
                  <span className="sr-only">Hành động</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listCustomer.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-base">
                    Chưa có khách hàng nào.{" "}
                    <Link
                      to={"/admin/customer"}
                      className="text-sky-700 underline font-semibold "
                    >
                      Thêm khách hàng
                    </Link>
                  </TableCell>
                </TableRow>
              ) : (
                listCustomer &&
                listCustomer?.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        name="customerIds"
                        className="customerIds"
                        value={customer._id}
                        onChange={handleCheckboxItems}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {customer.name?.last_name?.concat(
                        " ",
                        customer.name?.first_name as string
                      )}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {moment
                        .utc(customer.createdAt)
                        .format("YYYY-MM-DD hh:mm A")}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Switch
                        checked={customer.account_status}
                        onCheckedChange={(checked) => {
                          mutationUpdateStatusAccount.mutate({
                            id: customer._id as string,
                            status: checked,
                          });
                        }}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {customer.role}
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
                            <Link
                              to={`/admin/customer/update/${customer._id}`}
                              className=""
                            >
                              Cập nhập
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleDelete(customer._id || 0);
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
