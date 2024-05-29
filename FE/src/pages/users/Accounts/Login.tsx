import { loginAccount } from "@/api/customer";
import ButtonLoading from "@/components/ButtonLoading";
import { useFacebookLogin, useGoogleLogin } from "@/firebase/handle";
import { ICustomer } from "@/interfaces/customer";
import { ToastError, ToastSuccess } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumd from "../Breadcrumd";

const Login = () => {
  const { loginGoogle } = useGoogleLogin();
  const { loginFacebook } = useFacebookLogin();
  const queryClient = useQueryClient();
  const [isLoadSubmit, setIsLoadSubmit] = useState(false);
  const [isRemerber, setIsRemerber] = useState(false);
  const navigate = useNavigate();
  const dataRegister = JSON.parse(
    sessionStorage.getItem("registerAccount") as string
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICustomer>({ defaultValues: dataRegister });
  const handleShowPassword = (e: MouseEvent<SVGSVGElement>) => {
    const elementTarget = e.target as HTMLElement;
    const passwordElement = document.querySelector(
      ".pass .password"
    ) as HTMLInputElement;
    const isSVGElement = elementTarget.closest("svg") as SVGElement;
    if (!isSVGElement?.className.baseVal.includes("lucide-eye-off")) {
      const eyeOff = isSVGElement.nextSibling as SVGElement;
      passwordElement.type = "text";
      isSVGElement.classList.add("hidden");
      eyeOff.classList.remove("hidden");
    } else {
      const eye = isSVGElement.previousSibling as SVGElement;
      passwordElement.type = "password";
      isSVGElement.classList.add("hidden");
      eye.classList.remove("hidden");
    }
  };
  const loginMutation = useMutation({
    mutationFn: async (newData: ICustomer) => {
      return await loginAccount(newData);
    },
    onSuccess: (respon) => {
      setIsLoadSubmit(false);
      if (isRemerber) {
        localStorage.setItem("token", respon.data.access_token);
      } else {
        sessionStorage.setItem("token", respon.data.access_token);
      }
      ToastSuccess("Đăng nhập thành công");
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["GET_ACCOUNT_BY_TOKEN"] });
    },
    onError: (err: AxiosError) => {
      setIsLoadSubmit(false);
      const { message } = err.response?.data as { message: string };
      ToastError(message as string);
    },
  });
  const onSubmit = (newData: ICustomer) => {
    setIsLoadSubmit(true);
    loginMutation.mutate(newData);
  };
  return (
    <>
      <Breadcrumd
        breadcrumbs={[{ title: "Trang chủ", urlLink: "/" }]}
        page="Đăng nhập"
      />
      <div className="login-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Đăng nhập</div>
              <form className="md:mt-7 mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="user-name ">
                  <input
                    className={` border ${
                      errors.user_name ? "border-red-500" : "border-gray-200 "
                    }  px-4 pt-3 pb-3 w-full rounded-lg`}
                    type="text"
                    placeholder="Tên đăng nhập *"
                    {...register("user_name", {
                      required: "Vui lòng nhập tên đăng nhập",
                    })}
                  />
                  {errors?.user_name && (
                    <span className="text-red-500">
                      {errors?.user_name.message}
                    </span>
                  )}
                </div>
                <div className="pass mt-5 ">
                  <div className="relative">
                    <input
                      className={` password border ${
                        errors.password ? "border-red-500" : "border-gray-200 "
                      }  px-4 pt-3 pb-3 w-full rounded-lg`}
                      type="password"
                      placeholder="Mật khẩu *"
                      {...register("password", {
                        required: "Vui lòng nhập Mật khẩu",
                        minLength: {
                          value: 6,
                          message: "Mật khẩu ít nhất là 6 ký tự",
                        },
                      })}
                    />

                    <Eye
                      onClick={handleShowPassword}
                      strokeWidth={1.5}
                      className="eye absolute  top-1/2 right-5 -translate-y-1/2 cursor-pointer"
                    />
                    <EyeOff
                      onClick={handleShowPassword}
                      strokeWidth={1.5}
                      className="absolute hidden top-1/2 right-5 -translate-y-1/2 cursor-pointer"
                    />
                  </div>
                  {errors?.password && (
                    <span className="text-red-500">
                      {errors?.password.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center">
                    <div className="block-input">
                      <input
                        onChange={(e) => setIsRemerber(e.target.checked)}
                        type="checkbox"
                        name="remember"
                        id="remember"
                      />
                      <i className="ph-fill ph-check-square icon-checkbox" />
                    </div>
                    <label htmlFor="remember" className="pl-2 cursor-pointer">
                      Ghi nhớ
                    </label>
                  </div>
                  <Link
                    to={"/buyer/forgot-password"}
                    className="font-semibold hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button
                    disabled={isLoadSubmit}
                    className="button-main w-full"
                  >
                    {isLoadSubmit ? <ButtonLoading /> : "Đăng nhập"}
                  </button>
                </div>
                <span className="flex items-center justify-center space-x-2 my-5">
                  <span className="font-normal text-gray-500">
                    Hoặc đăng nhập với
                  </span>
                </span>

                <div className="w-full flex items-center justify-center gap-5">
                  <button
                    onClick={loginGoogle}
                    type="button"
                    className="transition-colors focus:ring-2 p-3 disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      className="mdl-js"
                    >
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path
                          fill="#4285F4"
                          d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                        />
                        <path
                          fill="#34A853"
                          d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                        />
                        <path
                          fill="#EA4335"
                          d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                        />
                      </g>
                    </svg>
                  </button>
                  <button
                    onClick={loginFacebook}
                    type="button"
                    className="transition-colors focus:ring-2 p-2.5 disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
                  >
                    <img
                      className="object-cover size-[28px]"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/800px-Facebook_f_logo_%282019%29.svg.png?20231203063624"
                      alt=""
                    />
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
                  <Link to="/buyer/register" className="button-main">
                    Đăng ký
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
