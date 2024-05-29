import { accountMe, logOut } from "@/api/customer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FeatureSearch from "./FeatureSearch";
import LoadingFixed from "@/components/LoadingFixed";
import { ICustomer } from "@/interfaces/customer";
import { AxiosError } from "axios";
import { ToastError } from "@/lib/utils";

const FeatureHeader = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);
  const handleLoginPopup = () => {
    const loginPopup = document.querySelector(
      "#header .login-popup"
    ) as HTMLElement;
    loginPopup.classList.toggle("open");
  };
  const handleLogOut = async () => {
    await logOut();
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
    queryClient.invalidateQueries({ queryKey: ["GET_ACCOUNT_BY_TOKEN"] });
  };
  const {
    data: account,
    isLoading,
    error,
  } = useQuery<ICustomer>({
    retryOnMount: false,
    retry: false,
    queryKey: ["GET_ACCOUNT_BY_TOKEN"],
    queryFn: async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        const { data } = await accountMe();
        return data.account;
      }
      return null;
    },
  });
  if (isLoading) {
    return <LoadingFixed />;
  }
  if (error) {
    const { response } = error as AxiosError<{ message: string }>;
    ToastError(response?.data.message as string);
    handleLogOut();
  }

  return (
    <div className="right flex gap-12">
      <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
        {/* <i className="" /> */}
        {isOpenModalSearch && (
          <FeatureSearch onUIModal={setIsOpenModalSearch} />
        )}
        <Search
          className="ph-bold ph-magnifying-glass "
          onClick={() => setIsOpenModalSearch(true)}
        />
        <div className="line absolute bg-gray-300 w-px h-6 -right-6" />
      </div>
      <div className="list-action flex items-center gap-4">
        {!account && (
          <div className="user-icon relative flex items-center justify-center cursor-pointer ">
            <User className="ph-bold ph-user " onClick={handleLoginPopup} />
            <div className="login-popup absolute top-8 -right-5 w-[320px] p-7 rounded-xl bg-white box-shadow-small">
              <Link
                to={"buyer/login"}
                onClick={handleLoginPopup}
                className="button-main w-full text-center"
              >
                Đăng nhập
              </Link>
              <div className="text-gray-500 text-center mt-3 pb-4">
                Bạn chưa có tài khoản?
                <Link
                  to={"buyer/register"}
                  onClick={handleLoginPopup}
                  className="text-black pl-1 hover:underline"
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        )}
        {/* Đã đăng nhập */}
        {account && (
          <div className="relative group">
            <div className="flex items-center gap-x-2 cursor-pointer ">
              <img
                src={account.avatar as string}
                alt=""
                className="size-8 object-cover rounded-full shadow-lg"
              />
              <span className="text-base font-medium">
                {`${account.name?.last_name} ${account.name?.first_name}` ||
                  account.user_name}
              </span>
            </div>
            <ul className="hidden group-hover:block absolute w-44 rounded top-10 right-3 *:px-3 *:py-1 *:cursor-pointer bg-gray-100 shadow-lg after:absolute after:-top-2 after:content-[''] after:right-0 after:left-0 after:h-5  before:absolute before:content-[''] before:size-3 before:border-t-transparent before:border-l-transparent before:border-r-transparent  before:border-8  before:border-b-gray-200 before:-top-4 before:right-5 ">
              <li className="hover:bg-white hover:text-green-400">
                <Link to={"/account/profile"}>Tài khoản của tôi</Link>
              </li>
              <li className="hover:bg-white hover:text-green-400">
                <Link to={"/account/purchase"}>Đơn mua</Link>
              </li>
              <li
                onClick={handleLogOut}
                className="hover:bg-white hover:text-green-400"
              >
                Đăng xuất
              </li>
            </ul>
          </div>
        )}

        <div className="max-md:hidden cart-icon flex items-center relative cursor-pointer">
          <ShoppingCart className="ph-bold ph-handbag" />
          <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-[#ee4d2d] w-4 h-4 flex items-center justify-center rounded-full">
            0
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureHeader;
