import { Minus, Plus } from "lucide-react";
import { memo, MouseEventHandler } from "react";

const Quantity = ({ maxTotal }: { maxTotal: number }) => {
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
  };
  return (
    <div className="flex  flex-col gap-3 md:flex-row md:items-center">
      <div className="text-title ">Số lượng:</div>
      <div className="choose-quantity flex items-center max-xl:flex-wrap lg:justify-between gap-5">
        <div className="quantity-block  flex items-center justify-between rounded border border-line sm:w-[140px] w-[120px] flex-shrink-0">
          <div className="minus p-2 disabled" onClick={handleQuantity}>
            <Minus />
          </div>
          <input
            type="number"
            className="quantity body1 font-semibold w-14 text-center outline-none border-none"
            readOnly
            defaultValue={1}
          />
          <div className="plus p-2" onClick={handleQuantity}>
            {" "}
            <Plus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Quantity);
