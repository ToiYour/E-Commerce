import bcryptjs from "bcryptjs";
import sendMail from "../mails/mail-config.js";
import Customer from "../models/customer.js";
import OTP from "../models/otp.js";
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
      limit: 10,
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

export const forgotPassword = async (req, res) => {
  try {
    if (!req.body.user_name)
      return res.status(400).json({ message: "Bạn chưa nhập tên đăng nhập" });
    const isAccount = await Customer.findOne({ user_name: req.body.user_name });
    if (!isAccount)
      return res
        .status(400)
        .json({ message: "Tài khoản của bạn chưa được đăng ký" });
    const randomOTP = Math.floor(Math.random() * (99999 - 10000) + 10000);
    const payLoadMail = {
      to: isAccount.email,
      subject: "OTP Xác Thực Mật Khẩu",
      template: "otpmessage",
      context: {
        name: `${isAccount.name.last_name} ${isAccount.name.first_name}`,
        otp: randomOTP,
      },
    };
    sendMail(payLoadMail);
    let currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 15);
    const isOTP = await OTP.findOne({
      userId: isAccount._id,
    });
    if (isOTP) {
      await OTP.findByIdAndUpdate(isOTP._id, {
        userId: isAccount._id,
        email: isAccount.email,
        otp: randomOTP,
        expired: currentDate,
        completed: false,
      });
    } else {
      await OTP.create({
        userId: isAccount._id,
        email: isAccount.email,
        otp: randomOTP,
        expired: currentDate,
        completed: false,
      });
    }
    return res.send({
      user: isAccount,
      message:
        "Gửi mã otp thành công mời bạn kiểm tra email, có thể email đến bạn chậm chỡ 1-3 phút!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const compareOTP = async (req, res) => {
  try {
    if (!req.body.otp) {
      return res.status(400).send({ messages: "Bạn chưa nhập mã OTP" });
    }
    const isExistOTP = await OTP.findOne({ userId: req.body.userId });
    const currentTime = new Date();
    if (currentTime.getTime() > isExistOTP.expired.getTime()) {
      return res.status(400).send({ messages: "Mã OTP đã hết hạn!" });
    }
    const isVerifyOTP = req.body.otp == isExistOTP.otp;
    if (!isVerifyOTP) {
      return res
        .status(400)
        .send({ messages: "Mã OTP không đúng vui lòng thử lại!" });
    }
    await OTP.findByIdAndUpdate(isExistOTP._id, { completed: true });
    return res.status(200).send({
      messages:
        "Xác thực OTP thành công. Bạn có thể đặt lại mật khẩu mới cho tài khoản của mình.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const resetPassword = async (req, res) => {
  try {
    if (!req.body.password)
      return res.status(400).send({ messages: "Bạn chưa nhập mật khẩu mới" });
    req.body.password = await bcryptjs.hash(req.body.password, 10);
    await Customer.findByIdAndUpdate(req.body.userId, {
      password: req.body.password,
    });
    return res
      .status(200)
      .send({ messages: "Cập nhập mật khẩu mới thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
