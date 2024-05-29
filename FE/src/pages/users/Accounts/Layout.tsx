import { accountMe, logOut } from "@/api/customer";
import LoadingFixed from "@/components/LoadingFixed";
import { ICustomer } from "@/interfaces/customer";
import { ToastError } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ClipboardList, User } from "lucide-react";
import {
  NavLink,
  Outlet,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import Breadcrumd from "../Breadcrumd";

const LayOutAccount = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
    logOut();
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
    queryClient.invalidateQueries({ queryKey: ["GET_ACCOUNT_BY_TOKEN"] });
    ToastError(response?.data.message as string);
  }
  const closeDetails = () => {
    const details = document.querySelector("details") as HTMLDetailsElement;
    details.open = false;
  };
  return (
    <>
      <Breadcrumd
        breadcrumbs={[{ title: "Trang chủ", urlLink: "/" }]}
        page="Tài khoản của tôi"
      />
      <div className="my-account-block md:py-20 py-10 bg-white">
        <div className="container">
          <div className="content-main grid grid-cols-8 gap-5">
            <div className=" col-span-8 md:col-span-2">
              <div className="user-infor  md:px-8 px-5 md:py-10 py-6 md:rounded-[20px] rounded-xl">
                <div className="heading flex flex-col items-center justify-center">
                  <div className="avatar">
                    <img
                      src={account?.avatar as string}
                      alt="avatar"
                      className="size-24 rounded-full object-cover"
                    />
                  </div>
                  <div className="name heading6 mt-4 text-center">
                    {`${account?.name?.last_name} ${account?.name?.first_name}` ||
                      account?.user_name}
                  </div>
                  <div className="mail text-base font-normal normal-case text-center mt-1">
                    {account?.email}
                  </div>
                </div>
                <div className="menu-tab lg:mt-10 mt-6">
                  <details
                    open={
                      location.pathname == "/account/profile" ||
                      location.pathname == "/account/password"
                    }
                  >
                    <summary className="item px-5 py-1.5 flex items-center gap-1 cursor-pointer ">
                      <User color="#0449b0" size={20} />
                      <div className="text-base">Tài khoản của tôi</div>
                    </summary>
                    <article className="ml-14">
                      <ul>
                        <li>
                          <NavLink to={"/account/profile"} className={"item"}>
                            Hồ sơ
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={"/account/address"} className={"item"}>
                            Địa chỉ
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={"/account/password"} className={"item"}>
                            Đổi mật khẩu
                          </NavLink>
                        </li>
                      </ul>
                    </article>
                  </details>
                  <NavLink
                    onClick={closeDetails}
                    to={"/account/purchase"}
                    className="item px-5 py-1.5 flex items-center gap-1 cursor-pointer "
                  >
                    <ClipboardList color="#0449b0" size={20} />
                    <div className="text-base">Đơn mua</div>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-span-8 md:col-span-6  ">
              <Outlet context={account} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayOutAccount;
export function useAccount() {
  return useOutletContext<ICustomer>();
}
