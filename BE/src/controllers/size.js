import Size from "../models/products/size.js";
export const createSize = async (req, res) => {
  try {
    const data = await Size.create(req.body);
    if (!data) {
      return res.status(500).send({ messages: "Thêm mới thất bại" });
    }
    return res.send({ message: "Thêm mới thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server", error });
  }
};
export const updateSize = async (req, res) => {
  try {
    const { name, status } = req.body;
    const data = await Size.findByIdAndUpdate(
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
export const restoreAllSizes = async (req, res) => {
  try {
    const data = await Size.restore({ _id: { $in: req.body } });
    if (!data) {
      return res.status(500).send({ messages: "Cập nhập thất bại" });
    }
    return res.send({ message: "Cập nhập thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const restoreByIdSize = async (req, res) => {
  try {
    const data = await Size.restore({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Cập nhập thất bại" });
    }
    return res.send({ message: "Cập nhập thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getAllNotSoftSizes = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const order = req.query.order || "";
    const sortBy = req.query.sortBy || "";
    const options = {
      page,
      limit: 10,
    };
    let data;
    if (sortBy && order != "all") {
      data = await Size.paginate(
        {
          $or: [{ deleted: false }, { deleted: { $exists: false } }],
          [sortBy]: order,
        },
        options
      );
    } else {
      data = await Size.paginate(
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
export const getAllSoftSizes = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const order = req.query.order || "";
    const sortBy = req.query.sortBy || "";
    const options = {
      page,
      limit: 10,
      withDeleted: true,
    };
    let data;
    if (sortBy && order != "all") {
      data = await Size.paginate({ deleted: true, [sortBy]: order }, options);
    } else {
      const paginatedDeletedSizes = await Size.paginate(
        {
          deleted: true,
        },
        options
      );
      data = paginatedDeletedSizes;
    }
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Successfully", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getByIdSize = async (req, res) => {
  try {
    const data = await Size.findById(req.params.id);
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteSoftByIdSize = async (req, res) => {
  try {
    const data = await Size.delete({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteForeverByIdSize = async (req, res) => {
  try {
    const data = await Size.findByIdAndDelete({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteSoftAllSizes = async (req, res) => {
  try {
    const data = await Size.delete({ _id: { $in: req.body } });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteForeverAllSizes = async (req, res) => {
  try {
    const data = await Size.deleteMany({ _id: { $in: req.body } });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getComboboxSizes = async (req, res) => {
  try {
    const data = await Size.find({
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
