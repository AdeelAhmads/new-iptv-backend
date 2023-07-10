import mongoose from "mongoose";
const genre_series = new mongoose.Schema({
    genre_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre"
    },
    series_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Series"
    }
});

export const GenreSeriesModel = mongoose.model("Genre_Series", genre_series);