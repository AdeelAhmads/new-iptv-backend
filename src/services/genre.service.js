import { GenreModel } from "../models/index.js";
import { SeriesModel } from "../models/index.js";
import { SeasonModel } from "../models/index.js";
import mongoose from "mongoose";
export const GenreService = {
    getAll: async () => {
        return GenreModel.find();
    },

    get: async (id) => {

        const genres = await GenreModel.find()

        
        for (const genre of genres) {

            if (genre.id === id) {
                return await GenreModel.findById(id);
            }

        }

    },
    getSeries: async (id) => {
        // const data = await SeriesModel.find()
        // return data;
        const data = await GenreModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "genre_series",
                    localField: "_id",
                    foreignField: "genre_id",
                    as: "genre_series_record",
                },
            },
            {
                $lookup: {
                    from: "series",
                    localField: "series._id",
                    foreignField: "genre_series_record.genre_id",
                    // let: { genreId: "$genre_series_record.genre_id" },

                    // pipeline: [
                    //     {
                    //         $match: {
                    //             $expr: { $in: ["$_id", "$$genreId"] },
                    //         },
                    //     },
                    // ],

                    as: "series_record"
                }
            },
        ]);
        return data;

    },
    getSeasons: async (id) => {


        //  const data = await SeasonModel.find()

        //  return data;
        const data = await GenreModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "genre_series",
                    localField: "_id",
                    foreignField: "genre_id",
                    as: "genre_series_record",
                },
            },
            {
                $lookup: {
                    from: "series",
                    localField: "series._id",
                    foreignField: "genre_series_record.genre_id",
                    // let: { genreId: "$genre_series_record.genre_id" },

                    // pipeline: [
                    //     {
                    //         $match: {
                    //             $expr: { $in: ["$_id", "$$genreId"] },
                    //         },
                    //     },
                    // ],

                    as: "series_record"
                }
            },
            {
                $lookup: {
                    from: "seasons",
                    localField: "seasons.series_id",
                    foreignField: "series_record._id",
                    as: "seasons_record"
                }
            }

            // {
            //     $lookup: {
            //         from: "series",
            //         localField: "_id",
            //         foreignField: "genre_id",
            //         as: "series",
            //     },
            // },
            // {
            //     $lookup: {
            //         from: "seasons",
            //         localField: "season._id",
            //         foreignField: "series.series_id",
            //         as: "seasons"
            //     }
            // },
            // {
            //     $project: {
            //         _id: 0,
            //         seasons: 1
            //     }
            // }

        ]);
        return data;
    },
    add: async (body) => {
        let data;
        data = await GenreModel.find({ name: body.name });

        if (data.length == 0) {
            const data = GenreModel.create(body);
            return data;
        }
        else {
            return "This genre is already available"
        }


    },

    delete: async (id) => {
        const genres = await GenreModel.find()
        for (const genre of genres) {

            if (genre.id === id) {
                return await GenreModel.findByIdAndDelete(id);
            }

        }

    },
    update: async (id, body) => {

        const genres = await GenreModel.find()

        for (const genre of genres) {

            if (genre.id === id) {
                const genre = await GenreModel.findById(id);

                if (genre) {
                    if (body.name) {
                        genre.name = body.name;
                    }

                    await genre.save();
                    return genre;

                }



            }

        }



    }

};
