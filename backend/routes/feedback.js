import express from "express";
import * as feedbackController from "../controllers/Feedback.js";

const router = express.Router();

router.get("/", feedbackController.getAllFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.post("/", feedbackController.createFeedback);

export default router;
