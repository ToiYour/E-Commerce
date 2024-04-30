import joi from "joi";
const ProductJoi = joi.object({
  name: joi.string().required().messages({
    "any.required": "Mô tả là bắt buộc",
    "string.empty": "Mô tả không được bỏ trống",
  }),
  category: joi.string().required().min(24).max(24).messages({
    "any.required": "ID danh mục là bắt buộc ",
    "string.empty": "ID danh mục không được bỏ trống",
    "string.min": "ID danh mục phải đủ {#limit} ký tự",
    "string.max": "ID danh mục không vượt quá {#limit} ký tự",
  }),
  desc: joi.string().required().messages({
    "any.required": "Mô tả là bắt buộc",
    "string.empty": "Mô tả không được bỏ trống",
  }),
  price: joi.number().required().messages({
    "any.required": "Giá cơ bản là bắt buộc",
    "number.empty": "Giá cơ bản không được bỏ trống",
  }),
  images: joi.array().required().messages({
    "any.required": "Ảnh sản phẩm là bắt buộc",
    "array.empty": "Ảnh sản phẩm không được bỏ trống",
  }),
  variants: joi.array().items(joi.string()).required().messages({
    "any.required": "Biến thể phẩm là bắt buộc",
    "array.empty": "Biến thể phẩm không được bỏ trống",
  }),
});
const ProductValid = (req, res, next) => {
  const { error } = ProductJoi.validate(req.body, { abortEarly: false });
  if (error) {
    const listErrors = error.details.map((err) => err.message);
    return res.status(400).send({ messages: listErrors });
  }
  next();
};
export default ProductValid;
