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
import { ConnectionSocketIo } from "./src/socket/socket.js";
dotenv.config();
// Kết nối MongoDB
ConnectionMongoDB();
// Khởi tạo ứng dụng Express
const app = express();
// Middleware
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(express.json());
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
// Khởi tạo HTTP
const server = http.createServer(app);
// Khởi tạo socket.io
ConnectionSocketIo(server);
// Run server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
