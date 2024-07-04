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
  getCategoryBySlug,
  getComboboxCategory,
  restoreAllCategorys,
  restoreByIdCategory,
  updateCategory,
} from "../controllers/category.js";
import { authorization } from "../middleware/auth.js";
const router = express.Router();
router.get("/combobox", getComboboxCategory);
router.post("/", authorization, CategoryValid, createCategory); // Api tạo mới Category
router.put("/:id", authorization, CategoryValid, updateCategory); // Api cập nhập Category
router.put("/restore/all", authorization, restoreAllCategorys); //Api Khôi phục all Categorys
router.put("/:id/restore", authorization, restoreByIdCategory); //Api Khôi phục by id Category
router.get("/", getAllNotSoftCategorys); // API get all chưa bị xoá mềm
router.get("/soft", getAllSoftCategorys); // Api đã xoá mềm
router.get("/:id", getByIdCategory); //Api get by id Category
router.delete("/:id/soft", authorization, deleteSoftByIdCategory); //Api xoá mềm theo id Category
router.delete("/:id", authorization, deleteForeverByIdCategory); //Api xoá vĩnh viễn theo id Category
router.post("/soft", authorization, deleteSoftAllCategorys); //Api Xoá mềm all
router.post("/delete-forever", authorization, deleteForeverAllCategorys); // Xoá vĩnh viễn all
router.get("/by_slug/:slug", getCategoryBySlug);
export default router;
