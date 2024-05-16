import { getAllCategory } from "@/api/categorys";
import { ICategory } from "@/interfaces/category";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

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
          const { data } = await getAllCategory("");
          return data.data.docs as ICategory[];
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
            <div className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <X onClick={onhandleMenuMobile} strokeWidth={1} size={16} />
            </div>
            <a
              href="index.html"
              className="logo text-3xl font-semibold text-center"
            >
              Toinh
            </a>
          </div>
          <div className="form-search relative mt-2">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
              strokeWidth={1}
              size={18}
            />
            <input
              type="text"
              placeholder="What are you looking for?"
              className=" h-12 rounded-lg border border-gray-200 border-line text-sm w-full pl-10 pr-4"
            />
          </div>
          <div className="list-nav mt-6">
            <ul>
              <li>
                <a
                  href="#!"
                  className="text-xl font-semibold flex items-center justify-between"
                >
                  Trang chủ
                </a>
              </li>
              <li className="">
                <a
                  href="#!"
                  className="text-xl font-semibold flex items-center justify-between mt-5"
                >
                  Sản phẩm
                  <span className="text-right" onClick={onhandleSubMenuMobile}>
                    <ChevronRight strokeWidth={1} size={20} />
                  </span>
                </a>
                <div className="sub-nav-mobile">
                  <div
                    onClick={onhandleSubMenuMobile}
                    className="back-btn flex items-center gap-3"
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
                                className="link text-secondary duration-300"
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
              <li>
                <a
                  href="#!"
                  className="text-xl font-semibold flex items-center justify-between mt-5"
                >
                  Blog
                  <span className="text-right">
                    <i className="ph ph-caret-right text-xl" />
                  </span>
                </a>
                <div className="sub-nav-mobile">
                  <div className="back-btn flex items-center gap-3">
                    <i className="ph ph-caret-left text-xl" />
                    Back
                  </div>
                  <div className="list-nav-item w-full pt-2 pb-6">
                    <ul className="w-full">
                      <li>
                        <a
                          href="blog-default.html"
                          className="link text-secondary duration-300"
                        >
                          Blog Default
                        </a>
                      </li>
                      <li>
                        <a
                          href="blog-list.html"
                          className="link text-secondary duration-300"
                        >
                          Blog List
                        </a>
                      </li>
                      <li>
                        <a
                          href="blog-grid.html"
                          className="link text-secondary duration-300"
                        >
                          Blog Grid
                        </a>
                      </li>
                      <li>
                        <a
                          href="blog-detail1.html"
                          className="link text-secondary duration-300"
                        >
                          Blog Detail 1
                        </a>
                      </li>
                      <li>
                        <a
                          href="blog-detail2.html"
                          className="link text-secondary duration-300"
                        >
                          Blog Detail 2
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-xl font-semibold flex items-center justify-between mt-5"
                >
                  Pages
                  <span className="text-right">
                    <i className="ph ph-caret-right text-xl" />
                  </span>
                </a>
                <div className="sub-nav-mobile">
                  <div className="back-btn flex items-center gap-3">
                    <i className="ph ph-caret-left text-xl" />
                    Back
                  </div>
                  <div className="list-nav-item w-full pt-2 pb-6">
                    <ul className="w-full">
                      <li>
                        <a
                          href="about.html"
                          className="link text-secondary duration-300"
                        >
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="contact.html"
                          className="link text-secondary duration-300"
                        >
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="store-list.html"
                          className="link text-secondary duration-300"
                        >
                          Store List
                        </a>
                      </li>
                      <li>
                        <a
                          href="page-not-found.html"
                          className="link text-secondary duration-300"
                        >
                          404
                        </a>
                      </li>
                      <li>
                        <a
                          href="faqs.html"
                          className="link text-secondary duration-300"
                        >
                          FAQs
                        </a>
                      </li>
                      <li>
                        <a
                          href="coming-soon.html"
                          className="link text-secondary duration-300"
                        >
                          Coming Soon
                        </a>
                      </li>
                      <li>
                        <a
                          href="customer-feedbacks.html"
                          className="link text-secondary duration-300"
                        >
                          Customer Feedbacks
                        </a>
                      </li>
                    </ul>
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
