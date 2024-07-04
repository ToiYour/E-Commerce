import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";
const ColorShema = new mongoose.Schema(
  {
    name: String,
    hex: String,
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
ColorShema.plugin(MongoosePaginate),
  ColorShema.plugin(MongooseDelete, {
    deletedAt: true,
    overrideMethods: ["delete"],
  });
ColorShema.plugin(MongooseDelete, { deletedBy: true });
export default mongoose.model("Color", ColorShema);
