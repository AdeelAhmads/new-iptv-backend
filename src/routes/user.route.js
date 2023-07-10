import express from "express";
import { UserValidationSchema } from "../validations/index.js";
import { LoginValidationSchema } from "../validations/index.js";
import { validate, authenticate } from "../middleware/index.js";
import { UserController } from "../controllers/index.js";

const router = express.Router();
router.get("/", UserController.getAll);
router.get("/:id/streams", authenticate, UserController.getStreams); //get all streams of user by user id
router.get("/:id/streams/:streamId", authenticate, UserController.getStream); //Get a stream of a user by user id and stream id
router.get("/:id", authenticate, UserController.get); // get a user by id
router.post("/registration", validate(UserValidationSchema.add), UserController.add); //register a new user
router.post("/login", validate(LoginValidationSchema.add), UserController.getUser); //login a new user
router.delete("/:id", authenticate, UserController.delete); // deletes a user by id
router.delete("/:id/streams/:streamId", authenticate, UserController.deleteStream); // deletes a user by id
router.patch("/:id", authenticate, UserController.update); // updates a user by id

export default router;
