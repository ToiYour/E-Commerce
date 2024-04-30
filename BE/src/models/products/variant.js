import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";
const VariantShema = new mongoose.Schema(
  {
    colorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },
    sizeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Size",
    },
    extra_price: Number,

    stock: Number,
  },
  { timestamps: true }
);
VariantShema.plugin(MongoosePaginate),
  VariantShema.plugin(MongooseDelete, {
    deletedAt: true,
    overrideMethods: ["delete"],
  });
VariantShema.plugin(MongooseDelete, { deletedBy: true });
export default mongoose.model("Variant", VariantShema);
