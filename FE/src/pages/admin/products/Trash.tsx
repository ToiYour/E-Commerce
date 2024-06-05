import {
  deleteAllProduct,
  deleteProduct,
  getAllProductSoft,
  restoreAllProduct,
  restoreProduct,
} from "@/services/product";
import ArrangeTable from "@/components/ArrangeTable";
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
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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
import { IProduct } from "@/interfaces/product";
import {
  formatMoney,
  handleDownloadExcel,
  SwalWarningConfirm,
  ToastError,
  ToastSuccess,
  ToastWarning,
} from "@/lib/utils";
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
const Trash = () => {
  const checkboxAll = useRef<HTMLInputElement>(null); // input checkbox (chọn tất cả)
  const btnSubmitAction = useRef<HTMLButtonElement>(null); // input submit action chọn tất cả

  //
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const order = searchParams.get("order") ?? "all";
  const sortBy = searchParams.get("page") || "";
  const arrange = searchParams.get("arrange") || "createdAt";
  const orderBy = searchParams.get("orderBy") || "asc";
  const { data, isLoading } = useQuery({
    queryKey: ["GET_PRODUCTS_SOFT", page, order, sortBy, arrange, orderBy],
    queryFn: async () => {
      const { data } = await getAllProductSoft(location.search);
      return data.data;
    },
  }); // get api  all  colors
  const handleExportExcel = () => {
    const header = [
      "Ảnh sản phẩm",
      "Tên sản phẩm",
      "Giá cơ bản",
      "Trạng thái",
      "Ngày tạo",
    ];
    const body =
      data &&
      data?.docs.map((item: IProduct) => [
        `${item.images}`,
        `${item.name}`,
        `${item.price}`,
        `${item.status ? "Active" : "Draft"}`,
        `${item.createdAt}`,
      ]);
    handleDownloadExcel(header, body, "table-products", "Product");
  };
  const listProducts = data?.docs as IProduct[]; // data get all colors
  // muate xoá vĩnh viễn one
  const mutaionDeleteSort = useMutation({
    mutationFn: async (id: string | number) => {
      await deleteProduct(id);
    },
    onError: () => {
      ToastError("Xoá thất bại.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCTS_SOFT"] });
      ToastSuccess("Bạn đã xoá thành công.");
    },
  });
  // muate xoá vĩnh viễn all
  const mutaionDeleteAll = useMutation({
    mutationFn: async (productIds: string[]) => {
      await deleteAllProduct(productIds);
    },
    onError: () => {
      ToastError("Xoá thất bại.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCTS_SOFT"] });
      ToastSuccess("Bạn đã xoá thành công.");
    },
  });
  // khôi phục one
  const mutaionRestoreProduct = useMutation({
    mutationFn: async (id: string | number) => {
      await restoreProduct(id);
    },
    onError: () => {
      ToastError("Khôi phục thất bại.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCTS_SOFT"] });
      ToastSuccess("Bạn đã khôi phục thành công.");
    },
  });
  // khôi phục all
  const mutaionRestoreAllProduct = useMutation({
    mutationFn: async (ids: string[]) => {
      await restoreAllProduct(ids);
    },
    onError: () => {
      ToastError("Khôi phục thất bại.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCTS_SOFT"] });
      ToastSuccess("Bạn đã khôi phục thành công.");
    },
  });

  const handleDelete = (id: string | number) => {
    SwalWarningConfirm("Xoá", "Bạn có chắc chắn xoá không!").then((result) => {
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
      ".productIds"
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
    const isChecked = (formData.getAll("productIds").length > 0) as boolean;
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
    const productIds = formData.getAll("productIds");
    const actionsCheckbox = formData.get("actions-checkbox");
    switch (actionsCheckbox) {
      case "delete-forever":
        SwalWarningConfirm(
          "Xoá",
          "Bạn có chắc chắn xoá các mục đã chọn không!"
        ).then((result) => {
          if (result.isConfirmed) {
            mutaionDeleteAll.mutate(productIds as string[]);
            elementCheckboxAll.checked = false;
            elementBtnSubmitCheckbox.disabled = true;
          }
        });

        break;
      case "restore":
        mutaionRestoreAllProduct.mutate(productIds as string[]);
        elementCheckboxAll.checked = false;
        elementBtnSubmitCheckbox.disabled = true;
        break;
      default:
        ToastWarning("Vui lòng chọn hành động");
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
              <Link to={"/admin/products"}>Sản phẩm</Link>
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
            Thùng rác
          </h2>
          <p className="text-sm text-muted-foreground">
            Quản lý sản phẩm của bạn đã xoá.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <Link to={"/admin/products"}>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListTodo className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Danh sách sản phẩm
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
          {/* Thêm mới size */}
          <Link
            to={"/admin/products/add"}
            className="bg-indigo-600 hover:bg-indigo-400 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <PlusCircle className="h-3.5 w-3.5" />{" "}
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
              Thêm mới sản phẩm
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
                <TableHead className="whitespace-nowrap max-w-20 hidden lg:table-cell">
                  Ảnh sản phẩm
                </TableHead>
                <TableHead>
                  <div className="flex justify-center items-end whitespace-nowrap">
                    Tên sản phẩm
                    <ArrangeTable column="name" />
                  </div>
                </TableHead>
                <TableHead className="hidden lg:table-cell ">
                  <div className="flex justify-center items-end whitespace-nowrap">
                    Giá cơ bản
                    <ArrangeTable column="price" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <div className="flex justify-center items-end whitespace-nowrap">
                    Trạng thái
                    <ArrangeTable column="status" />
                  </div>
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  {" "}
                  <div className="flex justify-center items-end whitespace-nowrap">
                    Ngày tạo
                    <ArrangeTable column="createdAt" />
                  </div>
                </TableHead>
                <TableHead>
                  <span className="sr-only">Hành động</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listProducts.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-base">
                    <div className="flex justify-center items-center">
                      <Trash2Icon size={16} /> Thùng rác trống
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                listProducts &&
                listProducts?.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        name="productIds"
                        className="productIds"
                        value={product._id}
                        onChange={handleCheckboxItems}
                      />
                    </TableCell>
                    <TableCell className=" hidden lg:table-cell">
                      <Carousel className="max-w-20">
                        <CarouselContent>
                          {product.images?.map((image) => (
                            <CarouselItem>
                              {" "}
                              <img
                                className="object-cover"
                                width={45}
                                height={45}
                                src={image || ""}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>

                    <TableCell className="hidden lg:table-cell">
                      {formatMoney(product.price || 0)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <BadgeStatus status={product.status as boolean} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {moment
                        .utc(product.createdAt)
                        .format("YYYY-MM-DD hh:mm A")}
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
                              mutaionRestoreProduct.mutate(
                                product._id as string
                              );
                            }}
                          >
                            Khôi phục
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleDelete(product._id || 0);
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
