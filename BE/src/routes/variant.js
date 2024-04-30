import express from "express";
import VariantValid from "../middleware/variant.js";
import { createVariant } from "../controllers/variant.js";
const router = express.Router();
router.post("/", VariantValid, createVariant);
export default router;
