import mongoose from "mongoose";
import Category from "../models/products/category.js";
import Product from "../models/products/product.js";
import Variant from "../models/products/variant.js";
// import slugify from "slugify";
export const createProduct = async (req, res) => {
  try {
    req.body.brand = req.body.brand.toUpperCase();
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
    const { price: findMaxPriceProduct } = await Product.findOne(
      {},
      { price: true }
    ).sort({
      price: "desc",
    });

    let categoryId; //Danh sách ID danh mục  ( lấy sản phẩm theo ID danh mục)
    let listVariantId; // Danh sách ID biến thể (lấy sản phẩm theo ID màu, ID size)
    if (req.query.category) {
      categoryId = await Category.findOne({ slug: req.query.category }, "_id");
    }
    if (req.query.size) {
      listVariantId = Array.from(
        new Set(await Variant.find({ sizeId: req.query.size }, "_id"))
      );
      listVariantId = listVariantId.map((v) => v._id.toString());
    }
    if (req.query.color) {
      listVariantId = Array.from(
        new Set(await Variant.find({ colorId: req.query.color }, "_id"))
      );
      listVariantId = listVariantId.map((v) => v._id.toString());
    }
    // Check nếu cả size và color tồn tại
    if (req.query.size && req.query.color) {
      listVariantId = Array.from(
        new Set(
          await Variant.find(
            { sizeId: req.query.size, colorId: req.query.color },
            "_id"
          )
        )
      );
      listVariantId = listVariantId.map((v) => v._id.toString());
    }

    const page = req.query.page || 1;
    const order = req.query.order || "";
    const sortBy = req.query.sortBy || "";
    const arrange = req.query.arrange || "createdAt";
    const orderBy = req.query.orderBy || "asc";
    const minPrice = req.query.minPrice || 0;
    const maxPrice = req.query.maxPrice || findMaxPriceProduct;
    const options = {
      page,
      limit: 8,
      sort: {
        [arrange]: orderBy,
      },
      populate: [
        {
          path: "variants",
          populate: ["colorId", "sizeId"],
        },
        { path: "category" },
      ],
    };

    let data;
    if (sortBy && order != "all") {
      const query = {
        $or: [{ deleted: false }, { deleted: { $exists: false } }],
        price: { $gte: minPrice, $lte: maxPrice },
        [sortBy]: order,
      };
      if (req.query.category) {
        query.category = categoryId._id;
      }

      if (listVariantId) {
        query.variants = { $in: listVariantId };
      }
      if (req.query.brand) {
        let listBrand = req.query.brand.split(",");
        query.brand = { $in: listBrand };
      }
      if (req.query.search) {
        query = {
          ...query,
          $text: {
            $search: `\"${req.query.search}\"`,
            $caseSensitive: false,
          },
        };
      }
      data = await Product.paginate(query, options);
    } else {
      let query = {
        $or: [{ deleted: false }, { deleted: { $exists: false } }],
        price: { $gte: minPrice, $lte: maxPrice },
      };
      if (req.query.category) query.category = categoryId._id;
      if (listVariantId) {
        query.variants = { $in: listVariantId };
      }
      if (req.query.brand) {
        let listBrand = req.query.brand.split(",");
        query.brand = { $in: listBrand };
      }
      if (req.query.search) {
        query = {
          ...query,
          $text: {
            $search: `\"${req.query.search}\"`,
            $caseSensitive: false,
          },
        };
      }
      const paginatedDeletedColors = await Product.paginate(query, options);
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
export const getSimilarProducts = async (req, res) => {
  try {
    let categoryId;
    if (req.query.category) {
      categoryId = await Category.findOne({ slug: req.query.category }, "_id");
    }
    const data = await Product.find({
      category: categoryId._id,
      slug: { $ne: req.query.slug },
    });
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
      limit: 8,
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
          as: "unpackedVariants",
        },
      },
      {
        $unwind: "$unpackedVariants",
      },
      {
        $lookup: {
          from: "colors",
          localField: "unpackedVariants.colorId",
          foreignField: "_id",
          as: "colorId",
        },
      },
      {
        $lookup: {
          from: "sizes",
          localField: "unpackedVariants.sizeId",
          foreignField: "_id",
          as: "sizeId",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          brand: { $first: "$brand" },
          category: { $first: "$categoryId" },
          images: { $first: "$images" },
          price: { $first: "$price" },
          views: { $first: "$views" },
          desc: { $first: "$desc" },
          sold: { $first: "$sold" },
          averageRating: { $first: "$averageRating" },
          variants: {
            $push: {
              _id: "$unpackedVariants._id",

              extra_price: "$unpackedVariants.extra_price",
              stock: "$unpackedVariants.stock",
              deleted: "$unpackedVariants.deleted",

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
export const getDetailProductBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;

    const data = await Product.aggregate([
      { $match: { slug } },
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
          as: "unpackedVariants",
        },
      },
      {
        $unwind: "$unpackedVariants",
      },
      {
        $lookup: {
          from: "colors",
          localField: "unpackedVariants.colorId",
          foreignField: "_id",
          as: "colorId",
        },
      },
      {
        $lookup: {
          from: "sizes",
          localField: "unpackedVariants.sizeId",
          foreignField: "_id",
          as: "sizeId",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          category: { $first: "$categoryId" },
          images: { $first: "$images" },
          price: { $first: "$price" },
          views: { $first: "$views" },
          desc: { $first: "$desc" },
          slug: { $first: "$slug" },
          sold: { $first: "$sold" },
          averageRating: { $first: "$averageRating" },
          variants: {
            $push: {
              _id: "$unpackedVariants._id",

              extra_price: "$unpackedVariants.extra_price",
              stock: "$unpackedVariants.stock",
              deleted: "$unpackedVariants.deleted",
              colorId: { $first: "$colorId" },
              sizeId: { $first: "$sizeId" },
            },
          },

          totalStock: { $sum: "$unpackedVariants.stock" },
        },
      },
    ]);
    await Product.findOneAndUpdate({ slug: slug }, { $inc: { views: 1 } });
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data thành công", data: data[0] });
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
    req.body.brand = req.body.brand.toUpperCase();
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
export const getMaxPriceProduct = async (req, res) => {
  try {
    const data = await Product.findOne({}, { price: true }).sort({
      price: "desc",
    });
    if (!data) {
      return res
        .status(500)
        .send({ messages: "Lấy giá sản phẩm cao nhất  thất bại" });
    }
    return res.send({ message: "Lấy giá sản phẩm cao nhất  thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getBrandProducts = async (req, res) => {
  try {
    const data = await Product.distinct("brand");
    if (!data) {
      return res
        .status(500)
        .send({ messages: "Lấy danh sách thương hiệu sản phẩm   thất bại" });
    }
    return res.send({
      message: "Lấy danh sách thương hiệu sản phẩm  thành công",
      data,
    });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
Product.collection.createIndex(
  { name: "text", desc: "text" },
  (err, result) => {
    if (err) {
      console.error("Error creating index:", err);
    } else {
      console.log("Index created:", result);
    }
  }
);
export const getSearchProducts = async (req, res) => {
  try {
    const data = await Product.find({
      $text: { $search: `\"${req.query.keywords}\"`, $caseSensitive: false },
    });
    if (!data) {
      return res
        .status(500)
        .send({ messages: "Lấy danh sách  sản phẩm   thất bại" });
    }
    return res.send({
      message: "Lấy danh sách  sản phẩm  thành công",
      data,
    });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server", error });
  }
};
