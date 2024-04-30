import mongoose from "mongoose";
import Product from "../models/products/product.js";
import Variant from "../models/products/variant.js";
// import slugify from "slugify";
export const createProduct = async (req, res) => {
  try {
    const data = await Product.create(req.body);
    if (!data) {
      return res.status(500).send({ messages: "Thêm mới thất bại" });
    }
    return res.send({ message: "Thêm mới thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server", error });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const order = req.query.order || "";
    const sortBy = req.query.sortBy || "";
    const arrange = req.query.arrange || "createdAt";
    const orderBy = req.query.orderBy || "asc";
    const options = {
      page,
      limit: 4,
      sort: {
        [arrange]: orderBy,
      },
      populate: [
        {
          path: "variants",
          populate: ["colorId", "sizeId"],
        },
        "category",
      ],
    };
    let data;
    if (sortBy && order != "all") {
      data = await Product.paginate(
        {
          $or: [{ deleted: false }, { deleted: { $exists: false } }],
          [sortBy]: order,
        },
        options
      );
    } else {
      const paginatedDeletedColors = await Product.paginate(
        {
          $or: [{ deleted: false }, { deleted: { $exists: false } }],
        },
        options
      );
      data = paginatedDeletedColors;
    }

    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server", error });
  }
};
//
export const getAllSoftProduct = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const order = req.query.order || "";
    const sortBy = req.query.sortBy || "";
    const arrange = req.query.arrange || "createdAt";
    const orderBy = req.query.orderBy || "asc";
    const options = {
      page,
      limit: 4,
      sort: {
        [arrange]: orderBy,
      },
      populate: [
        {
          path: "variants",
          populate: ["colorId", "sizeId"],
        },
        "category",
      ],
    };
    let data;
    if (sortBy && order != "all") {
      data = await Product.paginate(
        { deleted: true, [sortBy]: order },
        options
      );
    } else {
      const paginatedDeletedColors = await Product.paginate(
        {
          deleted: true,
        },
        options
      );
      data = paginatedDeletedColors;
    }

    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data soft thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server", error });
  }
};
export const getDetailProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryId",
        },
      },
      {
        $lookup: {
          from: "variants",
          localField: "variants",
          foreignField: "_id",
          as: "unpackedVariants", // Tránh xung đột với "variants" ban đầu
        },
      },
      {
        $unwind: "$unpackedVariants", // Giải cấu trúc mảng "unpackedVariants"
      },
      {
        $lookup: {
          from: "colors",
          localField: "unpackedVariants.colorId",
          foreignField: "_id",
          as: "colorId", // Biệt danh rõ ràng hơn cho thông tin màu sắc
        },
      },
      {
        $lookup: {
          from: "sizes",
          localField: "unpackedVariants.sizeId",
          foreignField: "_id",
          as: "sizeId", // Biệt danh rõ ràng hơn cho thông tin màu sắc
        },
      },
      {
        $group: {
          _id: "$_id", // Duy trì cấu trúc tài liệu ban đầu (tùy chọn)
          name: { $first: "$name" },
          category: { $first: "$categoryId" }, // Giả sử bạn muốn danh mục đầu tiên
          images: { $first: "$images" },
          price: { $first: "$price" },
          views: { $first: "$views" },
          desc: { $first: "$desc" },
          variants: {
            $push: {
              // Kết hợp các biến thể đã giải nén với thông tin màu sắc

              _id: "$unpackedVariants._id",

              extra_price: "$unpackedVariants.extra_price",
              stock: "$unpackedVariants.stock",
              deleted: "$unpackedVariants.deleted",
              // Các trường biến thể khác (thêm nếu cần)
              colorId: { $first: "$colorId" },
              sizeId: { $first: "$sizeId" },
            },
          },
          totalStock: { $sum: "$unpackedVariants.stock" },
        },
      },
    ]);
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server", error });
  }
};
// Xoá mềm
export const deleteSoftByIdProduct = async (req, res) => {
  try {
    const data = await Product.delete({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteSoftAllProduct = async (req, res) => {
  try {
    const data = await Product.delete({ _id: { $in: req.body } });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};

export const deleteForeverByIdProduct = async (req, res) => {
  try {
    const variant = await Product.findById(req.params.id);
    await Variant.deleteMany({ _id: { $in: variant.variants } });
    const data = await Product.findByIdAndDelete({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteForeverAllProduct = async (req, res) => {
  try {
    const productDelete = await Product.find({ _id: { $in: req.body } });
    const variantIds = productDelete.map((product) => product.variants);
    await Variant.deleteMany({ _id: { $in: variantIds.flat() } });
    const data = await Product.deleteMany({ _id: { $in: req.body } });
    if (!data) {
      return res.send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const restoreAllProduct = async (req, res) => {
  try {
    const data = await Product.restore({ _id: { $in: req.body } });
    if (!data) {
      return res.status(500).send({ messages: "Cập nhập thất bại" });
    }
    return res.send({ message: "Cập nhập thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const restoreByIdProduct = async (req, res) => {
  try {
    const data = await Product.restore({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Cập nhập thất bại" });
    }
    return res.send({ message: "Cập nhập thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getByIdUpdateProduct = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id).populate({
      path: "variants",
      populate: ["colorId", "sizeId"],
    });
    if (!data) {
      return res.status(500).send({ messages: "Get  thất bại" });
    }
    return res.send({ message: "Get  thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const prevProduct = await Product.findById(req.params.id);
    await Variant.deleteMany({
      _id: { $in: prevProduct.variants },
    });
    const data = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!data) {
      return res.status(500).send({ messages: "Cập nhập  thất bại" });
    }
    return res.send({ message: "Cập nhập  thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
