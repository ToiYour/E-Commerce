import ButtonLoading from "@/components/ButtonLoading";
import { ToastError, ToastSuccess } from "@/lib/utils";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { changePassword, IChangePassword } from "@/services/auth";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IChangePassword>();
  const onSubmit = async (newData: IChangePassword) => {
    try {
      const { data } = await changePassword(newData);
      ToastSuccess(data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.message);
      }
    }
  };
  const newPasswordValue = watch("password");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-content w-full bg-white p-10 border border-gray-100   rounded shadow"
    >
      <div className="pb-4">
        <div className="text-2xl">Thay đổi mật khẩu</div>
        <p className="text-xs">Thay đổi mật khẩu để bảo mật tài khoản</p>
      </div>
      <div className="pass">
        <input
          {...register("oldPassword", {
            required: "Vui lòng nhập mật khẩu cũ",
            minLength: { value: 6, message: "Mật khẩu ít nhất 6 ký tự" },
          })}
          className="border border-gray-200 px-4 pt-3 pb-3 w-full rounded-lg"
          type="password"
          placeholder="Mật khẩu cũ*"
        />
        {errors.oldPassword && (
          <p className="text-red-500">{errors.oldPassword.message}</p>
        )}
      </div>
      <div className="new-pass mt-5">
        <input
          {...register("password", {
            required: "Vui lòng nhập mật khẩu mới",
            minLength: { value: 6, message: "Mật khẩu ít nhất 6 ký tự" },
          })}
          className="border border-gray-200 px-4 pt-3 pb-3 w-full rounded-lg"
          type="password"
          placeholder="Mật khẩu mới *"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password?.message}</p>
        )}
      </div>
      <div className="confirm-pass mt-5">
        <input
          {...register("confirmPassword", {
            required: "Vui lòng nhập xác nhận mật khẩu mới",
            minLength: { value: 6, message: "Mật khẩu ít nhất 6 ký tự" },
            validate: (value) =>
              value === newPasswordValue || "Mật khẩu xác nhận không khớp",
          })}
          className="border border-gray-200 px-4 pt-3 pb-3 w-full rounded-lg"
          id="confirmPassword"
          type="password"
          placeholder="Xác nhận mật khẩu *"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        )}
      </div>
      <div className="block-button lg:mt-10 mt-6">
        <button disabled={isSubmitting} type="submit" className="button-main">
          {isSubmitting ? <ButtonLoading /> : " Lưu"}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
