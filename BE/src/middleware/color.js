import joi from "joi";
const ColorJoi = joi.object({
  name: joi.string().required().messages({
    "any.required": "Tên màu là bắt buộc",
    "string.empty": "Tên màu không được bỏ trống",
  }),
  status: joi.string().required().messages({
    "any.required": "Trạng thái màu là bắt buộc",
    "string.empty": "Trạng thái màu không được bỏ trống",
  }),
});
const ColorValid = (req, res, next) => {
  const { name, status } = req.body;
  const { error } = ColorJoi.validate({ name, status });
  if (error) {
    const listErrors = error.details.map((err) => err.message);
    return res.status(400).send({ messages: listErrors });
  }
  next();
};
export default ColorValid;
