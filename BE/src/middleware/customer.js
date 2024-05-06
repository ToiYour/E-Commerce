import joi from "joi";
const CustomerJoi = joi.object({
  name: joi
    .object({
      first_name: joi.string().required().messages({
        "any.required": "Tên là bắt buộc",
        "string.empty": "Tên không được bỏ trống",
      }),
      last_name: joi.string().required().messages({
        "any.required": "Họ  là bắt buộc",
        "string.empty": "Họ không được bỏ trống",
      }),
    })
    .required()
    .messages({
      "any.required": "Họ tên là bắt buộc",
      "object.empty": "Họ tên không được bỏ trống",
      "object.base": "Họ tên phải là kiểu object",
    }),
  user_name: joi.string().required().messages({
    "any.required": "Tên đăng nhập là bắt buộc",
    "string.empty": "Tên đăng nhập không được bỏ trống",
  }),
  password: joi.string().required().messages({
    "any.required": "Mật khẩu là bắt buộc",
    "string.empty": "Mật khẩu không được bỏ trống",
  }),
});
const CustomerValid = (req, res, next) => {
  const { name, user_name, password } = req.body;
  const { error } = CustomerJoi.validate(
    { name, user_name, password },
    { abortEarly: false }
  );
  if (error) {
    const listErrors = error.details.map((err) => err.message);
    return res.status(400).send({ messages: listErrors });
  }
  next();
};
export default CustomerValid;
