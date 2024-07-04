import DiscountUsageModel from "../../models/oders/discounts/discount-usage.js";
import DiscountModel from "../../models/oders/discounts/discount.js";

export const createDiscount = async (req, res) => {
  try {
    req.body.code = req.body.code.toUpperCase();
    const data = await DiscountModel.create(req.body);
    return res.send({ message: "Tạo mã giảm giá thành công", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const getDiscountStillValidByIdUser = async (req, res) => {
  try {
    const data = await DiscountModel.find({
      expiryDate: { $gt: new Date() },
    }).lean();
    const discountUsage = await DiscountUsageModel.find({
      userId: req.user._id,
    });
    data.forEach((item) => {
      const couponUsed = discountUsage.find(
        (discount) =>
          discount.discountId.toHexString() == item._id.toHexString()
      );
      item.usageCount = couponUsed?.usageCount || 0;
    });
    return res.send({
      message: "Lấy mã giảm giá thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
