/* eslint-disable @typescript-eslint/no-explicit-any */
import Address from "@/components/Address";
import ButtonLoading from "@/components/ButtonLoading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/auth";
import { ICartItem } from "@/interfaces/cart";
import { ICustomer } from "@/interfaces/customer";
import { IDiscount, IOrderPayment, MethodPayments } from "@/interfaces/order";
import { cn, formatMoney, ToastError } from "@/lib/utils";
import { getCartCheckout } from "@/services/cart";
import { setItemLocal } from "@/services/localStorageService";
import {
  orderAndPayUponReceipt,
  payForOrdersWithVNPay,
} from "@/services/orders/order";
import { AxiosError } from "axios";
import {
  Check,
  CircleDollarSign,
  ClipboardList,
  MapPin,
  Ticket,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Breadcrumd from "../Breadcrumd";
import Voucher from "../Carts/Voucher";
type OrderSateType = {
  order: ICartItem[];
  totalPayment: {
    finalAmount: number;
    totalPrice: number;
    totalQuantity: number;
  };
  voucher: IDiscount;
};
type AddressType = {
  address?: {
    province?: string;
    district?: string;
    commune?: string;
    specific?: string;
  };
};
const Checkout = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const [orderState, setOrderState] = useState<OrderSateType>();
  const [discount, setDiscount] = useState({
    value: 0,
    isPercentage: false,
    id: "",
  });
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getCartCheckout(location.search);
        setOrderState(data?.data);
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { _id, value, isPercentage } = data?.data?.voucher;
        setDiscount({ id: _id, value, isPercentage });
      } catch (error) {
        if (error instanceof AxiosError) {
          // ToastError(error.response?.data.message);
        }
      }
    })();
  }, []);
  useEffect(() => {
    const newfinalAmount = discount.id
      ? discount?.isPercentage
        ? (discount.value * Number(orderState?.totalPayment.totalPrice)) / 100
        : Number(orderState?.totalPayment.totalPrice) - discount.value
      : orderState?.totalPayment.totalPrice;
    setOrderState((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        totalPayment: {
          ...prev.totalPayment,
          finalAmount: newfinalAmount || prev.totalPayment.totalPrice,
        },
      };
    });
  }, [discount]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IOrderPayment | ICustomer | any | AddressType>({
    defaultValues: authUser,
  });
  const breadcrumbs = {
    info: [
      { title: "Trang chủ", urlLink: "/" },
      { title: "Giỏ hàng", urlLink: "/cart" },
    ],
    page: "Thanh toán",
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (newData: IOrderPayment | any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedAddress: { [key: string]: any } = {};

    for (const key in newData.address) {
      if (newData.address[key]) {
        try {
          parsedAddress[key] = JSON.parse(newData.address[key]).name;
        } catch (error) {
          // console.error(`Error parsing ${key}:`, error);
        }
      } else {
        parsedAddress[key] = newData?.address?.[key]?.name;
      }
    }
    const orderItems = orderState?.order.map((item) => {
      return {
        productId: item?.productId?._id,
        quantity: item?.quantity,
        selectedVariant: item?.selectedVariant?._id,
      };
    });
    const payload = {
      orderItems,
      recipientName: newData?.recipientName || "",
      recipientPhone: newData?.recipientPhone || "",
      address: { ...parsedAddress, specific: newData?.address?.specific || "" },
      payment: {
        method: newData.payment,
        amount: orderState?.totalPayment.finalAmount,
        desc: MethodPayments[newData.payment as keyof typeof MethodPayments],
      },
      totalAmount: orderState?.totalPayment.totalPrice,
      discountId: discount.id || null,
      finalAmount: orderState?.totalPayment.finalAmount,
      noteMessage: newData.noteMessage || "",
      backUrl: window.location.href,
    };
    switch (newData.payment) {
      case "vnpay_bank":
        (async () => {
          try {
            const { data } = await payForOrdersWithVNPay(payload);
            setItemLocal(
              "checkoutHistoryRouter",
              `${window.location.search}${
                discount.id ? `&discount=${discount.id}` : ""
              }`
            );
            return (window.location.href = data.paymentUrl);
          } catch (error) {
            if (error instanceof AxiosError) {
              ToastError(error.response?.data.message);
            }
          }
        })();
        break;
      case "cash_on_delivery":
        (async () => {
          try {
            const { data } = await orderAndPayUponReceipt(payload);
            navigate(`/checkout/verify-payment?orderId=${data?.data?._id}`);
          } catch (error) {
            if (error instanceof AxiosError) {
              ToastError(error.response?.data.message);
            }
          }
        })();

        break;
      default:
        ToastError("Phương thức thanh toán không hợp lệ");
        break;
    }
  };
  return (
    <div className="bg-gray-100 px-5 md:px-0 ">
      <Breadcrumd breadcrumbs={breadcrumbs.info} page={breadcrumbs.page} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-screen-xl mx-auto pt-10 pb-20 space-y-5 "
      >
        <div className="space-y-5 bg-white pb-5">
          <div className="w-full h-0.5 bg-[repeating-linear-gradient(45deg,_#6fa6d6,_#6fa6d6_33px,_transparent_0,_transparent_41px,_#f18d9b_0,_#f18d9b_74px,_transparent_0,_transparent_82px)]"></div>
          <h3 className="px-5 flex items-center uppercase text-[#ee4d2d] font-medium">
            <User color="#ee4d2d" className="mr-2" /> Thông tin người nhận
          </h3>
          <div className="grid grid-cols-6 gap-10 px-5">
            <div className="col-span-3">
              <label
                htmlFor="recipientName"
                className="block text-sm font-medium text-gray-700"
              >
                Tên người nhận
              </label>
              <input
                {...register("recipientName", {
                  required: "Vui lòng nhập họ tên",
                })}
                defaultValue={`${authUser?.name?.last_name || ""}  ${
                  authUser?.name?.first_name || ""
                }`}
                type="text"
                id="recipientName"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors?.recipientName && (
                <span className="text-red-500">
                  {errors?.recipientName?.message as any}
                </span>
              )}
            </div>
            <div className="col-span-3">
              <label
                htmlFor="recipientPhone"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại
              </label>
              <input
                {...register("recipientPhone", {
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
                defaultValue={authUser?.phone}
                type="text"
                id="recipientPhone"
                className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors?.recipientPhone && (
                <span className="text-red-500">
                  {errors?.recipientPhone?.message as any}
                </span>
              )}
            </div>
          </div>
          <h3 className="px-5 flex items-center uppercase text-[#ee4d2d] font-medium">
            <MapPin color="#ee4d2d" className="mr-2" /> Địa chỉ nhận hàng
          </h3>
          <div
            className={cn(
              " w-full gap-5 px-5 py-2",
              errors.address && (errors?.address as any).commune && "bg-red-50"
            )}
          >
            <div className="flex w-full gap-5">
              <Address
                register={register}
                address={authUser?.address}
                checkNul={true}
                resendAddress={() => reset(authUser)}
              />
            </div>
            <p
              className={cn(
                " hidden text-red-500 text-center mt-2",
                errors.address && (errors?.address as any).commune && "block"
              )}
            >
              Bạn chưa chọn địa chỉ
            </p>
          </div>
          <div className="w-full px-5">
            <label
              htmlFor="PasswordConfirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Địa chỉ cụ thể
            </label>
            <textarea
              {...register("address.specific")}
              className="mt-1 w-full p-1  rounded border border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            ></textarea>
          </div>
        </div>
        <div className="overflow-x-auto bg-white p-5">
          <Table>
            <TableHeader className="">
              <TableRow>
                <TableHead className="pl-0 text-lg font-normal text-[#222] min-w-48">
                  Sản phẩm
                </TableHead>
                <TableHead className="text-[#0000008a]">Đơn giá</TableHead>
                <TableHead className="text-[#0000008a]">Số lượng</TableHead>
                <TableHead className="pr-0 text-[#0000008a] text-end">
                  Thành tiền
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderState?.order.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="flex items-center gap-3 pl-0">
                    <div className="size-10 min-w-10 min-h-10">
                      <img
                        src={order?.productId?.images?.[0]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="">
                      <p className="line-clamp-1 text-black">
                        {order?.productId.name}
                      </p>
                      <span className="text-[#929292]">
                        Loại: {order?.selectedVariant.colorId?.name}, Size{" "}
                        {order?.selectedVariant.sizeId?.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatMoney(order.productId.price || 0)}
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell className="pr-0 text-end">
                    {formatMoney(order.totalPrice || 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center gap-5 border-t-2 border-[#00000017] border-dashed py-5 mt-5">
            <label htmlFor="" className="text-nowrap">
              Lời nhắn:
            </label>
            <input
              {...register("noteMessage")}
              type="text"
              placeholder="Lưu ý..."
              className="border border-gray-300 w-full py-1 px-3 rounded-sm outline-none focus:border-gray-300"
            />
          </div>
          <div className="flex items-center justify-end gap-5 text-[#0000008a] text-sm font-medium border-t-2 border-[#00000017] border-dashed py-5">
            Tổng số tiền ({orderState?.totalPayment.totalQuantity || 0} sản
            phẩm):{" "}
            <span className="text-[#ee4d2d] text-xl">
              {formatMoney(orderState?.totalPayment.totalPrice || 0)}
            </span>
          </div>
        </div>
        <div className="bg-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Ticket color="#ee4d2d" strokeWidth={1.2} />
              <p className="text-[#222]">Toinh Voucher</p>
            </div>
            <span
              className={cn(
                "text-[#ee4d2d] text-sm mt-0.5",
                !discount.value && "hidden"
              )}
            >
              Giảm{" "}
              {discount?.isPercentage
                ? `${discount.value}%`
                : formatMoney(discount?.value)}{" "}
              cho toàn bộ đơn hàng
            </span>
          </div>
          <Voucher
            setDiscount={setDiscount}
            totalPriceOrder={orderState?.totalPayment?.totalPrice || 0}
            defaultVoucher={discount.id || ""}
          />
        </div>
        <div className="bg-white p-5 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <h3 className="flex  items-center gap-2">
              <CircleDollarSign color="#ee4d2d" size={20} strokeWidth={1.3} />{" "}
              Phương thức thanh toán:
            </h3>
            <ul className="flex flex-wrap  items-center gap-2">
              {Object.entries(MethodPayments).map(([key, value]) => (
                <li key={key}>
                  <label
                    htmlFor={key}
                    className=" color-item relative max-w-min max-h-[43px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d] has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]"
                  >
                    <input
                      {...register("payment")}
                      className="peer"
                      type="radio"
                      id={key}
                      value={key}
                      hidden
                      defaultChecked={value === MethodPayments.cash_on_delivery}
                    />

                    <span className="caption1 capitalize text-nowrap">
                      {value}
                    </span>
                    <span className="selection-box-tick hidden absolute bottom-0 right-0 peer-checked:block">
                      <Check
                        size={12}
                        color="#fff"
                        strokeWidth={2}
                        className="-rotate-2"
                      />
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-between gap-5 border-t border-gray-200 py-5">
            <h2 className="flex items-center gap-2">
              <ClipboardList color="#F9C821" size={20} strokeWidth={1.3} /> Chi
              tiết thanh toán:
            </h2>
            <ul className="w-full md:w-auto *:flex *:items-center *:justify-between *:text-nowrap *:gap-2 *:text-[#0000008a]">
              <li>
                Tổng tiền hàng:{" "}
                <span className="text-black text-sm">
                  {formatMoney(orderState?.totalPayment.totalPrice ?? 0)}
                </span>
              </li>
              <li>
                Giảm giá sản phẩm:{" "}
                <span className="text-black text-sm">
                  {discount.id
                    ? `${
                        discount?.isPercentage
                          ? `${discount.value}%`
                          : formatMoney(discount?.value ?? 0)
                      }`
                    : "0đ"}
                </span>
              </li>
              <li>
                Tổng thanh toán:{" "}
                <span className="text-[#ee4d2d] text-xl font-medium">
                  {formatMoney(orderState?.totalPayment.finalAmount ?? 0)}
                </span>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-end">
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full md:w-56 py-1.5 px-4  rounded bg-[#ee4d2d] text-white"
            >
              {isSubmitting ? <ButtonLoading /> : "Đặt hàng"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
