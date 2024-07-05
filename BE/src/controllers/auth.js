import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import RefreshTokenModel from "../models/refreshToken.js";
import Customer from "../models/customer.js";
import randomstring from "randomstring";
const generateAccessToken = async (value) => {
  return jsonwebtoken.sign(value, process.env.ACCESS_TOKEN, {
    expiresIn: "10m",
  });
};
const generateRefreshToken = async (value) => {
  return jsonwebtoken.sign(value, process.env.REFRESH_TOKEN, {
    expiresIn: "60d",
  });
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
        .status(403)
        .send({ message: "Mật khẩu bạn nhập không đúng bạn thử nhớ lại xem." });
    }
    if (isAccount.account_status)
      return res.status(403).send({ message: "Tài khoản của bạn đã bị khoá" });
    const access_token = await generateAccessToken({ id: isAccount._id });
    const refresh_token = await generateRefreshToken({ id: isAccount._id });
    const isRefreshToken = await RefreshTokenModel.findOne({
      userId: isAccount._id,
    });
    if (!isRefreshToken) {
      await RefreshTokenModel.create({
        userId: isAccount._id,
        token: refresh_token,
      });
    } else {
      await RefreshTokenModel.findByIdAndUpdate(isRefreshToken._id, {
        token: refresh_token,
      });
    }
    res.cookie("token", refresh_token, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      path: "/",
      httpOnly: true,
      sameSite: "None",
    });
    return res.send({
      message: "Đăng nhập thành công",
      user: isAccount,
      access_token,
    });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const getUser = (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(403)
        .send({ message: "Lấy thông tin người dùng thất bại" });
    }
    return res.send({ message: "Successfully logged in", user: req.user });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const refreshToken = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).send({ message: "Bạn chưa đăng nhập" });
    }
    jsonwebtoken.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
      if (err) {
        return res.status(403).send({
          message: "Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại",
        });
      }
      const isRefreshToken = await RefreshTokenModel.findOne({
        userId: user.id,
        token: token,
      });
      if (!isRefreshToken) {
        return res.status(403).send({
          message: "Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại",
        });
      }
      const access_token = await generateAccessToken({ id: user.id });
      const refresh_token = await generateRefreshToken({ id: user.id });
      await RefreshTokenModel.findByIdAndUpdate(isRefreshToken._id, {
        token: refresh_token,
      });
      res.cookie("token", refresh_token, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        path: "/",
        httpOnly: true,
        sameSite: "None",
      });
      return res.send({
        message: "Làm mới token thành công",
        access_token,
      });
    });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const logOut = async (req, res) => {
  try {
    const refreshToken = req.cookies.token;
    if (!refreshToken) {
      return res.status(403).send({
        message: "Bạn chưa đăng nhập ",
      });
    }
    jsonwebtoken.verify(
      refreshToken,
      process.env.REFRESH_TOKEN,
      async (err, user) => {
        if (err) {
          res.cookie("token", "", {
            maxAge: 0,
            sameSite: "None",
          });
          return res.status(200).send({
            message: "Đăng xuất thành công",
          });
        }
        await RefreshTokenModel.findOneAndDelete({
          userId: user.id,
        });
        res.cookie("token", "", {
          maxAge: 0,
          sameSite: "None",
        });

        return res.status(200).send({
          message: "Đăng xuất thành công",
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
export const changeProfileInformation = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).send({ message: "Bạn chưa đăng nhập" });
    }
    const data = await Customer.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    return res.send({
      message: "Thay đổi thông tin hồ sơ thành công",
      user: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ messages: "Lỗi server" });
  }
};
// Đăng nhập bằng liên kết
export const signInWithGoogleAndFacebook = async (req, res) => {
  try {
    const isAccount = await Customer.findOne({ uid: req.body.uid });
    if (isAccount) {
      if (isAccount.account_status) {
        return res
          .status(403)
          .send({ message: "Tài khoản của bạn đã bị khoá" });
      }
      // Nếu không khoá trả về token
      const access_token = await generateAccessToken({ id: isAccount._id });
      const refresh_token = await generateRefreshToken({ id: isAccount._id });
      const isRefreshToken = await RefreshTokenModel.findOne({
        userId: isAccount._id,
      });
      if (!isRefreshToken) {
        await RefreshTokenModel.create({
          userId: isAccount._id,
          token: refresh_token,
        });
      } else {
        await RefreshTokenModel.findByIdAndUpdate(isRefreshToken._id, {
          token: refresh_token,
        });
      }
      res.cookie("token", refresh_token, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        path: "/",
        httpOnly: true,
        sameSite: "None",
      });
      return res.send({
        message: "Đăng nhập thành công",
        user: isAccount,
        access_token,
      });
    } else {
      req.body.user_name = randomstring
        .generate(8)
        .concat(req.body.user_name.slice(-5));
      const data = await Customer.create(req.body);
      const access_token = await generateAccessToken({ id: data._id });
      const refresh_token = await generateRefreshToken({ id: data._id });
      const isRefreshToken = await RefreshTokenModel.findOne({
        userId: data._id,
      });
      if (!isRefreshToken) {
        await RefreshTokenModel.create({
          userId: data._id,
          token: refresh_token,
        });
      } else {
        await RefreshTokenModel.findByIdAndUpdate(isRefreshToken._id, {
          token: refresh_token,
        });
      }
      res.cookie("token", refresh_token, {
        maxAge: 60 * 24 * 60 * 60 * 1000,
        path: "/",
        httpOnly: true,
        sameSite: "None",
      });
      return res.send({
        message: "Đăng nhập thành công",
        user: data,
        access_token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
// Thay đổi mật khẩu
export const changePassword = async (req, res) => {
  try {
    if (!req.body.oldPassword) {
      return res.status(400).send({ message: "Bạn chưa nhập mật khẩu cũ" });
    }
    if (!req.body.password) {
      return res.status(400).send({ message: "Bạn chưa nhập mật khẩu" });
    }
    if (!req.body.confirmPassword) {
      return res
        .status(400)
        .send({ message: "Bạn chưa nhập xác nhận mật khẩu" });
    }
    if (req.body.password != req.body.confirmPassword) {
      return res.status(400).send({
        message: "Xác nhận mật khẩu không trùng khớp vui lòng thử lại",
      });
    }
    const isComparePass = await bcryptjs.compare(
      req.body.oldPassword,
      req.user.password
    );
    if (!isComparePass) {
      return res
        .status(400)
        .send({ message: "Mật khẩu cũ không đúng bạn thử nhớ lại xem" });
    }
    req.body.password = await bcryptjs.hash(req.body.password, 10);
    await Customer.findByIdAndUpdate(req.user._id, {
      password: req.body.password,
    });
    return res.send({ message: "Đổi mật khẩu thành công!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
// Đặt mật khẩu cho tài khoản đăng nhập bằng liên kết
export const setAPasswordForTheLinkedAccount = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).send({ message: "Bạn chưa nhập mật khẩu" });
    }
    if (!req.body.confirmPassword) {
      return res
        .status(400)
        .send({ message: "Bạn chưa nhập xác nhận mật khẩu" });
    }
    if (req.body.password != req.body.confirmPassword) {
      return res.status(400).send({
        message: "Xác nhận mật khẩu không trùng khớp vui lòng thử lại",
      });
    }
    req.body.password = await bcryptjs.hash(req.body.password, 10);
    await Customer.findByIdAndUpdate(req.user._id, {
      password: req.body.password,
    });
    return res.send({ message: "Đặt mật khẩu thành công!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
