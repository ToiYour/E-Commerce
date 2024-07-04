import mongoose from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
const CustomerShema = new mongoose.Schema(
  {
    name: {
      first_name: { type: String, default: null },
      last_name: { type: String, default: null },
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dlzhmxsqp/image/upload/v1716288330/e_commerce/s4nl3tlwpgafsvufcyke.jpg",
    },
    uid: { type: String, default: "" },
    email: { type: String, default: null },
    user_name: { type: String, lowercase: true },
    password: String,
    phone: { type: String, default: null },
    address: {
      province: { type: String, default: null },
      district: { type: String, default: null },
      commune: { type: String, default: null },
      specific: { type: String, default: null },
    },
    role: { type: Boolean, default: false },
    account_status: { type: Boolean, default: false },
    status: {
      type: Boolean,
      default: true,
    },
    status_at: { type: String, default: "" },
  },
  { timestamps: true }
);
CustomerShema.plugin(MongoosePaginate);
export default mongoose.model("Customer", CustomerShema);
