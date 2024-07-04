import { useAuth, useLogout } from "@/hooks/auth";
import { cn, ToastError } from "@/lib/utils";
import { logOutAccount } from "@/services/auth";
import { AxiosError } from "axios";
import { Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartHeader from "./CartHeader";
import FeatureSearch from "./FeatureSearch";

const FeatureHeader = () => {
  const { authUser: account, isLoggedIn } = useAuth();
  const logOutSuccess = useLogout();
  const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);
  useEffect(() => {
    const closePopup = (event: Event) => {
      const element = event.target as HTMLElement;
      if (element.classList.contains("overlay-login-popup")) {
        element.classList.add("hidden");
      }
    };
    window.addEventListener("click", closePopup);
    return () => {
      removeEventListener("click", closePopup);
    };
  }, []);
  const handleLoginPopup = () => {
    const loginPopup = document.querySelector(
      "#header .login-popup"
    ) as HTMLElement;
    loginPopup.closest(".overlay-login-popup")?.classList.toggle("hidden");
  };
  const handleLogout = async () => {
    try {
      const { data } = await logOutAccount();
      logOutSuccess(data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error.response?.data.message);
      }
    }
  };
  return (
    <div className="right flex gap-12">
      <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
        {/* <i className="" /> */}
        {isOpenModalSearch && (
          <FeatureSearch onUIModal={setIsOpenModalSearch} />
        )}
        <div
          onClick={() => setIsOpenModalSearch(true)}
          className="p-1.5 rounded-full hover:bg-gray-50"
        >
          <Search className="ph-bold ph-magnifying-glass " />
        </div>
        <div className="line absolute bg-gray-300 w-px h-6 -right-6" />
      </div>
      <div className="list-action flex items-center gap-4">
        {!account && (
          <div className="user-icon relative flex items-center justify-center cursor-pointer ">
            <div
              onClick={handleLoginPopup}
              className="p-1.5 rounded-full hover:bg-gray-50"
            >
              <User className="ph-bold ph-user " />
            </div>
            <div className="overlay-login-popup fixed z-[1] inset-0 bg-transparent hidden">
              <div className="login-popup absolute z-10 top-20 right-8  w-[320px] p-7 rounded-xl bg-white box-shadow-small">
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
                    className="text-black pl-1 hover:underline w-full"
                  >
                    Đăng ký
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Đã đăng nhập */}
        {isLoggedIn && (
          <div className="relative group z-0">
            <div className="flex items-center gap-x-2 cursor-pointer ">
              <img
                src={account?.avatar as string}
                alt=""
                className="size-8 object-cover rounded-full "
              />
              <span className="text-base font-medium hidden md:flex">
                {`${account?.name?.last_name} ${account?.name?.first_name}` ||
                  account?.user_name ||
                  ""}
              </span>
            </div>
            <ul className="hidden group-hover:block absolute w-44 rounded top-10 right-3 *:px-3 *:py-1 *:cursor-pointer bg-gray-100 shadow-lg after:absolute after:-top-2 after:content-[''] after:right-0 after:left-0 after:h-5  before:absolute before:content-[''] before:size-3 before:border-t-transparent before:border-l-transparent before:border-r-transparent  before:border-8  before:border-b-gray-200 before:-top-4 before:right-5 ">
              <li className="hover:bg-white hover:text-green-400">
                <Link to={"/account/profile"} className="w-full block">
                  Tài khoản của tôi
                </Link>
              </li>
              <li
                className={cn(
                  !account?.role && "hidden",
                  "hover:bg-white hover:text-green-400"
                )}
              >
                <Link to={"/admin"} className="w-full block">
                  Trang quản trị
                </Link>
              </li>
              <li className="hover:bg-white hover:text-green-400">
                <Link to={"/account/purchase"} className="w-full block">
                  Đơn mua
                </Link>
              </li>

              <li
                onClick={handleLogout}
                className="hover:bg-white hover:text-green-400 w-full block"
              >
                Đăng xuất
              </li>
            </ul>
          </div>
        )}

        <CartHeader />
      </div>
    </div>
  );
};

export default FeatureHeader;
