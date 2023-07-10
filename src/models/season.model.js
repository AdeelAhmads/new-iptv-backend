import mongoose from "mongoose";

const season = new mongoose.Schema({
    series_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Series"
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
});

export const SeasonModel = mongoose.model("Season", season);