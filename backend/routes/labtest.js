import express from "express";
import multer from "multer";
import * as labtestController from "../controllers/Labtest.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type! Only PDFs, JPEG, and PNG are allowed."),
        false
      );
    }
  },
});

router.get("/", labtestController.getAllLabtests);
router.get("/:id", labtestController.getLabtestById);
router.post("/", upload.single("report"), labtestController.createLabtest);
router.delete("/:id", labtestController.deleteLabtest);
router.put("/:id", labtestController.updateLabtest);
router.put(
  "/upload_image/:id",
  upload.single("report"),
  labtestController.updateLabtestReport
);

export default router;
