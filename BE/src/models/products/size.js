import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";
const SizeShema = new mongoose.Schema(
  {
    name: String,
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
SizeShema.plugin(MongoosePaginate),
  SizeShema.plugin(MongooseDelete, {
    deletedAt: true,
    overrideMethods: ["delete"],
  });
SizeShema.plugin(MongooseDelete, { deletedBy: true });
export default mongoose.model("Color", SizeShema);
