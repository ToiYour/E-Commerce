import { ignoreLogger, ProductCode, VNPay, VnpLocale } from "vnpay";
import OrderModel from "../../models/oders/order.js";
import CartModel from "../../models/carts/cart.js";
import ProductModel from "../../models/products/product.js";
import VariantModel from "../../models/products/variant.js";
const vnpay = new VNPay({
  tmnCode: process.env.vnp_TmnCode,
  secureSecret: process.env.vnp_HashSecret,
  vnpayHost: "https://sandbox.vnpayment.vn",
  testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
  hashAlgorithm: "SHA512", // tùy chọn

  /**
   * Sử dụng enableLog để bật/tắt logger
   * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
   */
  enableLog: true, // optional

  /**
   * Hàm `loggerFn` sẽ được gọi để ghi log
   * Mặc định, loggerFn sẽ ghi log ra console
   * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
   *
   * `ignoreLogger` là một hàm không làm gì cả
   */
  loggerFn: ignoreLogger, // optional
});
export const createPaymentVNPay = async (req, res) => {
  // Tạo đơn hàng
  req.body.userId = req?.user._id;
  req.body.statusHistory = [
    {
      status: "pending",
      date: new Date(),
    },
    {
      status: "confirmed",
      date: new Date(),
    },
  ];
  const { backUrl, ...payloadData } = req.body;
  const order = await OrderModel.create(payloadData);
  // Lấy returnUrl từ frontend gửi lên, nếu không có thì sử dụng mặc định
  const returnUrl = req.body?.returnUrl || process.env.vnp_ReturnUrl;
  let date = new Date();
  let orderId = order?._id;
  // Tạo URL thanh toán
  const paymentUrl = vnpay.buildPaymentUrl({
    vnp_Amount: order?.finalAmount,
    vnp_IpAddr:
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.ip,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: "Thanh toan cho ma GD:" + orderId,
    vnp_OrderType: ProductCode.Other,
    vnp_ReturnUrl: returnUrl, // Đường dẫn nên là của frontend
    vnp_Locale: VnpLocale.VN,
  });
  return res.send({ paymentUrl });
};
export const vnpayReturn = async (req, res) => {
  let vnp_Params = req.query;
  const orderId = vnp_Params["vnp_TxnRef"];
  const responseCode = vnp_Params["vnp_ResponseCode"];
  switch (responseCode) {
    case "24":
      return await deleteOrderAndRespond(
        orderId,
        res,
        "Giao dịch không thành công do: Khách hàng hủy giao dịch",
        24
      );
    case "11":
      return await deleteOrderAndRespond(
        orderId,
        res,
        "Giao dịch không thành công do: Khách hàng hủy giao dịch",
        11
      );
    case "12":
      return await deleteOrderAndRespond(
        orderId,
        res,
        "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa",
        12
      );
    case "75":
      return await deleteOrderAndRespond(
        orderId,
        res,
        "Ngân hàng thanh toán đang bảo trì.",
        75
      );
    case "00":
      return await handleVnpayResponse(orderId, res);
    default:
      return await deleteOrderAndRespond(
        orderId,
        res,
        "Giao dịch không thành công",
        99
      );
      break;
  }
};
async function deleteOrderAndRespond(orderId, res, message, statusCode) {
  await OrderModel.findByIdAndDelete(orderId);
  return res.status(402).send({ message, statusCode });
}
export async function handleVnpayResponse(orderId, res) {
  const data = await OrderModel.findById(orderId)
    .populate("userId discountId")
    .populate({
      path: "orderItems.productId",
    })
    .populate({
      path: "orderItems.selectedVariant",
      populate: {
        path: "colorId sizeId",
      },
    });

  const boughtProducts = data?.orderItems?.map((item) => ({
    id: item?.productId?._id?.toString(),
    quantity: item?.quantity,
    variantId: item?.selectedVariant?._id?.toString(),
  }));
  //Trừ sản phẩm  và cập nhập số lượng bán
  const updatePromises = boughtProducts.map((item) =>
    Promise.all([
      VariantModel.findByIdAndUpdate(item.variantId, {
        $inc: { stock: -item.quantity },
      }),

      ProductModel.findByIdAndUpdate(item.id, {
        $inc: { sold: item.quantity },
      }),
    ])
  );
  await Promise.all(updatePromises);
  const cart = await CartModel.findOne({ userId: data?.userId?._id });
  data?.orderItems?.forEach((itemCart) => {
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === itemCart.productId._id.toString() &&
        item.selectedVariant.toString() ===
          itemCart.selectedVariant._id.toString()
    );
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
    }
  });
  await cart.save();
  const dataCart = await CartModel.findOne({ userId: data?.userId?._id })
    .populate("userId")
    .populate({
      path: "items.productId",
      populate: [{ path: "variants", populate: { path: "colorId sizeId" } }],
    })
    .populate("items.selectedVariant")
    .populate({
      path: "items.selectedVariant",
      populate: "colorId sizeId",
    });
  return res.send({ message: "Successfully", data: { order: data, dataCart } });
}
