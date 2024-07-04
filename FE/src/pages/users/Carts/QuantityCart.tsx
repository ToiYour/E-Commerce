import { useCart } from "@/hooks/cart";
import { cn, ToastWarning } from "@/lib/utils";
import { updateQuantityItemCart } from "@/services/cart";
import { Minus, Plus } from "lucide-react";
import {
  ChangeEventHandler,
  memo,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";
import { useDebouncedCallback } from "use-debounce";
export type dispatchUpdateQuantityItemCartType = {
  itemId?: string;
  quantity?: number;
};
const QuantityCart = ({
  maxTotal,
  defaultQuantity,
  itemId,
}: {
  maxTotal: number;
  defaultQuantity: number;
  itemId?: string;
}) => {
  const { setCartState } = useCart();
  const quantityRef = useRef<HTMLInputElement | null>(null);
  const minusRef = useRef<HTMLDivElement | null>(null);
  const plusRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (quantityRef.current) {
      quantityRef.current.value = String(defaultQuantity);
    }
  }, [defaultQuantity]);
  const handleOnChangeQuantity: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (quantityRef.current && minusRef.current && plusRef.current) {
      const quantity = Number(e.target.value);
      if (quantity > maxTotal) {
        quantityRef.current.value = String(maxTotal);
        ToastWarning(
          `Rất tiếc, bạn chỉ có thể mua tối đa ${maxTotal} sản phẩm.`
        );
        plusRef.current.classList.add("disabled");
        if (minusRef.current.classList.contains("disabled")) {
          minusRef.current.classList.remove("disabled");
        }
      } else if (quantity < 1) {
        minusRef.current.classList.add("disabled");
        plusRef.current.classList.remove("disabled");
        quantityRef.current.value = "1";
      }
      if (quantity > 2) {
        minusRef.current.classList.contains("disabled") &&
          minusRef.current.classList.remove("disabled");
      } else {
        minusRef.current.classList.add("disabled");
      }
    }
  };
  const handleQuantity: MouseEventHandler<HTMLDivElement> = (e) => {
    if (quantityRef.current && minusRef.current && plusRef.current) {
      const elementTarget = e.target as HTMLElement;
      const isDivElement = elementTarget.closest("div");
      if (Number(quantityRef.current.value) > 2) {
        minusRef.current.classList.remove("disabled");
      } else {
        minusRef.current.classList.add("disabled");
      }
      if (isDivElement?.className.split(" ").includes("minus")) {
        plusRef.current.classList.remove("disabled");
        quantityRef.current.value = (
          Number(quantityRef.current.value) - 1
        ).toString();
        updateQuantityDebounce(Number(quantityRef.current.value));
      } else {
        minusRef.current.classList.remove("disabled");
        quantityRef.current.value = (
          Number(quantityRef.current.value) + 1
        ).toString();
        updateQuantityDebounce(Number(quantityRef.current.value));
        if (Number(quantityRef.current.value) == maxTotal) {
          plusRef.current.classList.add("disabled");
        }
      }
    }
  };
  const updateQuantityDebounce = useDebouncedCallback(async (value: number) => {
    const { data } = await updateQuantityItemCart({
      itemId: itemId as string,
      quantity: value,
    });
    setCartState?.(data.data);
  }, 500);
  return (
    <div className="flex  flex-col gap-5 md:flex-row md:items-center">
      <div className="choose-quantity flex items-center max-xl:flex-wrap lg:justify-between gap-5 bg-white">
        <div className="quantity-block  flex items-center justify-between rounded border border-line  flex-shrink-0">
          <div
            ref={minusRef}
            className={cn(
              "minus p-1  border-r border-gray-200 cursor-pointer",
              defaultQuantity == 1 && "disabled"
            )}
            onClick={handleQuantity}
          >
            <Minus size={18} />
          </div>
          <input
            ref={quantityRef}
            onChange={(event) => {
              handleOnChangeQuantity(event);
              updateQuantityDebounce(Number(event.target.value));
            }}
            type="number"
            className="quantity body1  w-9  text-center outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            defaultValue={defaultQuantity}
          />
          <div
            ref={plusRef}
            className={cn(
              "plus p-1 border-l border-gray-200 cursor-pointer",
              defaultQuantity == maxTotal && "disabled"
            )}
            onClick={handleQuantity}
          >
            {" "}
            <Plus size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuantityCart);
