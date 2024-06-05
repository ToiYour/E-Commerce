import { resetPassword } from "@/services/customer";
import ButtonLoading from "@/components/ButtonLoading";
import { ICustomer } from "@/interfaces/customer";
import { ToastError, ToastSuccess } from "@/lib/utils";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
interface IResetPassword {
  password: string;
  confirmPassword?: string;
}
interface IPropsResetPassword {
  user: ICustomer;
  setStep: (val: number) => void;
}
const ResetPassword = ({ user, setStep }: IPropsResetPassword) => {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IResetPassword>();
  const comparePassword = watch("password");

  const onSubmit = async (newPass: IResetPassword) => {
    try {
      const { data } = await resetPassword({
        userId: user?._id as string,
        password: newPass.password,
      });
      setStep(1);
      ToastSuccess(data?.message);
      navigate("/buyer/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.message);
      }
    }
  };
  return (
    <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
      <div className="my-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Đặt lại mật khẩu
            </h1>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <p className="  text-red-600 mt-2">
                      {errors.password.message}
                    </p>
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
                          value == comparePassword ||
                          "Mật khẩu xác nhận không khớp",
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
                    <p className="text-red-500">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  {isSubmitting ? <ButtonLoading /> : "Đặt lại mật khẩu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
