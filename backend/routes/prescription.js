import express from "express";
import * as prescriptionController from "../controllers/Prescription.js";

const router = express.Router();

router.get("/", prescriptionController.getAllPrescriptions);
router.get("/:id", prescriptionController.getPrescriptionById);
router.post("/", prescriptionController.createPrescription);
router.delete("/:id", prescriptionController.deletePrescription);
router.put("/:id", prescriptionController.updatePrescription);
router.put("/status/:id", prescriptionController.updatePrescriptionStatus);

export default router;
