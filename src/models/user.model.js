
import mongoose from "mongoose";

const user = new mongoose.Schema({
	first_name: { type: String, required: true, index: true, maxlength: 50 },
	last_name: { type: String, required: true, index: true, maxlength: 50 },
	email: { type: String, unique: true },
	password: { type: String,},
});

export const UserModel = mongoose.model("User", user);

