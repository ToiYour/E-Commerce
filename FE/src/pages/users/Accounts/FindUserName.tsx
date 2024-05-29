import { forgotPassWord } from "@/api/customer";
import ButtonLoading from "@/components/ButtonLoading";
import { ICustomer } from "@/interfaces/customer";
import { ToastError, ToastSuccess } from "@/lib/utils";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
interface IFindUserName {
  user_name: string;
}
interface IPropsFindUserName {
  setStep: (val: number) => void;
  setUser: (user: ICustomer) => void;
}
export const FindUserName = ({ setStep, setUser }: IPropsFindUserName) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IFindUserName>();
  const onSubmit = async (newData: IFindUserName) => {
    try {
      const { data } = await forgotPassWord(newData);
      setUser(data?.user);
      ToastSuccess(data?.message);
      setStep(2);
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.message);
      }
    }
  };
  return (
    <div className="forgot-pass md:py-20 py-10">
      <div className="container">
        <div className="content-main flex gap-y-8 max-md:flex-col">
          <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-gray-200">
            <div className="heading4">Tìm tài khoản của bạn</div>
            <div className="body1 mt-2">
              Chúng tôi sẽ gửi cho bạn một email xác thực OTP để đặt lại mật
              khẩu của bạn
            </div>
            <form className="md:mt-7 mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="user_name ">
                <input
                  {...register("user_name", {
                    required: "Vui lòng nhập tên đăng nhập của bạn",
                  })}
                  className="border-gray-200 px-4 pt-3 pb-3 w-full rounded-lg"
                  id="user_name"
                  type="text"
                  placeholder="Tên đăng nhập"
                />
                {errors.user_name && (
                  <p className="text-red-500">{errors?.user_name?.message}</p>
                )}
              </div>
              <div className="block-button md:mt-7 mt-4">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="button-main"
                >
                  {isSubmitting ? <ButtonLoading /> : "Tìm kiếm"}
                </button>
              </div>
            </form>
          </div>
          <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
            <div className="text-content">
              <div className="heading4">Khách hàng mới</div>
              <div className="mt-2 text-gray-500">
                Tham gia với chúng tôi ngay hôm nay và mở ra một thế giới gồm
                những lợi ích, ưu đãi và những trải nghiệm được cá nhân hóa.
              </div>
              <div className="block-button md:mt-7 mt-4">
                <Link to={"/buyer/register"} className="button-main">
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
