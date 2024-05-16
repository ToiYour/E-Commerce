import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
import MongoosePaginate from "mongoose-paginate-v2";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);
const CategoryShema = new mongoose.Schema(
  {
    name: String,
    img: String,
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
CategoryShema.plugin(MongoosePaginate),
  CategoryShema.plugin(MongooseDelete, {
    deletedAt: true,
    overrideMethods: ["delete"],
  });
CategoryShema.plugin(MongooseDelete, { deletedBy: true });
export default mongoose.model("Category", CategoryShema);
