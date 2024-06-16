import nodemailer from "nodemailer";
import dotenv from "dotenv";
import hbs from "nodemailer-express-handlebars";
dotenv.config();

const hbsOptions = {
  viewEngine: {
    defaultLayout: false,
  },
  viewPath: "./src/mails/views",
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASSWORD_EMAIL,
  },
});
//Cấu hình  hbs
transporter.use("compile", hbs(hbsOptions));
const sendMail = async (data) => {
  const mailOptions = {
    from: { name: "Nguyễn Huy Tới", address: process.env.USER_EMAIL }, // sender address
    ...data,
    // text: "Hello world?", // plain text body
    // html: "<b>Hello world?</b>", // html body
  };
  return await transporter.sendMail(mailOptions);
};
export default sendMail;
