import Variant from "../models/products/variant.js";
// import slugify from "slugify";
export const createVariant = async (req, res) => {
  try {
    // req.body.slug = slugify(req.body.name, "-");
    const data = await Variant.create(req.body);
    if (!data) {
      return res.status(500).send({ messages: "Thêm mới thất bại" });
    }
    return res.send({ message: "Thêm mới thành công", data });
  } catch (error) {
    return res.status(500).send({ messages: "Lỗi server", error });
  }
};
