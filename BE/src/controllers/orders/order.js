import mongoose from "mongoose";
import OrderModel from "../../models/oders/order.js";
import { handleVnpayResponse } from "../payments/vnpay.js";

export const createOrderPayUponReceipt = async (req, res) => {
  try {
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
    const data = await OrderModel.create(req.body);
    return res.send({ message: "Đặt hàng thành công", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const verifyOrderPayUponReceipt = async (req, res) => {
  return handleVnpayResponse(req.params.id, res);
};
export const getOrderById = async (req, res) => {
  try {
    const data = await OrderModel.findById(req.params.id)
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
    if (!data) {
      return res.status(404).send({ message: "Không tồn tại đơn hàng" });
    }
    return res.send({ message: "Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const getOrderByUserId = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.user._id.toString();
    const query = status ? { userId, status } : { userId };
    const data = await OrderModel.find(query)
      .populate("userId discountId")
      .populate({
        path: "orderItems.productId",
      })
      .populate({
        path: "orderItems.selectedVariant",
        populate: {
          path: "colorId sizeId",
        },
      })
      .sort({ createdAt: "desc" });
    if (!data) {
      return res.status(404).send({ message: "Không có đơn hàng nào" });
    }
    return res.send({ message: "Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, orderId } = req.body;
    if (!status) {
      return res.status(400).send({ message: "Bạn chưa nhập trạng thái" });
    }
    if (!orderId) {
      return res.status(400).send({ message: "Bạn chưa nhập mã đơn hàng" });
    }
    const data = await OrderModel.findByIdAndUpdate(orderId, {
      status,
    });
    if (!data) {
      return res.status(404).send({ message: "Không tìm thấy đơn hàng" });
    }
    return res.send({ message: "Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
