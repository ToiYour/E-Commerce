import { getMaxPriceProduct } from "@/services/product";
import LoadingFixed from "@/components/LoadingFixed";
import { formatMoney, ToastError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
const FilterPrice = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let queryParams = { page: "1" };
  for (const [key, value] of searchParams.entries()) {
    queryParams = { ...queryParams, [key]: value };
  }
  const {
    data: maxPriceProduct,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["GET_FILTER_MAX_PRICE_PRODUCTS"],
    queryFn: async () => {
      const { data } = await getMaxPriceProduct();
      return data.data.price;
    },
  });

  useEffect(() => {
    handleProgressPrice();
  });
  const handleChangeMinPrice = useDebouncedCallback((value) => {
    setSearchParams({ ...queryParams, minPrice: value });
  }, 1000);
  const handleChangeMaxPrice = useDebouncedCallback((value) => {
    setSearchParams({ ...queryParams, maxPrice: value });
  }, 1000);
  const handleProgressPrice = () => {
    const rangeInput = document.querySelectorAll(
      ".range-input input"
    ) as NodeListOf<HTMLInputElement>;
    const progress = document.querySelector(
      ".tow-bar-block .progress"
    ) as HTMLElement;
    const minPrice = document.querySelector(".min-price") as Element;
    const maxPrice = document.querySelector(".max-price") as Element;

    const priceGap = 10;
    rangeInput.forEach((input) => {
      input.addEventListener("input", (e: Event) => {
        const elementTarget = e.target as HTMLElement;
        const minValue = parseInt(rangeInput[0].value, 10);
        const maxValue = parseInt(rangeInput[1].value, 10);

        if (maxValue - minValue < priceGap) {
          if (elementTarget.className === "range-min") {
            rangeInput[0].value = (maxValue - priceGap).toString();
          } else {
            rangeInput[1].value = (maxValue + priceGap).toString();
          }
        } else {
          progress.style.left =
            (minValue / (rangeInput[0].max as unknown as number)) * 100 + "%";
          progress.style.right =
            100 -
            (maxValue / (rangeInput[1].max as unknown as number)) * 100 +
            "%";
        }

        minPrice.innerHTML = formatMoney(minValue);
        maxPrice.innerHTML = formatMoney(maxValue);
      });
    });
  };
  if (isLoading) {
    return <LoadingFixed />;
  }
  if (isError) {
    ToastError("Sảy ra lỗi khi lấy giá sản phẩm cao nhất ");
  }
  return (
    <div className="filter-price pb-8 border-b border-line mt-8">
      <div className="heading6">Phạm vi giá</div>
      <div className="tow-bar-block mt-5">
        <div className="progress" />
      </div>
      <div className="range-input">
        <input
          onChange={(e) => handleChangeMinPrice(e.target.value)}
          className="range-min cursor-pointer"
          type="range"
          min={0}
          max={maxPriceProduct || 0}
          defaultValue={0}
        />
        <input
          onChange={(e) => handleChangeMaxPrice(e.target.value)}
          className="range-max cursor-pointer"
          type="range"
          min={0}
          max={maxPriceProduct || 0}
          defaultValue={maxPriceProduct || 0}
        />
      </div>
      <div className="price-block flex flex-col items-start justify-between  mt-4">
        <div className="min flex items-center gap-1">
          <div>Giá tối thiểu:</div>
          <div className="min-price">{formatMoney(0)} </div>
        </div>
        <div className="min flex items-center gap-1">
          <div>Giá tối đa:</div>
          <div className="max-price">{formatMoney(maxPriceProduct)}</div>
        </div>
      </div>
    </div>
  );
};

export default FilterPrice;
