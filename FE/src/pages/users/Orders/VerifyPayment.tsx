import { useCart } from "@/hooks/cart";
import { ICart } from "@/interfaces/cart";
import { IOrderPayment } from "@/interfaces/order";
import { ToastError } from "@/lib/utils";
import { getItemLocal } from "@/services/localStorageService";
import {
  verifyOrderPayUponReceipt,
  verifyPaymentVNPay,
} from "@/services/orders/order";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Invoice from "./Invoice";

const VerifyPayment = () => {
  const { setCartState } = useCart();
  const navigate = useNavigate();
  const [order, setOrder] = useState<IOrderPayment>();
  const params = new URLSearchParams(window.location.search);
  const vnp_ResponseCode = params.get("vnp_ResponseCode");
  const orderId = params.get("orderId");
  useEffect(() => {
    if (vnp_ResponseCode) {
      (async () => {
        try {
          const { data } = await verifyPaymentVNPay(location.search);
          setOrder(data?.data?.order);
          setCartState?.(data?.data?.dataCart as ICart);
        } catch (error) {
          if (error instanceof AxiosError) {
            const statusCode = error.response?.data.statusCode;
            if (statusCode == 24) {
              navigate(`/checkout${getItemLocal("checkoutHistoryRouter")}`);
            } else {
              navigate(`/checkout${getItemLocal("checkoutHistoryRouter")}`);
              ToastError(error.response?.data.message);
            }
          }
        }
      })();
    }
    if (orderId) {
      (async () => {
        try {
          const { data } = await verifyOrderPayUponReceipt(orderId);
          setOrder(data?.data?.order);
          setCartState?.(data?.data?.dataCart as ICart);
        } catch (error) {
          if (error instanceof AxiosError) {
            ToastError(error.response?.data.message);
          }
        }
      })();
    }
  }, []);
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[90%] max-w-2xl relative bg-white  flex flex-col items-center shadow-[0_0_25px_#ccc] rounded-lg  p-10 pt-3 after:content[''] after:absolute after:inset-x-0 after:top-0 after:rounded-se-md after:rounded-ss-md after:h-1 after:bg-[#ee4d2d]">
        <div className="w-56">
          <img
            src="/images/success-payment.png"
            alt=""
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3 className="text-2xl font-semibold text-[#2f2f2f]">
              Cảm ơn bạn đã đặt hàng!
            </h3>
            <p className="w-4/5 text-xs text-[#cecece]">
              Đơn hàng của bạn đã được xác nhận và đang được xử lý. Bạn có thể
              kiểm tra lại thông tin đơn hàng và trạng thái của nó trong phần
              'Đơn mua' của tài khoản của bạn. Cảm ơn bạn đã mua sắm từ chúng
              tôi!
            </p>
            <Invoice order={order as IOrderPayment} />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="*:py-2 *:px-5 *:rounded *:uppercase space-x-5">
              <Link
                to={"/account/purchase/order/" + order?._id}
                className="bg-gray-100"
              >
                Đơn mua
              </Link>
              <Link to={"/shop"} className=" bg-[#ee4d2d] text-white">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPayment;
