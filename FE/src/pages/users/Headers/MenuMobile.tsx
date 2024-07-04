import { ICategory } from "@/interfaces/category";
import { getComboboxCategory } from "@/services/category";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import FeatureSearchMobile from "./FeatureSearchMobile";
import { Link } from "react-router-dom";

const MenuMobile = ({
  onhandleMenuMobile,
  onhandleSubMenuMobile,
}: {
  onhandleMenuMobile: () => void;
  onhandleSubMenuMobile: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const queryClient = useQueryClient();
  useEffect(() => {
    (async () => {
      const data = await queryClient.ensureQueryData({
        queryKey: ["GET_CATEGORYS_HOME"],
        queryFn: async () => {
          const { data } = await getComboboxCategory();
          return data.data as ICategory[];
        },
      });
      setCategorys(data);
    })();
  }, [queryClient]);
  return (
    <div className="menu-container bg-white h-full">
      <div className="container h-full">
        <div className="menu-main h-full overflow-hidden">
          <div className="heading py-2 relative flex items-center justify-center">
            <div className="close-menu-mobile-btn absolute right-0 cursor-pointer top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <X onClick={onhandleMenuMobile} strokeWidth={1} size={16} />
            </div>
            <Link to="/" className="logo text-3xl font-semibold text-center">
              Toinh
            </Link>
          </div>
          <FeatureSearchMobile onHandleClick={onhandleMenuMobile} />
          <div className="list-nav mt-6">
            <ul>
              <li>
                <Link
                  to="/"
                  onClick={onhandleMenuMobile}
                  className="text-xl font-semibold flex items-center justify-between"
                >
                  Trang chủ
                </Link>
              </li>
              <li className="">
                <Link
                  onClick={onhandleMenuMobile}
                  to="/shop"
                  className="text-xl font-semibold flex items-center justify-between mt-5"
                >
                  Sản phẩm
                  <span className="text-right" onClick={onhandleSubMenuMobile}>
                    <ChevronRight strokeWidth={1} size={20} />
                  </span>
                </Link>
                <div className="sub-nav-mobile">
                  <div
                    onClick={onhandleSubMenuMobile}
                    className="back-btn flex items-center gap-3 cursor-pointer"
                  >
                    <ChevronLeft strokeWidth={1} size={20} />
                    Thoát
                  </div>
                  <div className="list-nav-item w-full pt-2 pb-6">
                    <div className="nav-link grid grid-cols-2 gap-5 gap-y-6">
                      <div className="nav-item">
                        <ul>
                          {categorys?.map((category) => (
                            <li key={category._id}>
                              <a
                                href="blog-default.html"
                                className="link text-gray-500 duration-300"
                              >
                                {category.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
