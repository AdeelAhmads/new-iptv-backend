import express from "express";
import { Genre_SeriesValidationSchema } from "../validations/genre_series.validation.js";
import { validate, authenticate } from "../middleware/index.js";
import { GenreSeriesController } from "../controllers/genre_series.controller.js";

const router = express.Router();
// router.get("/", authenticate, GenreController.getAll);
router.get("/", authenticate, GenreSeriesController.getAll);
router.get("/:id", authenticate, GenreSeriesController.get);
router.post("/", validate(Genre_SeriesValidationSchema.add), GenreSeriesController.add);
router.delete("/:id", authenticate, GenreSeriesController.delete);
router.patch("/:id", authenticate, GenreSeriesController.update);

export default router;
