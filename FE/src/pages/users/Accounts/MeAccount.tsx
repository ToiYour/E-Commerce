import ButtonLoading from "@/components/ButtonLoading";
import { ICustomer } from "@/interfaces/customer";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAccount } from "./Layout";
import { ImageUp } from "lucide-react";
import { updateCustomer } from "@/api/customer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
  upLoadFileOne,
} from "@/lib/utils";
import { AxiosError } from "axios";

const MeAccount = () => {
  const account = useAccount();
  const queryClient = useQueryClient();
  const [isLoadSubmit, setIsLoadSubmit] = useState(false);
  const avartarRef = useRef<HTMLImageElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICustomer>();
  const handleImageUp: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e?.target?.files?.[0]) {
      avartarRef!.current!.src = URL.createObjectURL(
        e?.target?.files?.[0] as File
      );
      e.target.onload = () => {
        URL.revokeObjectURL(avartarRef!.current!.src);
      };
    } else {
      avartarRef!.current!.src = account.avatar as string;
    }
  };
  useEffect(() => {
    reset(account);
  }, [account, reset]);
  const mutationCustomer = useMutation({
    mutationFn: async (newData: ICustomer) => {
      if (newData.avatar?.[0]) {
        const linkImage = await upLoadFileOne(newData.avatar?.[0] as File);
        newData.avatar = linkImage;
        await updateCustomer(account._id as string, newData);
      } else {
        await updateCustomer(account._id as string, newData);
      }
    },
    onError: (error) => {
      setIsLoadSubmit(false);
      const axiosError = error as AxiosError;
      ToastError("Có lỗi khi cập nhập khách hàng!");
      axiosError?.response?.data &&
        ToastWarning(axiosError?.response?.data as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ACCOUNT_BY_TOKEN"] });
      setIsLoadSubmit(false);
      ToastSuccess("Cập nhập khách hàng thành công!");
    },
  });
  const onSubmit: SubmitHandler<ICustomer> = async (newData: ICustomer) => {
    setIsLoadSubmit(true);
    await mutationCustomer.mutate(newData);
  };
  return (
    <div className="text-content w-full bg-white p-10 border border-gray-100   rounded shadow">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-4">
          <div className="text-2xl">Hồ sơ của tôi</div>
          <p className="text-xs">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
        <div className="grid grid-cols-6 ">
          <div className="grid gap-3 col-span-6 sm:col-span-4 pb-6 border-b sm:pe-6 sm:border-e border-gray-100 ">
            <div className="">
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
            <div className="">
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
            <div className="">
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
            <div className="">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Số điện thoại{" "}
              </label>
              <input
                {...register("phone", {
                  validate: (val) => {
                    if (
                      !val?.match(/((09|03|07|08|05)+([0-9]{8})\b)/g) &&
                      val
                    ) {
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
            <div className="">
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
          </div>
          <div className="col-span-6 sm:col-span-2 self-center">
            <div className=" p-4  space-y-5">
              <img
                ref={avartarRef}
                src={account?.avatar as string}
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
          {/*  */}
        </div>

        <div className="block-button lg:mt-5 mt-3">
          <button disabled={isLoadSubmit} className="button-main">
            {isLoadSubmit ? <ButtonLoading /> : "Lưu"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeAccount;
