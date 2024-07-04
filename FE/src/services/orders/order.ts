import instance from "@/config/instance";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const payForOrdersWithVNPay = (data: any) => {
  const uri = "/payment/create_payment_url_vnpay";
  return instance.post(uri, data);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const orderAndPayUponReceipt = (data: any) => {
  const uri = "/order/order_and_pay_upon_receipt";
  return instance.post(uri, data);
};
export const verifyOrderPayUponReceipt = (id: string) => {
  const uri = `/order/${id}/verifyOrderPayUponReceipt`;
  return instance.get(uri);
};
export const verifyPaymentVNPay = (query: string) => {
  const uri = "/payment/vnpay_return" + query;
  return instance.get(uri);
};
export const getMyOrder = (query?: string) => {
  const uri = "/order/myOrder" + (query || "");
  return instance.get(uri);
};
export const getOrderById = (id: string) => {
  const uri = `/order/${id}/orderById`;
  return instance.get(uri);
};
export const updateOrderStatus = (orderId: string, status: string) => {
  const uri = `/order/updateOrderStatus`;
  return instance.patch(uri, { orderId, status });
};
