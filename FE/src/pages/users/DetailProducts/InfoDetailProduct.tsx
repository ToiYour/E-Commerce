import { IProduct } from "@/interfaces/product";
import { IVariantsDetail } from "@/interfaces/variant";
import { formatMoney } from "@/lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import { memo, useEffect, useState } from "react";
import ListColor from "./ListColor";
import ListSize from "./ListSize";
import Quantity from "./Quantity";
interface IPropsDetailProduct {
  product: IProduct;
}
const InfoDetailProduct = ({ product }: IPropsDetailProduct) => {
  const [quantity, setQuantity] = useState(product.totalStock);
  const [extraPrice, setExtraPrice] = useState(0); // Giá biến thể sản phẩm
  const [chooseColorId, setChooseColorId] = useState(""); // Id màu biến thể sản phẩm
  const [chooseSizeId, setChooseSizeId] = useState(""); //Id size biến thể sản phẩm
  useEffect(() => {
    const listSizeExist = [""];
    const listColorExist = [""];
    product.variants.forEach((variant) => {
      handleSizeDisabled(variant, listSizeExist);
      handleColorDisabled(variant, listColorExist);
    });
    handlePriceAndQuantity(product.variants);
  }, [chooseSizeId, chooseColorId]);
  const handleSizeDisabled = (
    variant: IVariantsDetail,
    listSizeExist: string[]
  ) => {
    const elementLabelSize = document.querySelector(
      `label[for="${variant.sizeId?._id}"]`
    ) as HTMLLabelElement;

    if (chooseColorId != "") {
      if (variant.colorId?._id == chooseColorId) {
        elementLabelSize.classList.remove("disabled");
        listSizeExist.push(variant.sizeId?._id as string);
      } else if (
        variant.colorId?._id != chooseColorId &&
        !listSizeExist.includes(variant.sizeId?._id as string)
      ) {
        elementLabelSize && elementLabelSize.classList.add("disabled");
      }
    }
  };
  const handleColorDisabled = (
    variant: IVariantsDetail,
    listColorExist: string[]
  ) => {
    const elementLabelColor = document.querySelector(
      `label[for="${variant.colorId?._id}"]`
    ) as HTMLLabelElement; // element label màu sắc

    if (chooseSizeId != "") {
      // nếu chooseSizeId được chọn thì sét điều kiện if
      if (variant.sizeId?._id == chooseSizeId) {
        elementLabelColor.classList.remove("disabled");
        listColorExist.push(variant.colorId?._id as string);
      } else if (
        variant.sizeId?._id != chooseSizeId &&
        !listColorExist.includes(variant.colorId?._id as string)
      ) {
        elementLabelColor && elementLabelColor.classList.add("disabled");
      }
    }
  };
  const handlePriceAndQuantity = (variants: IVariantsDetail[]) => {
    if (chooseColorId != "" && chooseSizeId != "") {
      const quantityBlock = document.querySelector(
        ".choose-quantity .quantity-block "
      ) as HTMLElement;
      const inputChooseQuantity = quantityBlock.querySelector(
        ".quantity"
      ) as HTMLInputElement;
      const minusQuantity = quantityBlock.querySelector(
        ".minus"
      ) as HTMLElement;
      const plusQuantity = quantityBlock.querySelector(".plus") as HTMLElement;
      const chooseVariant = variants.find(
        (v) => v.colorId?._id == chooseColorId && v.sizeId?._id == chooseSizeId
      );
      inputChooseQuantity.value = "1";
      !minusQuantity.classList.contains("disabled") &&
        minusQuantity.classList.add("disabled");
      plusQuantity.classList.contains("disabled") &&
        plusQuantity.classList.remove("disabled");
      setQuantity(chooseVariant?.stock);
      setExtraPrice(chooseVariant?.extra_price as number);
    }
  };
  const handleIsValidVariant = () => {
    const chooseWrapper = document.querySelector(
      ".list-action .choose-wrapper"
    ) as HTMLDivElement;
    if (chooseColorId == "" && chooseSizeId == "") {
      chooseWrapper.classList.add("error");
    } else chooseWrapper.classList.remove("error");
  };
  return (
    <div className="product-item cursor-default product-infor col-span-5 w-full lg:pl-[15px] md:pl-2">
      <div className="flex justify-between">
        <div>
          <div className="product-category caption2 text-gray-500 font-semibold uppercase">
            Danh mục: {product?.category?.[0]?.name as string}
          </div>
          <div className="product-name heading4 mt-1">{product.name}</div>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3">
        <div className="rate flex">
          <Star fill="#ecb018" strokeWidth={0} size={16} />
          <Star fill="#ecb018" strokeWidth={0} size={16} />
          <Star fill="#ecb018" strokeWidth={0} size={16} />
          <Star fill="#ecb018" strokeWidth={0} size={16} />
          <Star fill="#dfdedd" strokeWidth={0} size={16} />
        </div>
        <span className="caption1 text-gray-500">(1.234 đánh giá)</span>
      </div>
      <div className=" mt-5 pb-6 border-b border-line">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="product-price heading5">
            {formatMoney(Number(product?.price) + extraPrice || 0)}
          </div>
          <div className="w-px h-4 bg-line" />
          {/* <div className="product-origin-price font-normal text-gray-500">
            <del>$32.00</del>
          </div>
          <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
            -19%
          </div> */}
        </div>
        <div className="product-description text-gray-500 mt-3">
          {product.desc}
        </div>
      </div>
      <div className="list-action mt-6 space-y-10">
        <div className="choose-wrapper  p-2 ">
          <div className="choose-color flex flex-col md:flex-row md:items-center gap-5">
            <div className="text-title md:w-20">
              Màu sắc: <span className="text-title color" />
            </div>
            <ListColor
              varians={product.variants as IVariantsDetail[]}
              setColorId={setChooseColorId}
            />
          </div>
          <div className="choose-size mt-5 flex flex-col md:flex-row md:items-center gap-5">
            <div className="heading flex items-center justify-between">
              <div className="text-title md:w-20">
                Size: <span className="text-title size" />
              </div>
            </div>
            <ListSize
              varians={product.variants as IVariantsDetail[]}
              setSizeId={setChooseSizeId}
              isValidChooseSize={handleIsValidVariant}
            />
          </div>
          <div className="mt-5 flex items-end md:items-center gap-3">
            <Quantity maxTotal={quantity as number} />
            <span className=" text-[#757575]">{quantity} sản phẩm có sẵn</span>
          </div>
          <p className="choose-wrapper-message hidden text-red-500 mt-2 ml-24 pl-1">
            Vui lòng chọn Phân loại hàng
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-start md:items-center mt-8 gap-5">
          <div className="flex justify-center max-h-12 gap-x-2 px-5 py-3  capitalize border border-[#db4444] text-[#db4444] bg-[#ff57221a]">
            <ShoppingCart strokeWidth={1.3} color="#db4444" size={24} />{" "}
            <span
              onClick={handleIsValidVariant}
              className="text-base cursor-pointer"
            >
              Thêm vào giỏ hàng
            </span>
          </div>
          <div
            onClick={handleIsValidVariant}
            className="px-5 py-3 max-h-12 capitalize text-white text-base bg-[#ee4d2d] text-center cursor-pointer"
          >
            Mua ngay
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(InfoDetailProduct);
