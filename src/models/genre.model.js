import mongoose from "mongoose";

const genre = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

export const GenreModel = mongoose.model("Genre", genre);