import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http"; // Thêm http module

import { ConnectionMongoDB } from "./src/config/db.js";
import routerAuth from "./src/routes/auth.js";
import routerCategory from "./src/routes/category.js";
import routerColor from "./src/routes/color.js";
import routerConversation from "./src/routes/conversation.js";
import routerCustomer from "./src/routes/customer.js";
import routerMessage from "./src/routes/message.js";
import routerProduct from "./src/routes/product.js";
import routerSize from "./src/routes/size.js";
import routerVariant from "./src/routes/variant.js";
import routerCart from "./src/routes/cart.js";
import routerDiscount from "./src/routes/orders/discount.js";
import routerPayment from "./src/routes/payment.js";
import routerOrder from "./src/routes/orders/order.js";
import routerComment from "./src/routes/comment.js";
import routerReviews from "./src/routes/review.js";
import { ConnectionSocketIo } from "./src/socket/socket.js";
dotenv.config();
// Kết nối MongoDB
ConnectionMongoDB();
// Khởi tạo ứng dụng Express
const app = express();
// Add headers before the routes are defined
// Middleware
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware CORS để thêm tiêu đề vào mọi phản hồi
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", corsOptions.methods);
  res.setHeader(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(", ")
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Các routes
app.use("/api/color", routerColor);
app.use("/api/size", routerSize);
app.use("/api/category", routerCategory);
app.use("/api/variant", routerVariant);
app.use("/api/product", routerProduct);
app.use("/api/customer", routerCustomer);
app.use("/api/auth", routerAuth);
app.use("/api/conversation", routerConversation);
app.use("/api/message", routerMessage);
app.use("/api/cart", routerCart);
app.use("/api/discount", routerDiscount);
app.use("/api/payment", routerPayment);
app.use("/api/order", routerOrder);
app.use("/api/comments", routerComment);
app.use("/api/reviews", routerReviews);

// Khởi tạo HTTP
const server = http.createServer(app);
// Khởi tạo socket.io
ConnectionSocketIo(server);
// Run server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
