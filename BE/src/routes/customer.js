import express from "express";
import {
  createCustomer,
  deleteAllCustomers,
  deleteByIdCustomer,
  getAllCustomers,
  getByIdCustomer,
  updateAccoutStatus,
  updateCustomer,
} from "../controllers/customer.js";
import CustomerValid from "../middleware/customer.js";
const router = express.Router();
router.post("/", CustomerValid, createCustomer);
router.put("/:id", updateCustomer);
router.get("/", getAllCustomers);
router.get("/:id", getByIdCustomer);
router.delete("/:id", deleteByIdCustomer);
router.post("/delete-forever", deleteAllCustomers);
router.patch("/update-status/:id", updateAccoutStatus);
export default router;
