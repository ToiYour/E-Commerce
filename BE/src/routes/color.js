import express from "express";
import ColorValid from "../middleware/color.js";
import {
  createColor,
  deleteForeverAllColors,
  deleteForeverByIdColor,
  deleteSoftAllColors,
  deleteSoftByIdColor,
  getAllNotSoftColors,
  getAllSoftColors,
  getByIdColor,
  restoreAllColors,
  restoreByIdColor,
  updateColor,
} from "../controllers/color.js";
const router = express.Router();
router.post("/", ColorValid, createColor); // Api tạo mới color
router.put("/:id", ColorValid, updateColor); // Api cập nhập color
router.put("/restore/all", restoreAllColors); //Api Khôi phục all colors
router.put("/:id/restore", restoreByIdColor); //Api Khôi phục by id color
router.get("/", getAllNotSoftColors); // API get all chưa bị xoá mềm
router.get("/soft", getAllSoftColors); // Api đã xoá mềm
router.get("/:id", getByIdColor); //Api get by id color
router.delete("/:id/soft", deleteSoftByIdColor); //Api xoá mềm theo id color
router.delete("/:id", deleteForeverByIdColor); //Api xoá vĩnh viễn theo id color
router.post("/soft", deleteSoftAllColors); //Api Xoá mềm all
router.post("/delete-forever", deleteForeverAllColors); // Xoá vĩnh viễn all
export default router;
