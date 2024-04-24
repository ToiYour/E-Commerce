import { createColor } from "@/api/variants/color";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IColor } from "@/interfaces/color";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";
const Add = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IColor>({
    defaultValues: {
      status: true,
    },
  });
  const { mutate } = useMutation({
    mutationFn: createColor,

    onError: (err) => {
      console.log(err);

      toast.error("Có lỗi xảy ra khi thêm màu mới ", {
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
    },
    onSuccess: async () => {
      toast.success("Thêm mới màu thành công", {
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
      navigate("/admin/variant/color");
    },
  });
  const onSubmit = async (newData: IColor) => {
    mutate(newData);
  };

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
            <Link to={"/admin/variant/color"}>Màu sắc</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Thêm mới</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-muted-foreground sm:text-3xl">
            Thêm mới màu sản phẩm
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <div>
              <label
                htmlFor="UserEmail"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Tên màu{" "}
              </label>
              <input
                {...register("name", { required: "Vui lòng nhập tên màu" })}
                type="text"
                id="UserEmail"
                className="mt-1 p-2 w-full rounded-md border-2 border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Trạng thái
              </label>
              <fieldset className="space-y-4 flex gap-x-2">
                <legend className="sr-only">Delivery</legend>
                <div>
                  <label
                    htmlFor="DeliveryStandard"
                    className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white  px-4 py-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                  >
                    <div>
                      <p className="text-gray-700">Active</p>
                    </div>
                    <input
                      {...register("status")}
                      type="radio"
                      defaultValue="true"
                      defaultChecked
                      id="DeliveryStandard"
                      className="size-5 border-gray-300 text-blue-500"
                    />
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="DeliveryPriority"
                    className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                  >
                    <div>
                      <p className="text-gray-700">Draft</p>
                    </div>
                    <input
                      {...register("status")}
                      type="radio"
                      defaultValue="false"
                      id="DeliveryPriority"
                      className="size-5 border-gray-300 text-blue-500"
                    />
                  </label>
                </div>
              </fieldset>
            </div>
            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Thêm mới
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
