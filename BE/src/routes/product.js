import express from "express";
import {
  createProduct,
  deleteForeverAllProduct,
  deleteForeverByIdProduct,
  deleteSoftAllProduct,
  deleteSoftByIdProduct,
  getAllProducts,
  getAllSoftProduct,
  getByIdUpdateProduct,
  getDetailProduct,
  restoreAllProduct,
  restoreByIdProduct,
  updateProduct,
} from "../controllers/product.js";
import ProductValid from "../middleware/product.js";
const router = express.Router();
router.post("/", ProductValid, createProduct);
router.get("/", getAllProducts);
router.get("/take-update/:id", getByIdUpdateProduct);
router.put("/restore/all", restoreAllProduct); //Api Khôi phục all
router.put("/:id/restore", restoreByIdProduct); //Api Khôi phục by id
router.get("/detail/:id", getDetailProduct);
router.delete("/:id/soft", deleteSoftByIdProduct);
router.post("/soft", deleteSoftAllProduct); //Api Xoá mềm all
router.get("/soft", getAllSoftProduct); // Api đã xoá mềm
router.post("/delete-forever", deleteForeverAllProduct); // Xoá vĩnh viễn all
router.delete("/:id", deleteForeverByIdProduct); //Api xoá vĩnh viễn theo id
router.put("/:id", ProductValid, updateProduct);

export default router;
