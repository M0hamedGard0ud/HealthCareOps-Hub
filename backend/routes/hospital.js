import express from "express";
import * as hospitalController from "../controllers/Hospital.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", hospitalController.getAllHospitals);
router.get("/:id", hospitalController.getHospitalById);
router.post("/", hospitalController.createHospital);
router.delete("/:id", hospitalController.deleteHospital);
router.put("/:id", hospitalController.updateHospital);
router.put("/map/:id", hospitalController.updateHospitalMap);
router.put("/status/:id", auth, hospitalController.updateHospitalStatus);

export default router;
