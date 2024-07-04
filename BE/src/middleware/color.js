import joi from "joi";
const ColorJoi = joi.object({
  name: joi.string().required().messages({
    "any.required": "Tên màu là bắt buộc",
    "string.empty": "Tên màu không được bỏ trống",
  }),
  hex: joi.string().required().messages({
    "any.required": "Mã màu là bắt buộc",
    "string.empty": "Mã màu không được bỏ trống",
  }),
  status: joi.string().required().messages({
    "any.required": "Trạng thái màu là bắt buộc",
    "string.empty": "Trạng thái màu không được bỏ trống",
  }),
});
const ColorValid = (req, res, next) => {
  const { name, hex, status } = req.body;
  const { error } = ColorJoi.validate(
    { name, hex, status },
    { abortEarly: false }
  );
  if (error) {
    const listErrors = error.details.map((err) => err.message);
    return res.status(400).send({ messages: listErrors });
  }
  next();
};
export default ColorValid;
