import { IProduct } from "@/interfaces/product";
import { formatMoney } from "@/lib/utils";
import { Link } from "react-router-dom";

const ProductItem = ({ product }: { product: IProduct }) => {
  return (
    <>
      <Link
        to={`/shop/${product.slug}`}
        className="product-item grid-type cursor-pointer"
      >
        <div className="product-main  block">
          <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
            <div className=" product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-50">
              New
            </div>
            <div className="product-img w-full h-full aspect-[3/4] pt-3 ">
              <img
                className="w-full h-full object-cover duration-700"
                src={product?.images?.[0]}
                alt="img"
              />
              <img
                className="w-full h-full object-cover duration-700"
                src={product?.images?.[1]}
                alt="img"
              />
            </div>
          </div>
          <div className="product-infor mt-4 lg:mb-7">
            <div className="product-name text-title duration-300">
              {product?.name}
            </div>
            <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
              <div className="product-price text-title">
                {formatMoney(product?.price || 0)}
              </div>
              {/* <div className="product-origin-price caption1 text-gray-500">
                <del>$50.00</del>
              </div>
              <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                -20%
              </div> */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductItem;
