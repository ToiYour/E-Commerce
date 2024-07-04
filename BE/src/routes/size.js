import express from "express";
import SizeValid from "../middleware/size.js";
import {
  createSize,
  deleteForeverAllSizes,
  deleteForeverByIdSize,
  deleteSoftAllSizes,
  deleteSoftByIdSize,
  getAllNotSoftSizes,
  getAllSoftSizes,
  getByIdSize,
  getComboboxSizes,
  restoreAllSizes,
  restoreByIdSize,
  updateSize,
} from "../controllers/size.js";
import { authorization } from "../middleware/auth.js";
const router = express.Router();
router.get("/combobox", getComboboxSizes);
router.post("/", authorization, SizeValid, createSize); // Api tạo mới Size
router.put("/:id", authorization, SizeValid, updateSize); // Api cập nhập Size
router.put("/restore/all", authorization, restoreAllSizes); //Api Khôi phục all Sizes
router.put("/:id/restore", authorization, restoreByIdSize); //Api Khôi phục by id Size
router.get("/", getAllNotSoftSizes); // API get all chưa bị xoá mềm
router.get("/soft", getAllSoftSizes); // Api đã xoá mềm
router.get("/:id", getByIdSize); //Api get by id Size
router.delete("/:id/soft", authorization, deleteSoftByIdSize); //Api xoá mềm theo id Size
router.delete("/:id", authorization, deleteForeverByIdSize); //Api xoá vĩnh viễn theo id Size
router.post("/soft", authorization, deleteSoftAllSizes); //Api Xoá mềm all
router.post("/delete-forever", authorization, deleteForeverAllSizes); // Xoá vĩnh viễn all
export default router;
