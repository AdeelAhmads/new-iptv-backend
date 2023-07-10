import express from "express";
import { SeriesValidationSchema } from "../validations/series.validation.js";
import { validate, authenticate } from "../middleware/index.js";
import { SeriesController } from "../controllers/series.controller.js";

const router = express.Router();
// router.get("/", authenticate, GenreController.getAll);
router.get("/",authenticate, SeriesController.getAll);
router.get("/:id",authenticate, SeriesController.get);
router.get("/:id/seasons",authenticate, SeriesController.getSeasons);
router.get("/:id/seasons/episodes",authenticate, SeriesController.getEpisodes);
router.post("/", validate(SeriesValidationSchema.add), SeriesController.add);
router.delete("/:id",authenticate, SeriesController.delete);
router.patch("/:id",authenticate, SeriesController.update);

export default router;
