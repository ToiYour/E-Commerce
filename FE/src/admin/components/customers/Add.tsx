import Address from "@/components/Address";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ImageUp } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const Add = () => {
  const avartarRef = useRef<HTMLImageElement>(null);
  const { register, handleSubmit } = useForm();
  interface tmp {
    address?: {
      communes?: string;
      district?: string;
      province?: string;
    };
  }
  const onSubmit = (newData: tmp) => {
    console.log(newData);
  };

  const handleImageUp: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    avartarRef!.current!.src = URL.createObjectURL(
      e?.target?.files?.[0] as File
    );
    e.target.onload = () => {
      URL.revokeObjectURL(avartarRef!.current!.src);
    };
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
              <Link to={"/admin/variant/color"}>Khách hàng</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to={"/admin/variant/color"}>Size</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Thêm mới</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-y-5 md:gap-x-5 ">
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
              id="upload"
              type="file"
              onChange={handleImageUp}
              className="hidden"
            />
          </div>
        </div>
        <div className="col-span-4 rounded-md border border-gray-100 bg-white">
          <h2 className="text-center py-2 font-semibold text-2xl">
            Thông tin khách hàng
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" p-5 pt-0 grid grid-cols-6 gap-6"
          >
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="FirstName"
                className="block text-sm font-medium text-gray-700"
              >
                Tên
              </label>
              <input
                type="text"
                id="FirstName"
                name="first_name"
                className="mt-1 w-full p-1 rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="LastName"
                className="block text-sm font-medium text-gray-700"
              >
                Họ
              </label>
              <input
                type="text"
                id="LastName"
                name="last_name"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
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
                type="email"
                id="Email"
                name="email"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
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
                type="phone"
                id="phone"
                name="phone"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
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
                type="user_name"
                id="user_name"
                name="user_name"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
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
                type="password"
                id="Password"
                name="password"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Vai trò{" "}
              </label>
              <input
                type="text"
                name="role"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Trạng thái{" "}
              </label>
              <input
                type="text"
                name="role"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            {/*  */}
            <Address register={register} />
            <div className="col-span-6">
              <label
                htmlFor="PasswordConfirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Địa chỉ cụ thể
              </label>
              <input
                type="password"
                id="PasswordConfirmation"
                name="password_confirmation"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                Tạo mới khách hàng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
