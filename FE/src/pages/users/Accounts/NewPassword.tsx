import ButtonLoading from "@/components/ButtonLoading";
import { ToastError, ToastSuccess } from "@/lib/utils";
import { setAPasswordForTheLinkedAccount } from "@/services/auth";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
interface IResetPassword {
  password: string;
  confirmPassword: string;
}
const NewPassword = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IResetPassword>();
  const comparePassword = watch("password");

  const onSubmit = async (newPass: IResetPassword) => {
    try {
      const { data } = await setAPasswordForTheLinkedAccount(newPass);
      ToastSuccess(data?.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.message);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-content w-full bg-white p-10 border border-gray-100   rounded shadow"
    >
      <div className="pb-4">
        <div className="text-2xl">Đặt mật khẩu</div>
        <p className="text-xs">
          *Do bạn đăng nhập bằng liên kết nên bạn cần đặt mật khẩu cho tài khoản
          của mình
        </p>
      </div>
      <div className="grid gap-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-bold ml-1 mb-2 dark:text-white"
          >
            Mật khẩu mới
          </label>
          <div className="relative pass">
            <input
              className={` password border ${
                errors.password ? "border-red-500" : "border-gray-200 "
              }  px-4 pt-3 pb-3 w-full rounded-lg`}
              type={showPass ? "text" : "password"}
              placeholder="Mật khẩu mới *"
              {...register("password", {
                required: "Vui lòng nhập Mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu ít nhất là 6 ký tự",
                },
              })}
            />

            <Eye
              onClick={() => setShowPass((prev) => !prev)}
              strokeWidth={1.5}
              className="eye absolute  top-1/2 right-5 -translate-y-1/2 cursor-pointer"
            />
            <EyeOff
              onClick={() => setShowPass((prev) => !prev)}
              strokeWidth={1.5}
              className="absolute hidden top-1/2 right-5 -translate-y-1/2 cursor-pointer"
            />
          </div>
          {errors.password && (
            <p className="  text-red-600 mt-2">{errors.password.message}</p>
          )}
        </div>
        <div className="confirm-pass mt-5">
          <label
            htmlFor="email"
            className="block text-sm font-bold ml-1 mb-2 dark:text-white"
          >
            Xác nhận mật khẩu mới
          </label>
          <div className="relative pass">
            <input
              {...register("confirmPassword", {
                required: "Vui lòng nhập xác nhận mật khẩu mới",
                minLength: {
                  value: 6,
                  message: "Mật khẩu ít nhất 6 ký tự",
                },
                validate: (value) =>
                  value == comparePassword || "Mật khẩu xác nhận không khớp",
              })}
              className="border border-gray-200 px-4 pt-3 pb-3 w-full rounded-lg"
              id="confirmPassword"
              type={showPass2 ? "text" : "password"}
              placeholder="Xác nhận mật khẩu *"
            />
            <Eye
              onClick={() => setShowPass2((prev) => !prev)}
              strokeWidth={1.5}
              className="eye absolute  top-1/2 right-5 -translate-y-1/2 cursor-pointer"
            />
            <EyeOff
              onClick={() => setShowPass2((prev) => !prev)}
              strokeWidth={1.5}
              className="absolute hidden top-1/2 right-5 -translate-y-1/2 cursor-pointer"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          {isSubmitting ? <ButtonLoading /> : "Đặt mật khẩu"}
        </button>
      </div>
    </form>
  );
};

export default NewPassword;
