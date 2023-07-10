import mongoose from "mongoose";

const stream = new mongoose.Schema({
    episode_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Episode",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    time: {
        type: String,
        required: true,
    }

});

export const StreamModel = mongoose.model("Stream", stream);
