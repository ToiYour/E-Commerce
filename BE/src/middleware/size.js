import joi from "joi";
const SizeJoi = joi.object({
  name: joi.string().required().messages({
    "any.required": "Tên size là bắt buộc",
    "string.empty": "Tên size không được bỏ trống",
  }),
  status: joi.string().required().messages({
    "any.required": "Trạng thái size là bắt buộc",
    "string.empty": "Trạng thái size không được bỏ trống",
  }),
});
const SizeValid = (req, res, next) => {
  const { name, status } = req.body;
  const { error } = SizeJoi.validate({ name, status });
  if (error) {
    const listErrors = error.details.map((err) => err.message);
    return res.status(400).send({ messages: listErrors });
  }
  next();
};
export default SizeValid;
