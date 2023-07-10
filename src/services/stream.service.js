import { StreamModel } from "../models/index.js";
import jwt from "jsonwebtoken";
import passwordHash from 'password-hash';
import mongoose from "mongoose";
export const StreamService = {
    getAll: async () => {
        return StreamModel.find();
    },

    get: async (id) => {

        const streams = await StreamModel.find()
        for (const stream of streams) {
            if (stream.id === id) {

                return await StreamModel.findById(id);
            }
        }

    },
    getGenre: async (id) => {
        const data = await StreamModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "episodes",
                    localField: "episode_id",
                    foreignField: "_id",
                    as: "episode_record",
                },
            },
            {
                $lookup: {
                    from: "seasons",
                    let: { seasonId: "$episode_record.season_id" },

                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", "$$seasonId"] },
                            },
                        },
                    ],

                    as: "season_record"
                }
            }, {
                $lookup: {
                    from: "series",
                    let: { seriesId: "$season_record.series_id" },

                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", "$$seriesId"] },
                            },
                        },
                    ],

                    as: "series_record",
                }
            }, 
             {
                $lookup: {
                    from: "genre_series",
                    let: { seriesId: "$series_record._id" },

                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$series_id", "$$seriesId"] },
                            },
                        },
                    ],

                    as: "genre_series_record",
                }
            },
            {
                $lookup: {
                    from: "genres",
                    let: { genreId: "$genre_series_record.genre_id" },

                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", "$$genreId"] },
                            },
                        },
                    ],

                    as: "genre_record",
                }
            }
            // {
            //     $lookup: {
            //         from: "genres",
            //         let: { genreId: "$series_record.genre_id" },

            //         pipeline: [
            //             {
            //                 $match: {
            //                     $expr: { $in: ["$_id", "$$genreId"] },
            //                 },
            //             },
            //         ],

            //         as: "genre_record",
            //     }
            // }


        ]);
        return data;
    },
    getSeries: async (id) => {
        const data = await StreamModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "episodes",
                    localField: "episode_id",
                    foreignField: "_id",
                    as: "episode_record",
                },
            },
            {
                $lookup: {
                    from: "seasons",
                    let: { seasonId: "$episode_record.season_id" },

                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", "$$seasonId"] },
                            },
                        },
                    ],

                    as: "season_record"
                }
            }, {
                $lookup: {
                    from: "series",
                    let: { seriesId: "$season_record.series_id" },

                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", "$$seriesId"] },
                            },
                        },
                    ],

                    as: "series_record",
                }
            }
            // {
            //     $project: {
            //         _id: 0,
            //         seasons: 1
            //     }
            // }

        ]);
        return data;

    },
    getSeason: async (id) => {

        const data = await StreamModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "episodes",
                    localField: "episode_id",
                    foreignField: "_id",
                    as: "episode_record",
                },
            },
            {
                $lookup: {
                    from: "seasons", // Collection name for seasons
                    let: { seasonId: "$episode_record.season_id" },

                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", "$$seasonId"] },
                            },
                        },
                    ],

                    as: "season_record"
                }
            },
            // {
            //     $project: {
            //         _id: 0,
            //         seasons: 1
            //     }
            // }

        ]);
        return data;
    },
    getUser: async (id) => {
        const data = await StreamModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
        ]);
        return data;
    },
    getEpisode: async (id) => {
        const data = await StreamModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "episodes",
                    localField: "episode_id",
                    foreignField: "_id",
                    as: "episode",
                },
            },
        ]);
        return data;


    },

    add: async (body) => {
        const data = StreamModel.create(body);
        return data;
    },

    delete: async (id) => {

        const streams = await StreamModel.find()
        
        for (const stream of streams) {

            if (stream.id === id) {
                return await StreamModel.findByIdAndDelete(id);
            }
        }

    },
    update: async (id, body) => {

        const streams = await StreamModel.find()

        for (const stream of streams) {

            if (stream.id === id) {

                const timeStream = await StreamModel.findById(id);

                if (timeStream) {

                    if (body.time) {
                        timeStream.time = body.time;
                    }
                    if (body.user_id) {
                        timeStream.user_id = body.user_id;
                    } if (body.episode_id) {
                        timeStream.episode_id = body.episode_id;
                    }

                    await timeStream.save();
                    return timeStream;

                }
            }


        }
    }

};
