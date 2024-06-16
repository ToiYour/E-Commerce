import mongoose from "mongoose";
export const ConnectionMongoDB = () => {
  mongoose
    .connect(`${process.env.URI_MONGODB}`)
    .then(() => {
      console.log("Connect MongoDB Successfully");
    })
    .catch(() => {
      console.log("Connect MongoDB False");
    });
};
