import { ICartItem } from "@/interfaces/cart";
import { EOrderStatus, IOrderPayment } from "@/interfaces/order";
import { cn, formatMoney, ToastError, ToastSuccess } from "@/lib/utils";
import { getOrderById, updateOrderStatus } from "@/services/orders/order";
import { AxiosError } from "axios";
import {
  Banknote,
  ChevronLeft,
  FileText,
  Inbox,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Evaluate from "./Evaluate";
type StatusHistoryItem = {
  status?: string;
  date?: string;
  _id?: string;
};

type StatusHistoryObject = {
  [key: string]: StatusHistoryItem;
};
const PurchaseOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrderPayment>();
  const [statusOrder, setStatusOrder] = useState<StatusHistoryObject>({});
  const [process, setProcess] = useState({
    index: 1,
    percent: 20,
  });
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getOrderById(id as string);
        setOrder(data.data);
      } catch (error) {
        //
      }
    })();
  }, []);
  const steps = [
    {
      status: "pending",
      label: "Đơn hàng đã đặt",
      icon: FileText,
      time: statusOrder?.pending?.date,
    },
    {
      status: "confirmed",
      label:
        order?.payment?.method === "cash_on_delivery"
          ? "Đã xác nhận thông tin thanh toán"
          : `Đơn hàng đã thanh toán (${formatMoney(order?.finalAmount || 0)})`,
      icon: Banknote,
      time: statusOrder?.confirmed?.date,
    },
    { status: "shipped", label: "Đã giao cho ĐVVC", icon: Truck },
    { status: "delivered", label: "Đã nhận được hàng", icon: Inbox },
    { status: "reviewed", label: "Đánh giá", icon: Star },
  ];
  useMemo(() => {
    const result = order?.statusHistory?.reduce((acc, item) => {
      acc[item.status] = item;
      return acc;
    }, {} as StatusHistoryObject);
    const index = steps.findIndex((item) => item.status == order?.status);
    const percent = index + 1 == 1 ? 0 : ((index + 1) / 5) * 100;
    setProcess({ index: index + 1, percent });
    setStatusOrder(result as StatusHistoryObject);
  }, [order, id]);
  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, "cancelled");
      ToastSuccess("Đã huỷ đơn hàng");
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error?.response?.data?.message);
      }
    } finally {
      (async () => {
        try {
          const { data } = await getOrderById(id as string);
          setOrder(data.data);
        } catch (error) {
          //
        }
      })();
    }
  };
  return (
    <div>
      <div className="">
        <div className="py-5 px-6 flex max-sm:flex-col items-start sm:items-center  justify-between bg-white">
          <Link
            to={"/account/purchase"}
            className="flex  items-center uppercase text-[#0000008a] text-nowrap"
          >
            <ChevronLeft color="#0000008a" /> Trở lại
          </Link>
          <div className="hidden md:flex w-full  max-sm:flex-col items-center md:justify-end max-sm:text-sm gap-3 max-sm:justify-center">
            <p className="uppercase text-nowrap ">
              Mã đơn hàng: <span className="normal-case">{order?._id}</span>
            </p>
            <span className="max-sm:hidden md:hidden">|</span>
            <p className="uppercase text-[#ee4d2d] text-nowrap md:hidden">
              {EOrderStatus[order?.status as keyof typeof EOrderStatus]}
            </p>
          </div>
        </div>
        <div
          className={cn(
            "w-full overflow-x-auto scrollbar-hide",
            order?.status == "cancelled" && "hidden"
          )}
        >
          <div className="min-w-[963px] py-10 px-6 bg-white border-t border-gray-300 border-dotted">
            <div className="relative stepper flex justify-between items-start">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="z-10 w-36 stepper__step flex flex-col justify-center items-center"
                >
                  <div
                    className={cn(
                      "w-14 h-14 bg-white flex items-center justify-center border-[4px]  rounded-full",
                      process.index == index + 1
                        ? "bg-[#2dc258] border-none"
                        : process.index > index + 1
                        ? "border-[#2dc258]"
                        : "border-gray-100"
                    )}
                  >
                    {
                      <step.icon
                        size={30}
                        className={cn(
                          process.index == index + 1
                            ? "text-white"
                            : process.index > index + 1
                            ? "text-[#2dc258]"
                            : "text-[#ccc]"
                        )}
                      />
                    }
                  </div>
                  <div className="capitalize mt-5 text-center">
                    <p className="text-wrap max-w-40">{step.label}</p>
                    <span className="text-xs text-[#00000042]">
                      {step?.time
                        ? new Date(step.time).toLocaleString("vi-VN")
                        : ""}
                    </span>
                  </div>
                </div>
              ))}
              <div
                style={{ width: `${process.percent}%` }}
                className={cn("absolute  top-6 h-1")}
              >
                <span className="absolute h-full bg-[#2dc258] w-[calc(100%_-_130px)] ml-12"></span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "flex  items-center justify-end bg-[#fffcf5] p-5 border-2 border-l-0 border-r-0 border-gray-100 border-dotted",
            order?.status == "delivered" && !order?.isEvaluating && "flex"
          )}
        >
          {order?.status == "cancelled" ? (
            <div className="">
              <h3 className="text-xl text-[#ee4d2d]">Đã huỷ đơn hàng</h3>
              <span className="text-sm text-[#000000a6]">
                vào {new Date(order?.updatedAt || "").toLocaleString("vi-VN")}
              </span>
            </div>
          ) : (
            <>
              <Evaluate
                orderItems={order?.orderItems as ICartItem[]}
                orderId={id as string}
              />
              {order?.status == "pending" ||
                (order?.status == "confirmed" && (
                  <button
                    onClick={() => handleCancelOrder(order?._id as string)}
                    className="text-nowrap py-2 px-12 rounded bg-[#ee4d2d] hover:bg-[#d73211] text-white mx-2"
                  >
                    Huỷ đơn hàng
                  </button>
                ))}
            </>
          )}
        </div>
        <div className="bg-white p-5 relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-[repeating-linear-gradient(45deg,_#6fa6d6,_#6fa6d6_33px,_transparent_0,_transparent_41px,_#f18d9b_0,_#f18d9b_74px,_transparent_0,_transparent_82px)]"></div>
          <h3 className="capitalize text-xl">Địa chỉ nhận hàng</h3>
          <ul>
            <li>
              Họ tên: <span>{order?.recipientName}</span>
            </li>
            <li>
              Số điện thoại: <span>{order?.recipientPhone}</span>
            </li>
            <li>
              Địa chỉ:{" "}
              <span>
                {order?.address?.specific
                  ? `${order?.address?.specific}, ${order?.address?.commune}, ${order?.address?.district}, ${order?.address?.province}`
                  : `${order?.address?.commune}, ${order?.address?.district}, ${order?.address?.province}`}
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-white  mt-5">
          <div className="p-5">
            {order?.orderItems.map((item) => (
              <Link to={`/shop/${item.productId.slug}`} key={item._id}>
                <div className="flex items-center gap-5 pt-5 border-t [&+&]:border-gray-50 mb-5">
                  <div className="size-20 min-w-20 min-h-20">
                    <img
                      src={item?.productId?.images?.[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full flex items-center justify-between ">
                    <div>
                      <p className="text-base text-[#000000de] line-clamp-2 font-medium w-11/12">
                        {item?.productId.name}
                      </p>
                      <div className="flex flex-col text-sm">
                        <span className="text-[#0000008a] w-11/12 line-clamp-1">
                          Phân loại hàng: {item?.selectedVariant?.colorId?.name}
                          , Size: {item?.selectedVariant?.sizeId?.name}
                        </span>
                        <span>x{item?.quantity}</span>
                      </div>
                    </div>
                    <span className="text-[#ee4d2d] text-base">
                      {formatMoney(
                        Number(item?.productId?.price) +
                          Number(item?.selectedVariant.extra_price) *
                            item?.quantity
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="border-t-2 border-gray-200 p-5 flex items-center justify-end">
            <ul className="w-auto *:w-full *:flex *:items-center *:justify-between *:gap-5 *:text-[#0000008a] *:text-xs *:py-2">
              <li className="">
                <p>Tổng tiền hàng:</p>
                <span className="text-[#000000cc] text-sm">
                  {formatMoney(order?.totalAmount || 0)}
                </span>
              </li>
              <li>
                <p>Voucher từ Toinh:</p>
                <span className="text-[#000000cc] text-sm">
                  {order?.discountId?.isPercentage
                    ? `${order?.discountId?.value}%`
                    : formatMoney(order?.discountId?.value || 0)}
                </span>
              </li>
              <li>
                <p>Thành tiền:</p>
                <span className="text-[#ee4d2d] text-xl">
                  {formatMoney(order?.finalAmount || 0)}
                </span>
              </li>
              <li>
                <p>Phương thức thanh toán:</p>
                <span className="text-[#000000cc] text-sm">
                  {order?.payment?.desc || ""}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
