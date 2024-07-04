import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IDiscount } from "@/interfaces/order";
import { cn, formatMoney, ToastError } from "@/lib/utils";
import { getDiscountStillValidByIdUser } from "@/services/orders/discount";
import { AxiosError } from "axios";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
type VoucherType = {
  defaultVoucher?: string;
  totalPriceOrder: number;
  setDiscount: ({
    value,
    isPercentage,
    id,
  }: {
    value: number;
    isPercentage: boolean;
    id: string;
  }) => void;
};
const Voucher = ({
  defaultVoucher,
  totalPriceOrder,
  setDiscount,
}: VoucherType) => {
  const [open, setOpen] = useState(false);
  const [vouchers, setVouchers] = useState<IDiscount[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getDiscountStillValidByIdUser();
        setVouchers(data.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          ToastError(error.response?.data.message);
        }
      }
    })();
  }, []);
  const confirmVoucher = (action: string) => {
    if (action === "confirm") {
      const voucher = document.querySelector(
        '.list-voucher input[name="voucher"]:checked'
      ) as HTMLInputElement;
      if (voucher) {
        const applyVoucher = vouchers.find((v) => v.code === voucher.value);
        if (applyVoucher && applyVoucher?.minOrderAmount > totalPriceOrder) {
          ToastError(
            `Mua thêm ${formatMoney(
              applyVoucher.minOrderAmount - totalPriceOrder
            )} sản phẩm để áp dụng Voucher`
          );
          return;
        }
        setDiscount({
          isPercentage: applyVoucher?.isPercentage as boolean,
          value: applyVoucher?.value as number,
          id: applyVoucher?._id as string,
        });
        setOpen(false);
      } else {
        setOpen(false);
      }
    } else if (action === "applyCodeVoucher") {
      const codeVoucher = document.querySelector(
        "#codeVoucher"
      ) as HTMLInputElement;
      const errorElement = codeVoucher.closest("div")
        ?.nextElementSibling as HTMLSpanElement;
      const applyVoucher = vouchers.find((v) => v.code === codeVoucher.value);
      if (!applyVoucher) {
        if (errorElement.classList.contains("error-apply-vourcher")) {
          errorElement.classList.replace("hidden", "inline-block");
        }
      } else {
        if (applyVoucher && applyVoucher?.minOrderAmount > totalPriceOrder) {
          if (errorElement.classList.contains("hidden")) {
            errorElement.classList.replace("hidden", "inline-block");
          }
          errorElement.innerHTML = `Mua thêm ${formatMoney(
            applyVoucher.minOrderAmount - totalPriceOrder
          )} sản phẩm để áp dụng Voucher`;
          return;
        }
        setDiscount({
          isPercentage: applyVoucher?.isPercentage as boolean,
          value: applyVoucher?.value as number,
          id: applyVoucher?._id as string,
        });
        setOpen(false);
        if (errorElement.classList.contains("error-apply-vourcher")) {
          errorElement.classList.replace("inline-block", "hidden");
        }
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)} className="text-blue-500 text-sm">
          Chọn hoặc nhập mã
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] rounded md:max-w-xl pb-0">
        <DialogHeader className="w-full">
          <DialogTitle className="max-w-full text-[#222] font-normal">
            Chọn Toinh Voucher
          </DialogTitle>
        </DialogHeader>
        <div>
          <div
            className={cn(
              "flex  items-center justify-center gap-5 bg-gray-50 p-3.5",
              totalPriceOrder == 0 && "pointer-events-none opacity-40"
            )}
          >
            <label
              htmlFor="codeVoucher"
              className="text-nowrap text-sm md:text-base"
            >
              Mã Voucher
            </label>
            <input
              tabIndex={-1}
              id="codeVoucher"
              type="text"
              className=" w-full  p-2.5 border border-gray-100 outline-none h-10 focus:bg-transparent bg-transparent"
            />
            <button
              onClick={() => confirmVoucher("applyCodeVoucher")}
              className="text-nowrap text-sm md:text-base uppercase py-2 px-2.5 h-10 bg-[#ee4d2d] text-white"
            >
              Áp dụng
            </button>
          </div>
          <span className="error-apply-vourcher text-red-500 text-xs hidden">
            Rất tiếc! Không thể tìm thấy mã voucher này. Bạn vui lòng kiểm tra
            lại mã và hạn sử dụng nhé.
          </span>
        </div>
        {/* Danh sách voucher */}
        <div className="list-voucher flex flex-col h-72 overflow-y-auto scrollbar-css pr-3 gap-5 ">
          {vouchers.map(
            (voucher) =>
              voucher.isPublic && (
                <div key={voucher._id} className="flex flex-col">
                  <label
                    onClick={(e) => {
                      if (totalPriceOrder == 0) {
                        ToastError(
                          `Vui lòng chọn sản phẩm trong giỏ hàng để áp dụng Voucher này`
                        );
                        e.preventDefault();
                      } else if (totalPriceOrder < voucher.minOrderAmount) {
                        ToastError(
                          `Mua thêm ${formatMoney(
                            voucher.minOrderAmount - totalPriceOrder
                          )} sản phẩm để áp dụng Voucher`
                        );
                        e.preventDefault();
                      }
                    }}
                    htmlFor={voucher?._id}
                    className={cn(
                      "relative flex items-center justify-between border border-s-0 border-zinc-300 rounded pr-5",
                      totalPriceOrder < voucher.minOrderAmount ||
                        totalPriceOrder == 0
                        ? "opacity-35 cursor-default"
                        : "cursor-pointer"
                    )}
                  >
                    <span className="hidden absolute top-1 -right-1 rounded-s-full bg-[#ffeaea] text-xs text-[#ee4d2d] py-0.5 px-2 after:content-[''] after:absolute after:-bottom-[1.5px] after:right-[1px] after:border-[2.5px] after:border-transparent after:border-e-[#ff9a86] after:rotate-45">
                      x{voucher?.maxUsagePerUser}
                    </span>
                    <div className="flex items-center gap-5">
                      <div className="relative flex flex-col items-center justify-center bg-[#ee4d2d] w-28 h-28 max-w-28 max-h-28 after:content-[''] after:absolute after:top-0 after:-left-1.5 after:w-3 after:h-full after:bg-[length:12px_12px] after:bg-[radial-gradient(circle,_#fff_35%,_transparent_51%)]">
                        <img
                          src="/images/voucher.png"
                          alt=""
                          className="w-14 rounded-full"
                        />
                        <p className="text-white">Thời trang</p>
                      </div>
                      <div className="">
                        <h4 className="text-base font-medium text-[#222]">
                          Giảm{" "}
                          {voucher.isPercentage
                            ? `${voucher.value}%`
                            : formatMoney(voucher.value)}
                        </h4>
                        <p className="text-sm text-[#222]">
                          Đơn Tối thiểu {formatMoney(voucher.minOrderAmount)}
                        </p>
                        <span className="text-xs uppercase font-light  text-gray-400">
                          HSD:{" "}
                          {new Date(voucher?.expiryDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      </div>
                    </div>
                    <input
                      defaultChecked={defaultVoucher == voucher._id}
                      id={voucher?._id}
                      type="radio"
                      value={voucher?.code}
                      name="voucher"
                      className={cn(
                        "size-[18px] checked:hidden peer ",
                        totalPriceOrder < voucher.minOrderAmount ||
                          totalPriceOrder == 0
                          ? "cursor-default"
                          : "cursor-pointer"
                      )}
                    />
                    <span className="hidden peer-checked:flex size-[18px] bg-[#ee4d2d] rounded-full  items-center justify-center">
                      <Check size={13} color="#fff" strokeWidth={2} />
                    </span>
                  </label>
                  <div
                    className={cn(
                      "w-full hidden items-center justify-start gap-2 px-2.5 font-normal py-0.5 bg-[#fff8e4] text-[#ee4d2d]",
                      (totalPriceOrder < voucher.minOrderAmount ||
                        totalPriceOrder == 0) &&
                        "flex"
                    )}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6.5 5V9.25H5.5V5H6.5Z" fill="#EE4D2D" />
                      <path
                        d="M6.625 3.5C6.625 3.84518 6.34518 4.125 6 4.125C5.65482 4.125 5.375 3.84518 5.375 3.5C5.375 3.15482 5.65482 2.875 6 2.875C6.34518 2.875 6.625 3.15482 6.625 3.5Z"
                        fill="#EE4D2D"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6ZM6 10.75C8.62335 10.75 10.75 8.62335 10.75 6C10.75 3.37665 8.62335 1.25 6 1.25C3.37665 1.25 1.25 3.37665 1.25 6C1.25 8.62335 3.37665 10.75 6 10.75Z"
                        fill="#EE4D2D"
                      />
                    </svg>
                    {totalPriceOrder == 0
                      ? "Vui lòng chọn sản phẩm trong giỏ hàng để áp dụng Voucher này"
                      : totalPriceOrder < voucher.minOrderAmount
                      ? `Mua thêm ${formatMoney(
                          voucher.minOrderAmount - totalPriceOrder
                        )} sản phẩm để áp dụng Voucher`
                      : ""}
                  </div>
                </div>
              )
          )}
        </div>
        {/* Actions */}
        <div className="py-3 border-t border-gray-100 flex items-center justify-end gap-2 *:cursor-pointer  *:py-2 *:px-5 *:rounded *:uppercase *:font-light">
          <DialogClose asChild>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-gray-100 "
            >
              Trở lại
            </button>
          </DialogClose>
          <button
            className="bg-[#ee4d2d] text-white "
            onClick={() => confirmVoucher("confirm")}
          >
            Xác nhận
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Voucher;
