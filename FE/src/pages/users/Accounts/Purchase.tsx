import { EOrderStatus, IOrderPayment, StatusOrder } from "@/interfaces/order";
import { cn, formatMoney, ToastError, ToastSuccess } from "@/lib/utils";
import { getMyOrder, updateOrderStatus } from "@/services/orders/order";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Evaluate from "./Evaluate";
import LoadingFixed from "@/components/LoadingFixed";

const Purchase = () => {
  const [SearchParams, setSearchParams] = useSearchParams();
  const type = SearchParams.get("type") || "";
  const QueryClient = useQueryClient();
  const { data: orders, isLoading } = useQuery<IOrderPayment[]>({
    queryKey: ["GET_ALL_MY_ORDERS", type],
    queryFn: async () => {
      try {
        const query = type ? `?status=${type}` : "";
        const { data } = await getMyOrder(query);
        return data?.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          ToastError(error.response?.data.message);
        }
      }
    },
  });
  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, "cancelled");
      ToastSuccess("Đã huỷ đơn hàng");
    } catch (error) {
      if (error instanceof AxiosError) {
        ToastError(error?.response?.data?.message);
      }
    } finally {
      QueryClient.invalidateQueries({
        queryKey: ["GET_ALL_MY_ORDERS"],
      });
    }
  };
  if (isLoading) {
    return <LoadingFixed />;
  }
  return (
    <div>
      <ul className="tabs-purchase flex items-center justify-evenly flex-shrink-0 text-center py-4 px-5 w-full overflow-x-auto whitespace-nowrap bg-white">
        {Object.entries(StatusOrder).map(([key, value]) => (
          <li
            key={key}
            className={cn("px-4", type == key ? "active" : "")}
            onClick={() => {
              const query = key ? { type: key } : "";
              setSearchParams(query);
            }}
          >
            {value}
          </li>
        ))}
      </ul>
      <div className="tab-content  mt-3 ">
        <div className="space-y-5">
          {Number(orders?.length) <= 0 ? (
            <div className="no-order flex flex-col items-center justify-center p-28 bg-white">
              <img
                src="/images/no-order.png"
                alt=""
                className="object-cover size-24"
              />
              <p>Chưa có đơn hàng</p>
            </div>
          ) : (
            orders?.map((order) => (
              <section className="bg-white p-6" key={order._id}>
                <div className="flex items-center justify-end border-b border-gray-300 border-dashed pb-3">
                  <span className="text-red-500">
                    {EOrderStatus[order?.status as keyof typeof EOrderStatus]}
                  </span>
                </div>
                <Link to={"/account/purchase/order/" + order._id}>
                  {order?.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-5 pt-5 border-t [&+&]:border-gray-50 mb-5"
                    >
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
                              Phân loại hàng:{" "}
                              {item?.selectedVariant?.colorId?.name}, Size:{" "}
                              {item?.selectedVariant?.sizeId?.name}
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
                  ))}

                  <div className="border-t border-gray-200 border-dotted ">
                    <div className="p-6 flex items-center justify-end ">
                      <div className="w-auto space-y-3">
                        <span className="flex items-center justify-between text-sm">
                          {" "}
                          Giảm :{" "}
                          <span className="ml-2">
                            {order?.discountId?.isPercentage
                              ? `${order.discountId.value}%`
                              : formatMoney(order.discountId?.value || 0)}
                          </span>
                        </span>
                        <span className="flex items-center justify-between text-sm">
                          {" "}
                          Tổng tiền sẩn phẩm :{" "}
                          <span className="ml-2">
                            {formatMoney(order?.totalAmount || 0)}
                          </span>
                        </span>
                        <p className="flex items-center justify-between">
                          Thành tiền:{" "}
                          <span className="text-2xl text-[#ee4d2d] ml-2">
                            {formatMoney(order?.finalAmount || 0)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center justify-between w-full">
                  <span
                    className={cn(
                      "text-red-500 text-sm text-nowrap order-1",
                      order.status != "cancelled" && "hidden"
                    )}
                  >
                    Đã huỷ bởi bạn
                  </span>
                  <div className="order-2 flex justify-end flex-wrap items-center gap-3">
                    {!order.isEvaluating && order.status == "delivered" && (
                      <Evaluate
                        orderItems={order?.orderItems}
                        orderId={order._id as string}
                      />
                    )}
                    {order?.status == "pending" ||
                      (order?.status == "confirmed" && (
                        <button
                          onClick={() =>
                            handleCancelOrder(order?._id as string)
                          }
                          className="text-nowrap py-2 px-12 rounded bg-[#ee4d2d] hover:bg-[#d73211] text-white"
                        >
                          Huỷ đơn hàng
                        </button>
                      ))}
                  </div>
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchase;
