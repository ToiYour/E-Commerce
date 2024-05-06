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
        "https://res.cloudinary.com/dlzhmxsqp/image/upload/v1714487885/e_commerce/rusrdthu5p2odgh3sfii.png",
    },
    email: { type: String, default: null },
    user_name: String,
    password: String,
    phone: { type: String, default: null },
    address: {
      province: { type: String, default: null },
      district: { type: String, default: null },
      commune: { type: String, default: null },
      specific: { type: String, default: null },
    },
    role: { type: String, default: "customer" },
    account_status: { type: Boolean, default: false },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
CustomerShema.plugin(MongoosePaginate);
export default mongoose.model("Customer", CustomerShema);
