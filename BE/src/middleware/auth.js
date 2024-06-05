import jsonwebtoken from "jsonwebtoken";
import Customer from "../models/customer.js";
export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(403).send({ message: "Bạn chưa đăng nhập" });
    jsonwebtoken.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          return res
            .status(401)
            .send({ message: "Phiên đăng nhập đã hết hạn" });
        }
        if (err.name == "JsonWebTokenError") {
          return res
            .status(403)
            .send({ message: "Token không hợp lệ, bạn có thể đăng nhập lại." });
        }
      }

      const account = await Customer.findById(user.id);
      if (!account) {
        return res.status(404).send({ message: "Tài khoản không  tồn tại" });
      }
      if (account?.account_status) {
        return res
          .status(403)
          .send({ message: "Tài khoản của bạn đã bị khoá" });
      }
      req.user = account;
      next();
    });
  } catch (error) {
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const authorization = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(403).send({ message: "Bạn chưa đăng nhập" });
    jsonwebtoken.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
      if (err) {
        return res.status(401).send({ message: "Phiên đăng nhập đã hết hạn" });
      }
      const account = await Customer.findById(user.id);
      if (!account) {
        return res.status(404).send({ message: "Tài khoản không  tồn tại" });
      }
      if (account?.account_status) {
        return res
          .status(403)
          .send({ message: "Tài khoản của bạn đã bị khoá" });
      }
      if (!account.role) {
        return res.status(403).json({
          message: "Bạn không có đủ quyền",
        });
      }
      next();
    });
  } catch (error) {
    return res.status(500).send({ message: "Lỗi server" });
  }
};
