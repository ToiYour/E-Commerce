import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
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
    email_name: { type: String, default: null },
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
    account_status: { type: String, default: "active" },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
CustomerShema.plugin(MongoosePaginate),
  CustomerShema.plugin(MongooseDelete, {
    deletedAt: true,
    overrideMethods: ["delete"],
  });
CustomerShema.plugin(MongooseDelete, { deletedBy: true });
export default mongoose.model("Customer", CustomerShema);
