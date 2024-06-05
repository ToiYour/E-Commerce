import LoadingFixed from "@/components/LoadingFixed";
import { ICategory } from "@/interfaces/category";
import { getComboboxCategory } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink } from "react-router-dom";

const MenuMain = () => {
  const { data: categorys, isLoading } = useQuery<ICategory[]>({
    queryKey: ["GET_CATEGORYS_HOME"],
    queryFn: async () => {
      const { data } = await getComboboxCategory();
      return data.data as ICategory[];
    },
  });
  if (isLoading) {
    return <LoadingFixed />;
  }
  return (
    <div className="menu-main h-full max-lg:hidden">
      <ul className="flex items-center gap-8 h-full">
        <li className="h-full relative">
          <NavLink
            to={"/"}
            end
            className="text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 "
          >
            Trang chủ
          </NavLink>
        </li>
        <li className="h-full relative">
          <NavLink
            to={"/shop"}
            className="text-button-uppercase duration-300 h-full flex items-center justify-center"
          >
            Sản phẩm
          </NavLink>
          <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
            <ul className="w-full">
              {categorys?.map(
                (category) =>
                  category.status && (
                    <li key={category._id}>
                      <Link
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "auto" })
                        }
                        to={"/shop?category=" + category.slug}
                        className="link text-gray-500 duration-300"
                      >
                        {category.name}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </div>
        </li>
        <li className="h-full relative">
          <a
            href="#!"
            className="text-button-uppercase duration-300 h-full flex
                                    items-center justify-center"
          >
            Blog
          </a>
          <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
            <ul className="w-full">
              <li>
                <a
                  href="blog-default.html"
                  className="link text-gray-500 duration-300"
                >
                  Blog Default
                </a>
              </li>
              <li>
                <a
                  href="blog-list.html"
                  className="link text-gray-500 duration-300"
                >
                  Blog List
                </a>
              </li>
              <li>
                <a
                  href="blog-grid.html"
                  className="link text-gray-500 duration-300"
                >
                  Blog Grid
                </a>
              </li>
              <li>
                <a
                  href="blog-detail1.html"
                  className="link text-gray-500 duration-300"
                >
                  Blog Detail 1
                </a>
              </li>
              <li>
                <a
                  href="blog-detail2.html"
                  className="link text-gray-500 duration-300"
                >
                  Blog Detail 2
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="h-full relative">
          <a
            href="#!"
            className="text-button-uppercase duration-300 h-full flex
                                    items-center justify-center"
          >
            Pages
          </a>
          <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
            <ul className="w-full">
              <li>
                <a
                  href="about.html"
                  className="link text-gray-500 duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="contact.html"
                  className="link text-gray-500 duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="store-list.html"
                  className="link text-gray-500
                                                duration-300"
                >
                  Store List
                </a>
              </li>
              <li>
                <a
                  href="page-not-found.html"
                  className="link text-gray-500
                                                duration-300"
                >
                  404
                </a>
              </li>
              <li>
                <a href="faqs.html" className="link text-gray-500 duration-300">
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="coming-soon.html"
                  className="link text-gray-500
                                                duration-300"
                >
                  Coming Soon
                </a>
              </li>
              <li>
                <a
                  href="customer-feedbacks.html"
                  className="link text-gray-500
                                                duration-300"
                >
                  Customer Feedbacks
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MenuMain;
