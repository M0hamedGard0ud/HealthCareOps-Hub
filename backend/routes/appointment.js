import express from "express";
import * as appointmentController from "../controllers/Appointment.js";

const router = express.Router();

router.get("/available-slots", appointmentController.getAvailableSlots);
router.get("/", appointmentController.getAllAppointments);
router.get("/:id", appointmentController.getAppointmentById);
router.post("/", appointmentController.createAppointment);
router.put("/status/:id", appointmentController.updateAppointmentStatus);
router.delete("/:id", appointmentController.deleteAppointment);

export default router;
