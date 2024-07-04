import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IProduct } from "@/interfaces/product";
import { formatMoney } from "@/lib/utils";
import { Link, useLoaderData } from "react-router-dom";

const Detail = () => {
  const detailProduct = useLoaderData() as IProduct;
  return (
    <div className="sm:px-6 sm:py-0">
      <Breadcrumb className="hidden md:flex mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/admin"}>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/admin/products"}>Sản phẩm</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Chi tiết sản phẩm</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <div className="lg:flex gap-10 lg:items-center">
            <div className="w-full space-y-12 lg:w-1/2 ">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
                  {detailProduct.name}
                </h1>
                <div className="mt-2">
                  <span className="inline-block w-40 h-1 rounded-full bg-blue-500" />
                  <span className="inline-block w-3 h-1 ml-1 rounded-full bg-blue-500" />
                  <span className="inline-block w-1 h-1 ml-1 rounded-full bg-blue-500" />
                </div>
              </div>
              <div className="md:flex md:items-start md:-mx-4">
                <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </span>
                <div className="mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                    Thông tin cơ bản
                  </h1>
                  <ul className="mt-3 text-gray-500 dark:text-gray-300">
                    <li>
                      <span className="font-medium">Danh mục</span>:{" "}
                      {detailProduct.category?.[0]?.name as string}
                    </li>
                    <li>
                      <span className="font-medium">Thương hiệu</span>:{" "}
                      {detailProduct.brand as string}
                    </li>
                    <li>
                      <span className="font-medium">Giá cơ bản</span>:{" "}
                      {formatMoney(detailProduct.price || 0)}
                    </li>
                    <li>
                      <span className="font-medium">Số lượt xem</span>:{" "}
                      {detailProduct.views}
                    </li>
                    <li>
                      <span className="font-medium">Tổng số lượng: </span>
                      {detailProduct.totalStock} sản phẩm
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:flex md:items-start md:-mx-4">
                <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </span>
                <div className="mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                    Biến thể sản phẩm ({detailProduct.variants.length || 0})
                  </h1>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                      <thead className="ltr:text-left rtl:text-right">
                        <tr>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Màu
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Size
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Giá
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Số lượng
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-center">
                        {detailProduct.variants.map((variant) => (
                          <tr key={variant._id}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              {variant.colorId?.name}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {variant.sizeId?.name}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {formatMoney(variant.extra_price || 0)}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {variant.stock}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center">
              <Carousel className="w-3/4">
                <CarouselContent>
                  {detailProduct.images?.map((image, index) => (
                    <CarouselItem key={index}>
                      <img
                        className="w-full h-full object-cover rounded"
                        src={image}
                        alt=""
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detail;
