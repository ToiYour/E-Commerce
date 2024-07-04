import ButtonLoading from "@/components/ButtonLoading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ICategory } from "@/interfaces/category";
import {
  ToastError,
  ToastSuccess,
  transformationCloudinary,
  upLoadFiles,
} from "@/lib/utils";
import { getByIdCategory, updateCategory } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ImageUp } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
const Update = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const { id } = useParams();
  const { data: prevCategory } = useQuery({
    queryKey: ["GET_BY_ID_CATEGORY", id],
    queryFn: async () => {
      const { data } = await getByIdCategory(id as string);
      reset({ ...data.data, status: data.data.status.toString() });
      return data.data;
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ICategory>();

  const onSubmit = async (newData: ICategory) => {
    try {
      if (typeof newData.img == "object") {
        const linkImg = await upLoadFiles(newData?.img?.[0] as File);
        newData.img = transformationCloudinary(
          linkImg,
          "c_pad,w_564,h_810,g_center,b_gen_fill"
        );
      }
      const { data } = await updateCategory(id!, newData);
      ToastSuccess(data.message || "Cập nhập danh mục thành công");
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.messages);
      }
    }
  };
  const handleImageUp: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e?.target?.files?.[0]) {
      imgRef!.current!.src = URL.createObjectURL(e?.target?.files?.[0] as File);
      e.target.onload = () => {
        URL.revokeObjectURL(imgRef!.current!.src);
      };
    } else {
      imgRef!.current!.src = "/images/no-img.jpg";
    }
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
              <Link to={"/admin/category"}>Danh mục</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cập nhập</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-muted-foreground sm:text-3xl">
            Cập nhập danh mục sản phẩm
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
                Tên danh mục{" "}
              </label>
              <input
                {...register("name", {
                  required: "Vui lòng nhập tên danh mục",
                })}
                type="text"
                id="UserEmail"
                className="mt-1 p-2 w-full rounded-md border-2 border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="">
              <label htmlFor="">Ảnh danh mục</label>
              <div className="flex items-end justify-center rounded-md  border border-gray-100 bg-white p-4 shadow-md">
                <label
                  htmlFor="upload"
                  className=" group flex items-center justify-center gap-x-1 rounded p-1   bg-[#66a6ff] max-h-8 max-w-24 cursor-pointer border border-gray-100"
                >
                  <ImageUp
                    size={18}
                    color="#fff"
                    className="transition ease-in group-hover:-translate-y-1 "
                  />
                  <span className="text-white font-medium text-xs">
                    Chọn ảnh
                  </span>
                </label>
                <input
                  {...register("img", {
                    onChange: handleImageUp,
                  })}
                  id="upload"
                  type="file"
                  className="hidden"
                />
                <img
                  ref={imgRef}
                  src={prevCategory?.img}
                  alt=""
                  className="size-16 ml-2 rounded object-cover"
                />
              </div>
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
                      // defaultValue="true"

                      value="true"
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
                      // defaultValue="false"
                      value="false"
                      id="DeliveryPriority"
                      className="size-5 border-gray-300 text-blue-500"
                    />
                  </label>
                </div>
              </fieldset>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              {isSubmitting ? <ButtonLoading /> : "Cập nhập"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
