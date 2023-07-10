import { FileModel } from "../models/index.js";
import mongoose from "mongoose";
export const FileService = {
    getAll: async () => {
        return FileModel.find();
    },

    get: async (id) => {

        const genres = await FileModel.find()

        console.log(genres);
        for (const genre of genres) {

            if (genre.id === id) {
                return await FileModel.findById(id);
            }

        }

    },
    getSeries: async (id) => {

        const data = await FileModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "series",
                    localField: "_id",
                    foreignField: "genre_id",
                    as: "series_record",
                },
            },
        ]);
        return data;
    },
    getSeasons: async (id) => {
        const data = await FileModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "series",
                    localField: "_id",
                    foreignField: "genre_id",
                    as: "series",
                },
            },
            {
                $lookup: {
                    from: "seasons",
                    localField: "season._id",
                    foreignField: "series.series_id",
                    as: "seasons"
                }
            },
            {
                $project: {
                    _id: 0,
                    seasons: 1
                }
            }

        ]);
        return data;
    },
    add: async (body) => {
        let data;
        // console.log(body);

        data = await FileModel.find({ orignal_name: body.orignal_name });

        if (data.length == 0) {

            const data =await FileModel.create(body);
            console.log(data);
            return data;
        }
        else {
            return "This genre is already available"
        }


    },

    delete: async (id) => {
        const genres = await FileModel.find()
        for (const genre of genres) {

            if (genre.id === id) {
                return await FileModel.findByIdAndDelete(id);
            }

        }

    },
    update: async (id, body) => {

        const genres = await FileModel.find()

        console.log(genres);
        for (const genre of genres) {

            if (genre.id === id) {
                const genre = await FileModel.findById(id);

                console.log(genre);
                if (genre) {
                    if (body.orignal_name) {
                        genre.orignal_name = body.orignal_name;
                    }
                    if(body.current_name) {
                        genre.current_name = body.current_name;
                    }
                    if(body.type){
                        genre.type = body.type;
                    }
                    if(body.size){
                        genre.size = body.size;
                    }

                    await genre.save();
                    return genre;

                }



            }

        }



    }

};
