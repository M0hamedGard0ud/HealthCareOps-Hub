import express from "express";
import * as usersController from "../controllers/User.js";

const router = express.Router();

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.post("/", usersController.createUser);
router.post("/lab", usersController.createLabUser);
router.delete("/:id", usersController.deleteUserById);
router.post("/login", usersController.loginUser);
router.put("/status/:id", usersController.updateUserStatus);
router.put("/:id", usersController.updateUserById);
router.put("/admin/:id", usersController.updateAdminById);
router.post("/reset_password", usersController.resetUserPassword);

export default router;
