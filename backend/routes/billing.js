import express from "express";
import * as billingController from "../controllers/Billing.js";

const router = express.Router();

router.get("/", billingController.getAllBillings);
router.get("/:id", billingController.getBillingById);
router.post("/", billingController.createBilling);
router.delete("/:id", billingController.deleteBilling);
router.put("/:id", billingController.updateBilling);

export default router;
