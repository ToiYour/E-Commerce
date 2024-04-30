import express from "express";
import CategoryValid from "../middleware/category.js";
import {
  createCategory,
  deleteForeverAllCategorys,
  deleteForeverByIdCategory,
  deleteSoftAllCategorys,
  deleteSoftByIdCategory,
  getAllNotSoftCategorys,
  getAllSoftCategorys,
  getByIdCategory,
  getComboboxCategory,
  restoreAllCategorys,
  restoreByIdCategory,
  updateCategory,
} from "../controllers/category.js";
const router = express.Router();
router.get("/combobox", getComboboxCategory);
router.post("/", CategoryValid, createCategory); // Api tạo mới Category
router.put("/:id", CategoryValid, updateCategory); // Api cập nhập Category
router.put("/restore/all", restoreAllCategorys); //Api Khôi phục all Categorys
router.put("/:id/restore", restoreByIdCategory); //Api Khôi phục by id Category
router.get("/", getAllNotSoftCategorys); // API get all chưa bị xoá mềm
router.get("/soft", getAllSoftCategorys); // Api đã xoá mềm
router.get("/:id", getByIdCategory); //Api get by id Category
router.delete("/:id/soft", deleteSoftByIdCategory); //Api xoá mềm theo id Category
router.delete("/:id", deleteForeverByIdCategory); //Api xoá vĩnh viễn theo id Category
router.post("/soft", deleteSoftAllCategorys); //Api Xoá mềm all
router.post("/delete-forever", deleteForeverAllCategorys); // Xoá vĩnh viễn all
export default router;
