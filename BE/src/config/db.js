import mongoose from "mongoose";

export const ConnectionMongoDB = () => {
  mongoose
    .connect(process.env.URI_MONGODB, {
      serverSelectionTimeoutMS: 5000, // Thời gian chờ lựa chọn máy chủ MongoDB
      socketTimeoutMS: 45000, // Thời gian chờ thao tác socket
    })
    .then(() => {
      console.log("Connect MongoDB Successfully");
    })
    .catch((err) => {
      console.error("Connect MongoDB Failed:", err.message);
    });
};
