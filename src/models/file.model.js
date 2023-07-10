import mongoose from "mongoose";

const file = new mongoose.Schema({

    orignal_name: { type: String, required: true },
    current_name: { type: String, required: true },
    type: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: String, required: true },

});

export const FileModel = mongoose.model("File", file);