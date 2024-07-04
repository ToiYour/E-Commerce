import CartModel from "../models/carts/cart.js";
import VariantModel from "../models/products/variant.js";
import ProductModel from "../models/products/product.js";
import DiscountModel from "../models/oders/discounts/discount.js";
export const addToCart = async (req, res) => {
  try {
    const orderProduct = await ProductModel.findOne({
      slug: req.body.slug,
    }).populate({
      path: "variants",
      match: {
        colorId: req.body.colorId,
        sizeId: req.body.sizeId,
      },
    });
    const orderProductVariant = orderProduct?.variants.find(
      (item) => item?.colorId?.toString() && item?.sizeId?.toString()
    );
    const payload = {
      userId: req.user._id,
      items: [
        {
          productId: orderProduct._id,
          quantity: req.body.quantity,
          selectedVariant: orderProduct.variants[0]._id,
        },
      ],
    };
    // Kiểm tra tồn tại userId trong collection Cart
    let cart = await CartModel.findOne({ userId: req.user._id });
    if (cart) {
      // Check tồn tại sản phẩm với biến thể
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() == orderProduct._id &&
          item.selectedVariant.toString() == orderProduct.variants[0]._id
      );
      if (itemIndex > -1) {
        const requestedQuantity = req.body.quantity;
        const availableStock = orderProductVariant.stock;
        const currentQuantity = cart.items[itemIndex].quantity;
        const newQuantity = Math.min(
          availableStock,
          currentQuantity + requestedQuantity
        );
        cart.items[itemIndex].quantity = newQuantity;
        const currentItem = cart.items.splice(itemIndex, 1)[0];
        cart.items.unshift(currentItem);
      } else {
        cart.items.unshift(payload.items[0]);
      }
    } else {
      cart = new CartModel(payload);
    }
    await cart.save();
    const data = await CartModel.findOne({ userId: cart.userId })
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
    return res.send({ message: "Thêm vào giỏ hàng thành công", data });
    // const data = await CartModel.create(payload);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const getMyShoppingCart = async (req, res) => {
  try {
    const data = await CartModel.findOne({ userId: req.user._id })
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
    if (!data) {
      return res.status(404).send({ message: "Không tìm thấy giỏ hàng" });
    }
    return res.send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const updateQuantityItemCart = async (req, res) => {
  try {
    let cart = await CartModel.findOne({ userId: req.user._id });
    const indexItem = cart.items.findIndex(
      (item) => item._id == req.body.itemId
    );
    if (indexItem > -1) {
      cart.items[indexItem].quantity = req.body.quantity;
    } else {
      return res
        .status(404)
        .send({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
    }
    await cart.save();
    const data = await CartModel.findOne({ userId: req.user._id })
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
    return res.send({
      message: "Cập nhập số lượng thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const getCartCheckoutByItemIds = async (req, res) => {
  try {
    const { state, discount } = req.query;
    const itemCartIds = state.split(",");
    if (!state) {
      return res.status(404).send({ message: "Not found" });
    }
    const data = await CartModel.findOne({ userId: req.user._id })
      .populate("userId")
      .populate({
        path: "items.productId",
        populate: [{ path: "variants", populate: { path: "colorId sizeId" } }],
      })
      .populate("items.selectedVariant")
      .populate({
        path: "items.selectedVariant",
        populate: "colorId sizeId",
      })
      .lean();
    let order = data?.items?.filter((item) => {
      return itemCartIds.includes(item._id.toHexString());
    });
    const voucher = await DiscountModel.findById(discount);

    order = order.map((item) => {
      return {
        ...item,
        totalPrice:
          (Number(item?.productId?.price) +
            Number(item?.selectedVariant?.extra_price)) *
          item?.quantity,
      };
    });
    let totalPayment = order.reduce(
      (total, item) => {
        return {
          totalPrice: total.totalPrice + item.totalPrice,
          totalQuantity: total.totalQuantity + item.quantity,
        };
      },
      { totalPrice: 0, totalQuantity: 0 }
    );
    totalPayment.finalAmount = voucher
      ? voucher.isPercentage
        ? (voucher?.value * totalPayment.totalPrice) / 100
        : totalPayment.totalPrice - voucher?.value
      : totalPayment.totalPrice;
    res.send({
      message: "Successfully",
      data: { order, totalPayment, voucher },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const removeItemsFromCart = async (req, res) => {
  try {
    const itemIds = req.query.itemIds ? req.query.itemIds.split(",") : [];
    if (!itemIds.length) {
      return res
        .status(400)
        .send({ message: "Id sản phẩm giỏ hàng là bắt buộc" });
    }

    let cart = await CartModel.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).send({ message: "Không tìm thấy giỏ hàng" });
    }

    cart.items = cart.items.filter(
      (item) => !itemIds.includes(item._id.toString())
    );

    await cart.save();

    const data = await CartModel.findOne({ userId: req.user._id })
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

    return res.send({
      message: "Xóa sản phẩm khỏi giỏ hàng thành công",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const updateVariantItemCart = async (req, res) => {
  try {
    let message;
    let product = await ProductModel.findById(req.body.productId).populate(
      "variants"
    );
    let cart = await CartModel.findOne({ userId: req.user._id });
    const variantExits = product?.variants?.find(
      (item) =>
        item.colorId == req.body.colorId && item.sizeId == req.body.sizeId
    ); // Biến thể
    const indexItem = cart.items.findIndex(
      (item) => item._id == req.body.itemId
    ); // Index sản phẩm trong giỏ hàng cần cập nhập
    const variantItemIndex = cart.items.findIndex(
      (item) =>
        item?.selectedVariant?.toString() == variantExits?._id.toString()
    ); // Index sản phẩm trong giỏ có biến thể khớp với biến thể đẩy lên
    if (indexItem > -1) {
      if (variantItemIndex > -1) {
        message =
          "Đã gộp 2 sản phẩm với màu và size đó trong giỏ hàng thành 1 ";
        cart.items[variantItemIndex].quantity =
          Number(cart.items[variantItemIndex].quantity) +
          Number(cart.items[indexItem].quantity);
        cart.items.splice(indexItem, 1);
      } else {
        message = "Cập nhập thành công";
        cart.items[indexItem].selectedVariant = variantExits._id;
      }
    } else {
      return res
        .status(404)
        .send({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
    }
    await cart.save();
    const data = await CartModel.findOne({ userId: req.user._id })
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
    return res.send({
      message,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
