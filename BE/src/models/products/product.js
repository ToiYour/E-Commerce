import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
const ProductShema = new mongoose.Schema(
  {
    name: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    desc: String,
    price: Number,
    images: Array,
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Variant" }],
    views: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
    brand: String,
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
  },
  { timestamps: true }
);
ProductShema.plugin(MongoosePaginate),
  ProductShema.plugin(MongooseDelete, {
    deletedAt: true,
    overrideMethods: ["delete"],
  });
ProductShema.plugin(aggregatePaginate);
ProductShema.plugin(MongooseDelete, { deletedBy: true });
export default mongoose.model("Product", ProductShema);
