import Category from "../models/products/category.js";
// import slugify from "slugify";
export const createCategory = async (req, res) => {
  try {
    // req.body.slug = slugify(req.body.name, "-");
    const data = await Category.create(req.body);
    if (!data) {
      return res.status(500).send({ messages: "Thêm mới thất bại" });
    }
    return res.send({ message: "Thêm mới thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server", error });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { name, status, img } = req.body;
    const data = await Category.findByIdAndUpdate(
      req.params.id,
      { name, img, status },
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(500).send({ messages: "Cập nhập thất bại" });
    }
    return res.send({ message: "Cập nhập thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const restoreAllCategorys = async (req, res) => {
  try {
    const data = await Category.restore({ _id: { $in: req.body } });
    if (!data) {
      return res.status(500).send({ messages: "Cập nhập thất bại" });
    }
    return res.send({ message: "Cập nhập thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const restoreByIdCategory = async (req, res) => {
  try {
    const data = await Category.restore({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Cập nhập thất bại" });
    }
    return res.send({ message: "Cập nhập thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getAllNotSoftCategorys = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const order = req.query.order || "";
    const sortBy = req.query.sortBy || "";
    const options = {
      page,
      limit: 4,
    };
    let data;
    if (sortBy && order != "all") {
      data = await Category.paginate(
        {
          $or: [{ deleted: false }, { deleted: { $exists: false } }],
          [sortBy]: order,
        },
        options
      );
    } else {
      data = await Category.paginate(
        { $or: [{ deleted: false }, { deleted: { $exists: false } }] },
        options
      );
    }
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getAllSoftCategorys = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const order = req.query.order || "";
    const sortBy = req.query.sortBy || "";
    const options = {
      page,
      limit: 4,
    };
    let data;
    if (sortBy && order != "all") {
      data = await Category.paginate(
        { deleted: true, [sortBy]: order },
        options
      );
    } else {
      const paginatedDeletedCategorys = await Category.paginate(
        {
          deleted: true,
        },
        options
      );
      data = paginatedDeletedCategorys;
    }
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Successfully", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getByIdCategory = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteSoftByIdCategory = async (req, res) => {
  try {
    const data = await Category.delete({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteForeverByIdCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteSoftAllCategorys = async (req, res) => {
  try {
    const data = await Category.delete({ _id: { $in: req.body } });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteForeverAllCategorys = async (req, res) => {
  try {
    const data = await Category.deleteMany({ _id: { $in: req.body } });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getComboboxCategory = async (req, res) => {
  try {
    const data = await Category.find({ status: true });
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getCategoryBySlug = async (req, res) => {
  try {
    const data = await Category.findOne({ slug: req.params.slug });
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
