import joi from "joi";
const CategoryJoi = joi.object({
  name: joi.string().required().messages({
    "any.required": "Tên danh mục là bắt buộc",
    "string.empty": "Tên danh mục không được bỏ trống",
  }),
  img: joi.string().required().messages({
    "any.required": "Ảnh danh mục là bắt buộc",
    "string.empty": "Ảnh danh mục không được bỏ trống",
  }),
  status: joi.string().required().messages({
    "any.required": "Trạng thái danh mục là bắt buộc",
    "string.empty": "Trạng thái danh mục không được bỏ trống",
  }),
});
const CategoryValid = (req, res, next) => {
  const { name, img, status } = req.body;
  const { error } = CategoryJoi.validate(
    { name, img, status },
    { abortEarly: false }
  );
  if (error) {
    const listErrors = error.details.map((err) => err.message);
    return res.status(400).send({ messages: listErrors });
  }
  next();
};
export default CategoryValid;
