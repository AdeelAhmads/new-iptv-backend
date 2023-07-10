import express from "express";
import { EpisodeValidationSchema } from "../validations/episode.validation.js";
import { validate, authenticate } from "../middleware/index.js";
import { EpisodeController } from "../controllers/episode.controller.js";

const router = express.Router();
// router.get("/", authenticate, GenreController.getAll);
router.get("/",authenticate, EpisodeController.getAll);
router.get("/:id",authenticate, EpisodeController.get);
router.get("/:id/streams",authenticate, EpisodeController.getStream);
router.post("/", validate(EpisodeValidationSchema.add), EpisodeController.add);
router.delete("/:id",authenticate, EpisodeController.delete);
router.patch("/:id",authenticate, EpisodeController.update);

export default router;
