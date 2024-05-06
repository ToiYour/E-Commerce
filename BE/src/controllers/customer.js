import Customer from "../models/customer.js";
import bcryptjs from "bcryptjs";
export const createCustomer = async (req, res) => {
  try {
    const isUserName = await Customer.findOne({
      user_name: req.body.user_name,
    });
    if (isUserName) {
      return res.status(400).send("Tên đăng nhập này đã tổn tại");
    }
    req.body.password = await bcryptjs.hash(req.body.password, 10);
    const data = await Customer.create(req.body);
    if (!data) {
      return res.status(500).send({ messages: "Thêm mới thất bại" });
    }
    return res.send({ message: "Thêm mới thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server", error });
  }
};
export const updateCustomer = async (req, res) => {
  try {
    const { _id, updatedAt, createdAt, password, _v, ...newData } = req.body;
    const data = await Customer.findByIdAndUpdate(req.params.id, newData, {
      new: true,
    });
    if (!data) {
      return res.status(500).send({ messages: "Cập nhập thất bại" });
    }
    return res.send({ message: "Cập nhập thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};

export const getAllCustomers = async (req, res) => {
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
      data = await Customer.paginate(
        {
          [sortBy]: order,
        },
        options
      );
    } else {
      data = await Customer.paginate({}, options);
    }
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getByIdCustomer = async (req, res) => {
  try {
    const data = await Customer.findById(req.params.id);
    if (!data) {
      return res.status(500).send({ messages: "Get data thất bại" });
    }
    return res.send({ message: "Get data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};

export const deleteByIdCustomer = async (req, res) => {
  try {
    const data = await Customer.findByIdAndDelete({ _id: req.params.id });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const deleteAllCustomers = async (req, res) => {
  try {
    const data = await Customer.deleteMany({ _id: { $in: req.body } });
    if (!data) {
      return res.status(500).send({ messages: "Xoá data thất bại" });
    }
    return res.send({ message: "Xoá data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};

export const updateAccoutStatus = async (req, res) => {
  try {
    const data = await Customer.findByIdAndUpdate(
      { _id: req.params.id },
      { account_status: req.body.status }
    );
    if (!data) {
      return res.status(500).send({ messages: "Cập nhập data thất bại" });
    }
    return res.send({ message: "Cập nhập data thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
