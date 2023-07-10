import express from "express";
import { SeasonValidationSchema } from "../validations/season.validation.js";
import { validate, authenticate } from "../middleware/index.js";
import { SeasonController } from "../controllers/season.controller.js";

const router = express.Router();
// router.get("/", authenticate, GenreController.getAll);
router.get("/",authenticate, SeasonController.getAll);
router.get("/:id",authenticate, SeasonController.get);
router.get("/:id/episodes",authenticate, SeasonController.getEpisodes);
router.post("/", validate(SeasonValidationSchema.add), SeasonController.add);
router.delete("/:id",authenticate, SeasonController.delete);
router.patch("/:id",authenticate, SeasonController.update);

export default router;
