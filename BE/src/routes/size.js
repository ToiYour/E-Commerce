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
  restoreAllSizes,
  restoreByIdSize,
  updateSize,
} from "../controllers/size.js";
const router = express.Router();
router.post("/", SizeValid, createSize); // Api tạo mới Size
router.put("/:id", SizeValid, updateSize); // Api cập nhập Size
router.put("/restore/all", restoreAllSizes); //Api Khôi phục all Sizes
router.put("/:id/restore", restoreByIdSize); //Api Khôi phục by id Size
router.get("/", getAllNotSoftSizes); // API get all chưa bị xoá mềm
router.get("/soft", getAllSoftSizes); // Api đã xoá mềm
router.get("/:id", getByIdSize); //Api get by id Size
router.delete("/:id/soft", deleteSoftByIdSize); //Api xoá mềm theo id Size
router.delete("/:id", deleteForeverByIdSize); //Api xoá vĩnh viễn theo id Size
router.post("/soft", deleteSoftAllSizes); //Api Xoá mềm all
router.post("/delete-forever", deleteForeverAllSizes); // Xoá vĩnh viễn all
export default router;
