import express from "express";
import { StreamValidationSchema } from "../validations/stream.validation.js";
import { validate, authenticate } from "../middleware/index.js";
import { StreamController } from "../controllers/stream.controller.js";

const router = express.Router();
// router.get("/", authenticate, GenreController.getAll);
router.get("/",authenticate, StreamController.getAll);
router.get("/:id",authenticate, StreamController.get);
router.get("/:id/episode",authenticate, StreamController.getEpisode);
router.get("/:id/user",authenticate, StreamController.getUser);
router.get("/:id/episode/season",authenticate, StreamController.getSeason);
router.get("/:id/episode/season/series",authenticate, StreamController.getSeries);
router.get("/:id/episode/season/series/genre",authenticate, StreamController.getGenre);

router.post("/", validate(StreamValidationSchema.add), StreamController.add);
router.delete("/:id",authenticate, StreamController.delete);
router.patch("/:id",authenticate, StreamController.update);

export default router;
