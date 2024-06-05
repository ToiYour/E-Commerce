import { createCustomer } from "@/services/customer";
import Address from "@/components/Address";
import ButtonLoading from "@/components/ButtonLoading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ICustomer } from "@/interfaces/customer";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
  upLoadFiles,
} from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ImageUp } from "lucide-react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
const Add = () => {
  const navigate = useNavigate();
  const avartarRef = useRef<HTMLImageElement>(null);
  const [isLoadSubmit, setIsLoadSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICustomer>({
    defaultValues: { role: false, account_status: false },
  });
  const onSubmit: SubmitHandler<ICustomer> = async (newData: ICustomer) => {
    setIsLoadSubmit(true);
    await mutationCustomer.mutate(newData);
  };
  const mutationCustomer = useMutation({
    mutationFn: async (newData: ICustomer) => {
      if (newData.avatar?.[0]) {
        const linkImage = await upLoadFiles(newData.avatar?.[0] as File);
        newData.avatar = linkImage;
        await createCustomer(newData);
      } else {
        newData.avatar =
          "https://res.cloudinary.com/dlzhmxsqp/image/upload/v1716288330/e_commerce/s4nl3tlwpgafsvufcyke.jpg";
        await createCustomer(newData);
      }
    },
    onError: (error) => {
      setIsLoadSubmit(false);
      const axiosError = error as AxiosError;
      ToastError("Có lỗi khi thêm mới khách hàng!");
      axiosError?.response?.data &&
        ToastWarning(axiosError?.response?.data as string);
    },
    onSuccess: () => {
      setIsLoadSubmit(false);
      ToastSuccess("Thêm mới khách hàng thành công!");
      navigate("/admin/customers");
    },
  });
  const handleImageUp: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e?.target?.files?.[0]) {
      avartarRef!.current!.src = URL.createObjectURL(
        e?.target?.files?.[0] as File
      );
      e.target.onload = () => {
        URL.revokeObjectURL(avartarRef!.current!.src);
      };
    } else {
      avartarRef!.current!.src = "/images/no-avartar.jpg";
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
              <Link to={"/admin/customers"}>Khách hàng</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Thêm mới</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-5 gap-y-5 lg:gap-x-5 "
      >
        <div className="">
          <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md space-y-5">
            <img
              ref={avartarRef}
              src="/images/no-avartar.jpg "
              alt=""
              className="size-20 mx-auto rounded-full object-cover"
            />
            <label
              htmlFor="upload"
              className=" group flex items-center justify-center gap-x-1 rounded p-1   bg-[#66a6ff] mx-auto max-w-24 cursor-pointer border border-gray-100"
            >
              <ImageUp
                size={18}
                color="#fff"
                className="transition ease-in group-hover:-translate-y-1 "
              />
              <span className="text-white font-medium text-xs">Chọn ảnh</span>
            </label>
            <input
              {...register("avatar", { onChange: handleImageUp })}
              id="upload"
              type="file"
              className="hidden"
            />
          </div>
        </div>
        <div className="col-span-4 rounded-md border border-gray-100 bg-white">
          <h2 className="text-center py-2 font-semibold text-2xl">
            Thông tin khách hàng
          </h2>
          <div className=" p-5 pt-0 grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="LastName"
                className="block text-sm font-medium text-gray-700"
              >
                Họ
              </label>
              <input
                {...register("name.last_name", {
                  required: "Họ không được bỏ trống",
                })}
                type="text"
                id="LastName"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.name?.last_name && (
                <p className="text-red-500">{errors.name?.last_name.message}</p>
              )}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="FirstName"
                className="block text-sm font-medium text-gray-700"
              >
                Tên
              </label>
              <input
                {...register("name.first_name", {
                  required: "Tên không được bỏ trống",
                })}
                type="text"
                id="FirstName"
                className="mt-1 w-full p-1 rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.name?.first_name && (
                <p className="text-red-500">
                  {errors.name?.first_name.message}
                </p>
              )}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Email{" "}
              </label>
              <input
                {...register("email", {
                  required: "Email không được bỏ trống",
                  validate: (val) => {
                    if (
                      !val?.match(
                        /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
                      )
                    ) {
                      return "Email không đúng định dạng";
                    }
                  },
                })}
                type="email"
                id="Email"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Số điện thoại{" "}
              </label>
              <input
                {...register("phone", {
                  required: "Số điện thoại không được bỏ trống",
                  validate: (val) => {
                    if (!val?.match(/((09|03|07|08|05)+([0-9]{8})\b)/g)) {
                      return "Số điện thoại không đúng định dạng";
                    }
                  },
                })}
                type="text"
                id="phone"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Tên đăng nhập{" "}
              </label>
              <input
                {...register("user_name", {
                  required: "Tên đăng nhập không được bỏ trống",
                })}
                type="user_name"
                id="user_name"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.user_name && (
                <p className="text-red-500">{errors.user_name.message}</p>
              )}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Mật khẩu{" "}
              </label>
              <input
                {...register("password", {
                  required: "Mật khẩu không được bỏ trống",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu ít nhất là 8 ký tự",
                  },
                })}
                type="password"
                id="Password"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Vai trò{" "}
              </label>
              <select
                {...register("role", { required: "Vui lòng chọn vai trò" })}
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              >
                <option value="false">Khách hàng</option>
                <option value="true">Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Trạng thái{" "}
              </label>

              <select
                {...register("account_status", {
                  required: "Vui lòng chọn trạng thái",
                })}
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              >
                <option value="false">Kích Hoạt</option>
                <option value="true">Khoá</option>
              </select>
              {errors.account_status && (
                <p className="text-red-500">{errors.account_status.message}</p>
              )}
            </div>
            {/*  */}
            <Address register={register} errors={errors} />
            <div className="col-span-6">
              <label
                htmlFor="PasswordConfirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Địa chỉ cụ thể
              </label>
              <textarea
                {...register("address.specific")}
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              ></textarea>
            </div>
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                disabled={isLoadSubmit}
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              >
                {isLoadSubmit ? <ButtonLoading /> : "Tạo mới khách hàng"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;
