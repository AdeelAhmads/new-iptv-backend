import express from "express";
import { FileValidationSchema } from "../validations/file.validation.js";
import { validate, authenticate } from "../middleware/index.js";
import { FileController } from "../controllers/file.controller.js";

const router = express.Router();
router.get("/", authenticate, FileController.getAll);
router.get("/:id", authenticate, FileController.get);
router.post("/", validate(FileValidationSchema.add), FileController.add);
router.delete("/:id", authenticate, FileController.delete);
router.patch("/:id", authenticate, FileController.update);

export default router;
