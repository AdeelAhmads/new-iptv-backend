import express from "express";
import { GenreValidationSchema } from "../validations/index.js";
import { validate, authenticate } from "../middleware/index.js";
import { GenreController } from "../controllers/genre.controller.js";

const router = express.Router();
// router.get("/", authenticate, GenreController.getAll);
router.get("/", authenticate, GenreController.getAll); // get all genre
router.get("/:id", authenticate, GenreController.get); //get genre by id
router.post("/", validate(GenreValidationSchema.add), GenreController.add); //create a new Genre
router.get("/:id/series", authenticate, GenreController.getSeries); //get series by id
router.get("/:id/series/seasons", authenticate, GenreController.getSeasons); //get series by id
router.delete("/:id", authenticate, GenreController.delete); //delete a Genre by id
router.patch("/:id", authenticate, GenreController.update); //update a Genre by id

export default router;
