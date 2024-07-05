import { useAuth } from "@/hooks/auth";
import { useAddToCartOrBuyNow } from "@/hooks/cart";
import { useCurrentRouteAndNavigation } from "@/hooks/router";
import { IProduct } from "@/interfaces/product";
import { IVariantsDetail } from "@/interfaces/variant";
import { cn, formatMoney } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import ListColor from "./ListColor";
import ListSize from "./ListSize";
import Overview from "./Overview";
import Quantity from "./Quantity";
import ButtonLoading from "@/components/ButtonLoading";
interface IPropsDetailProduct {
  product: IProduct;
}
const InfoDetailProduct = ({ product }: IPropsDetailProduct) => {
  const { isLoggedIn } = useAuth();
  const { handleAddToCartOrBuyNow, loading } = useAddToCartOrBuyNow();
  const currentRouteAndNavigation = useCurrentRouteAndNavigation();

  const [totalQuantity, setTotalQuantity] = useState(product.totalStock);
  const [isBuys, setIsBuys] = useState(false);
  const [extraPrice, setExtraPrice] = useState(0);
  const [chooseColorId, setChooseColorId] = useState("");
  const [chooseSizeId, setChooseSizeId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useMemo(() => {
    setTotalQuantity(product.totalStock);
  }, [product.totalStock]);

  useEffect(() => {
    const listSizeExist = [""];
    const listColorExist = [""];
    product.variants.forEach((variant) => {
      handleSizeDisabled(variant, listSizeExist);
      handleColorDisabled(variant, listColorExist);
    });
    handlePriceAndQuantity(product.variants);
    isBuys && handleIsValidVariant();
  }, [chooseSizeId, chooseColorId]);

  const handleSizeDisabled = (
    variant: IVariantsDetail,
    listSizeExist: string[]
  ) => {
    const elementLabelSize = document.querySelector(
      `label[for="${variant.sizeId?._id}"]`
    ) as HTMLLabelElement;

    if (chooseColorId !== "") {
      if (variant.colorId?._id === chooseColorId) {
        elementLabelSize.classList.remove("disabled");
        listSizeExist.push(variant.sizeId?._id as string);
      } else if (
        variant.colorId?._id !== chooseColorId &&
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
    ) as HTMLLabelElement;

    if (chooseSizeId !== "") {
      if (variant.sizeId?._id === chooseSizeId) {
        elementLabelColor.classList.remove("disabled");
        listColorExist.push(variant.colorId?._id as string);
      } else if (
        variant.sizeId?._id !== chooseSizeId &&
        !listColorExist.includes(variant.colorId?._id as string)
      ) {
        elementLabelColor && elementLabelColor.classList.add("disabled");
      }
    }
  };

  const handlePriceAndQuantity = (variants: IVariantsDetail[]) => {
    if (chooseColorId !== "" && chooseSizeId !== "") {
      const quantityBlock = document.querySelector(
        ".choose-quantity .quantity-block"
      ) as HTMLElement;
      const inputChooseQuantity = quantityBlock.querySelector(
        ".quantity"
      ) as HTMLInputElement;
      const minusQuantity = quantityBlock.querySelector(
        ".minus"
      ) as HTMLElement;
      const plusQuantity = quantityBlock.querySelector(".plus") as HTMLElement;

      const chooseVariant = variants.find(
        (v) =>
          v.colorId?._id === chooseColorId && v.sizeId?._id === chooseSizeId
      );
      inputChooseQuantity.value = "1";
      !minusQuantity.classList.contains("disabled") &&
        minusQuantity.classList.add("disabled");
      plusQuantity.classList.contains("disabled") &&
        plusQuantity.classList.remove("disabled");
      setTotalQuantity(chooseVariant?.stock || 0);
      setExtraPrice(chooseVariant?.extra_price || 0);
    }
  };

  const handleIsValidVariant = () => {
    const chooseWrapper = document.querySelector(
      ".list-action .choose-wrapper"
    ) as HTMLDivElement;
    if (chooseColorId === "" || chooseSizeId === "") {
      chooseWrapper.classList.add("error");
      return false;
    } else {
      chooseWrapper.classList.remove("error");
      return true;
    }
  };

  const handleBuysNowOrAddToCart = (action: string) => {
    setIsBuys(true);
    if (isLoggedIn) {
      const isChooseCategory = handleIsValidVariant();
      if (isChooseCategory) {
        handleAddToCartOrBuyNow(action, {
          colorId: chooseColorId,
          sizeId: chooseSizeId,
          quantity: quantity || 0,
        });
        setIsBuys(false);
      }
    } else {
      setIsBuys(false);
      currentRouteAndNavigation();
    }
  };
  return (
    <div className="product-item cursor-default product-infor col-span-5 w-full lg:pl-[15px] md:pl-2">
      <div className="flex justify-between">
        <div>
          <div className="product-category caption2 text-gray-500 font-semibold uppercase">
            Danh mục: {product?.category?.[0]?.name as string}
          </div>
          <div className="product-name text-xl mt-1">{product.name}</div>
        </div>
      </div>

      <Overview
        sold={product?.sold}
        views={product?.views || 0}
        numberOfReviews={product?.averageRating?.numberOfReviews}
        totalScore={product?.averageRating?.totalScore}
      />

      <div className=" mt-5 pb-6 border-b border-line">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="product-price heading5">
            {formatMoney(Number(product?.price) + extraPrice || 0)}
          </div>
          <div className="w-px h-4 bg-line" />
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
            />
          </div>
          <div className="mt-5 flex items-end md:items-center gap-3">
            <Quantity
              maxTotal={totalQuantity as number}
              setQuantity={setQuantity}
            />
            <span className=" text-[#757575]">
              {totalQuantity} sản phẩm có sẵn
            </span>
          </div>
          <p className="choose-wrapper-message hidden text-red-500 mt-2 ml-24 pl-1">
            Vui lòng chọn Phân loại hàng
          </p>
          <p
            className={cn(
              "hidden   text-red-500 mt-2 ml-24 pl-1",
              Number(product?.totalStock || totalQuantity) <= 0 && "block"
            )}
          >
            Sản phẩm tạm thời hết hàng!
          </p>
        </div>
        <div
          className={cn(
            "flex flex-col md:flex-row justify-start md:items-center mt-8 gap-5",
            Number(totalQuantity) <= 0 && "pointer-events-none opacity-40"
          )}
        >
          <div
            onClick={() => handleBuysNowOrAddToCart("addTocart")}
            className="cursor-pointer flex justify-center max-h-12 gap-x-2 px-5 py-3 capitalize border border-[#db4444] text-[#db4444] bg-[#ff57221a]"
          >
            {loading ? (
              <ButtonLoading />
            ) : (
              <>
                <ShoppingCart strokeWidth={1.3} color="#db4444" size={24} />
                <span className="text-base">Thêm vào giỏ hàng</span>
              </>
            )}
          </div>
          <div
            onClick={() => handleBuysNowOrAddToCart("buyNow")}
            className="px-5 py-3 max-h-12 capitalize text-white text-base bg-[#ee4d2d] text-center cursor-pointer"
          >
            {loading ? <ButtonLoading /> : "Mua ngay"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(InfoDetailProduct);
