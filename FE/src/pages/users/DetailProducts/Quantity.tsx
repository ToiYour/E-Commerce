import { cn, ToastWarning } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { ChangeEventHandler, memo, MouseEventHandler } from "react";

const Quantity = ({
  maxTotal,
  setQuantity,
}: {
  maxTotal: number;
  setQuantity: (val: number) => void;
}) => {
  const handleOnChangeQuantity: ChangeEventHandler<HTMLInputElement> = (e) => {
    const elementQuantityBlock = document.querySelector(
      ".quantity-block"
    ) as HTMLDivElement;
    const quantityElement = elementQuantityBlock.querySelector(
      ".quantity"
    ) as HTMLInputElement;
    const minus = elementQuantityBlock.querySelector(".minus") as HTMLElement;
    const plus = elementQuantityBlock.querySelector(".plus") as HTMLElement;
    const quantity = Number(e.target.value);
    if (quantity > maxTotal) {
      quantityElement.value = String(maxTotal);
      ToastWarning(`Rất tiếc, bạn chỉ có thể mua tối đa ${maxTotal} sản phẩm.`);
      plus.classList.add("disabled");
      if (minus.classList.contains("disabled")) {
        minus.classList.remove("disabled");
      }
    } else if (quantity < 1) {
      minus.classList.add("disabled");
      plus.classList.remove("disabled");
      quantityElement.value = "1";
    }
    if (quantity > 2) {
      minus.classList.contains("disabled") &&
        minus.classList.remove("disabled");
    } else {
      minus.classList.add("disabled");
    }
    setQuantity(quantity);
  };
  const handleQuantity: MouseEventHandler<HTMLDivElement> = (e) => {
    const elementTarget = e.target as HTMLElement;
    const isDivElement = elementTarget.closest("div");
    const minus = document.querySelector(
      ".quantity-block .minus"
    ) as HTMLElement;
    const plus = document.querySelector(".quantity-block .plus") as HTMLElement;
    const quantity = document.querySelector(
      ".quantity-block .quantity"
    ) as HTMLInputElement;
    if (Number(quantity.value) > 2) {
      minus.classList.remove("disabled");
    } else {
      minus.classList.add("disabled");
    }
    if (isDivElement?.className.split(" ").includes("minus")) {
      plus.classList.remove("disabled");
      quantity.value = (Number(quantity.value) - 1).toString();
    } else {
      minus.classList.remove("disabled");
      quantity.value = (Number(quantity.value) + 1).toString();
      if (Number(quantity.value) == maxTotal) {
        plus.classList.add("disabled");
      }
    }
    setQuantity(Number(quantity.value));
  };
  return (
    <div className="flex  flex-col gap-5 md:flex-row md:items-center">
      <div className={cn("text-title md:w-20")}>Số lượng:</div>
      <div className="choose-quantity flex items-center max-xl:flex-wrap lg:justify-between gap-5 bg-white">
        <div className="quantity-block  flex items-center justify-between rounded border border-line sm:w-[140px] w-[120px] flex-shrink-0">
          <div
            className="minus p-2 disabled border-r border-gray-200"
            onClick={handleQuantity}
          >
            <Minus />
          </div>
          <input
            onChange={handleOnChangeQuantity}
            type="number"
            className="quantity body1 font-semibold w-14  text-center outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            defaultValue={1}
          />
          <div
            className="plus p-2 border-l border-gray-200"
            onClick={handleQuantity}
          >
            {" "}
            <Plus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Quantity);
