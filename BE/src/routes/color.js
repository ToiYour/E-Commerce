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
  getComboboxColors,
  restoreAllColors,
  restoreByIdColor,
  updateColor,
} from "../controllers/color.js";
import { authorization } from "../middleware/auth.js";
const router = express.Router();
router.get("/combobox", getComboboxColors);
router.post("/", authorization, ColorValid, createColor); // Api tạo mới color
router.put("/:id", authorization, ColorValid, updateColor); // Api cập nhập color
router.put("/restore/all", authorization, restoreAllColors); //Api Khôi phục all colors
router.put("/:id/restore", authorization, restoreByIdColor); //Api Khôi phục by id color
router.get("/", getAllNotSoftColors); // API get all chưa bị xoá mềm
router.get("/soft", getAllSoftColors); // Api đã xoá mềm
router.get("/:id", getByIdColor); //Api get by id color
router.delete("/:id/soft", authorization, deleteSoftByIdColor); //Api xoá mềm theo id color
router.delete("/:id", authorization, deleteForeverByIdColor); //Api xoá vĩnh viễn theo id color
router.post("/soft", authorization, deleteSoftAllColors); //Api Xoá mềm all
router.post("/delete-forever", authorization, deleteForeverAllColors); // Xoá vĩnh viễn all
export default router;
