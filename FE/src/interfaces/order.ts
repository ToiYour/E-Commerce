import { ICartItem } from "./cart";
import { ICustomer } from "./customer";
export enum EOrderStatus {
  "pending" = "Đơn hàng đã đặt",
  "confirmed" = "Đã xác nhận thông tin thanh toán",
  "shipped" = "Đã giao cho ĐVVC",
  "delivered" = "Đã nhận được hàng",
  "cancelled" = "Đã huỷ",
}
export interface IDiscount {
  _id: string;
  code: string;
  value: number;
  isPercentage: boolean;
  minOrderAmount: number;
  expiryDate: string;
  maxUsagePerUser: number;
  isPublic: boolean;
}
export interface IOrderPayment {
  _id?: string;
  userId?: ICustomer;
  recipientPhone?: string;
  recipientName?: string;
  orderItems: ICartItem[];
  totalAmount?: number;
  payment?: {
    amount: number;
    desc: string;
    method: string;
  };
  status?: string;
  statusHistory?: [{ status: string; data: string }];
  discountId?: IDiscount;
  finalAmount?: number;
  noteMessage?: string;
  address?: {
    province?: string;
    district?: string;
    commune?: string;
    specific?: string;
  };
  isEvaluating?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export enum MethodPayments {
  "cash_on_delivery" = "Thanh toán khi nhận hàng",
  // "momo_e_wallet" = "Thanh toán bằng MoMo",
  // "zalo_e_wallet" = "Thanh toán bằng ZaloPay",
  "vnpay_bank" = "Thanh toán VNPay",
}
export enum StatusOrder {
  "" = "Tất cả",
  "pending" = "Chờ xác nhận",
  "confirmed" = "Chờ lấy hàng",
  "shipped" = "Chờ giao hàng",
  "delivered" = "Đã giao",
  "cancelled" = "Đã huỷ",
}
