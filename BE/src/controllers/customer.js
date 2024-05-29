import sendMail from "../mails/mail-config.js";
import Customer from "../models/customer.js";
import OTP from "../models/otp.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import randomstring from "randomstring";
const blacklistedTokens = new Set();
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
export const loginAccount = async (req, res) => {
  try {
    const isAccount = await Customer.findOne({
      user_name: req.body.user_name,
    });
    if (!isAccount) {
      return res
        .status(404)
        .send({ message: "Tài khoản của bạn chưa đăng ký!" });
    }
    const isConfirmPassword = await bcryptjs.compare(
      req.body.password,
      isAccount.password
    );
    if (!isConfirmPassword) {
      return res
        .status(404)
        .send({ message: "Mật khẩu bạn nhập không đúng bạn thử nhớ lại xem." });
    }
    if (isAccount.account_status)
      return res.status(400).send({ message: "Tài khoản của bạn đã bị khoá" });
    const access_token = jsonwebtoken.sign(
      { id: isAccount._id },
      process.env.ACCESS_TOKEN
    );
    return res.send({ access_token });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export function logOut(req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  blacklistedTokens.add(token);
  return res.status(200).send({ message: "Logout successfully" });
}
function isTokenBlacklisted(token) {
  return blacklistedTokens.has(token);
}
export const authenticateToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(400);

  if (isTokenBlacklisted(token)) {
    return res
      .status(400)
      .send({ message: "Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại" });
  }

  jsonwebtoken.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    const account = await Customer.findById(user.id);
    if (account?.account_status)
      return res.status(400).send({ message: "Tài khoản của bạn đã bị khoá" });
    return res.status(200).send({ status: "ok", account });
  });
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
export const newPasswordAccountLink = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(400);
    jsonwebtoken.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
      if (err) return res.sendStatus(403);
      req.body.newPassword = await bcryptjs.hash(req.body.newPassword, 10);
      await Customer.findByIdAndUpdate(user.id, {
        password: req.body.newPassword,
      });
      return res.send({ message: "Đặt mật khẩu thành công!" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const changePassword = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(400);
    jsonwebtoken.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
      if (err) return res.sendStatus(403);
      const isAccout = await Customer.findById(user.id);
      const isComparePass = await bcryptjs.compare(
        req.body.password,
        isAccout.password
      );
      if (!isComparePass)
        return res
          .status(400)
          .send({ message: "Mật khẩu cũ không đúng bạn thử nhớ lại xem" });
      req.body.newPassword = await bcryptjs.hash(req.body.newPassword, 10);
      await Customer.findByIdAndUpdate(user.id, {
        password: req.body.newPassword,
      });
      return res.send({ message: "Đổi mật khẩu thành công!" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const createUserWithGoogleAndFacebook = async (req, res) => {
  try {
    const isUid = await Customer.findOne({ uid: req.body.uid });
    console.log(isUid);
    if (isUid) {
      if (isUid.account_status)
        return res
          .status(400)
          .send({ message: "Tài khoản của bạn đã bị khoá" });
      // Nếu không khoá trả về token
      const access_token = jsonwebtoken.sign(
        { id: isUid._id },
        process.env.ACCESS_TOKEN
      );
      return res.send({ message: "Đăng nhập thành công", access_token });
    } else {
      req.body.user_name = randomstring
        .generate(8)
        .concat(req.body.user_name.slice(-5));
      const data = await Customer.create(req.body);
      const access_token = jsonwebtoken.sign(
        { id: data._id },
        process.env.ACCESS_TOKEN
      );
      return res.send({ message: "Đăng nhập thành công", access_token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
