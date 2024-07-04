import joi from "joi";
const VariantJoi = joi.object({
  colorId: joi.string().required().min(24).max(24).messages({
    "any.required": "ID Color là bắt buộc ",
    "string.empty": "ID Color không được bỏ trống",
    "string.min": "ID Color phải đủ {#limit} ký tự",
    "string.max": "ID Color không vượt quá {#limit} ký tự",
  }),
  sizeId: joi.string().required().min(24).max(24).messages({
    "any.required": "ID Size là bắt buộc",
    "string.empty": "ID Size không được bỏ trống",
    "string.min": "ID Size phải đủ {#limit} ký tự",
    "string.max": "ID Size không vượt quá {#limit} ký tự",
  }),
});
const VariantValid = (req, res, next) => {
  const { colorId, sizeId } = req.body;
  const { error } = VariantJoi.validate(
    { colorId, sizeId },
    { abortEarly: false }
  );
  if (error) {
    const listErrors = error.details.map((err) => err.message);
    return res.status(400).send({ messages: listErrors });
  }
  next();
};
export default VariantValid;
