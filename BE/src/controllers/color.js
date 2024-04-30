import Color from "../models/products/color.js";
export const createColor = async (req, res) => {
  try {
    const data = await Color.create(req.body);
    if (!data) {
      return res.status(500).send({ messages: "Thêm mới thất bại" });
    }
    return res.send({ message: "Thêm mới thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server", error });
  }
};
export const updateColor = async (req, res) => {
  try {
    const { name, status } = req.body;
    const data = await Color.findByIdAndUpdate(
      req.params.id,
      { name, status },
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
export const restoreAllColors = async (req, res) => {
  try {
    const data = await Color.restore({ _id: { $in: req.body } });
    if (!data) {
      return res.status(500).send({ messages: "Cập nhập thất bại" });
    }
    return res.send({ message: "Cập nhập thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const restoreByIdColor = async (req, res) => {
  try {
    const data = await Color.restore({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Cập nhập thất bại" });
    }
    return res.send({ message: "Cập nhập thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getAllNotSoftColors = async (req, res) => {
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
      data = await Color.paginate(
        {
          $or: [{ deleted: false }, { deleted: { $exists: false } }],
          [sortBy]: order,
        },
        options
      );
    } else {
      data = await Color.paginate(
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
export const getAllSoftColors = async (req, res) => {
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
      data = await Color.paginate({ deleted: true, [sortBy]: order }, options);
    } else {
      const paginatedDeletedColors = await Color.paginate(
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
    return res.send({ message: "Successfully", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getByIdColor = async (req, res) => {
  try {
    const data = await Color.findById(req.params.id);
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteSoftByIdColor = async (req, res) => {
  try {
    const data = await Color.delete({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteForeverByIdColor = async (req, res) => {
  try {
    const data = await Color.findByIdAndDelete({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteSoftAllColors = async (req, res) => {
  try {
    const data = await Color.delete({ _id: { $in: req.body } });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteForeverAllColors = async (req, res) => {
  try {
    const data = await Color.deleteMany({ _id: { $in: req.body } });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getComboboxColors = async (req, res) => {
  try {
    const data = await Color.find({
      status: true,
      $or: [{ deleted: false }, { deleted: { $exists: false } }],
    });
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
