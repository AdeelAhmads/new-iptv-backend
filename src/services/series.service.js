import { SeriesModel } from "../models/index.js";
import { EpisodeModel } from "../models/index.js";
import jwt from "jsonwebtoken";
import passwordHash from 'password-hash';
import mongoose from "mongoose";
export const SeriesService = {
    getAll: async () => {
        return SeriesModel.find();
    },

    get: async (id) => {

        const seriess = await SeriesModel.find()

        console.log(seriess);
        for (const series of seriess) {

            if (series.id === id) {
                return await SeriesModel.findById(id);
            }

        }

    },
    getSeasons: async (id) => {
        const data = await SeriesModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "seasons",
                    localField: "_id",
                    foreignField: "series_id",
                    as: "seasons_record",
                },
            },
        ]);
        return data;
    },
    getEpisodes: async (id) => {
        console.log(id);

        // const data = await EpisodeModel.find();
        // return data;




        const data = await SeriesModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "seasons",
                    localField: "_id",
                    foreignField: "series_id",
                    as: "season_record"
                },
            },

            {
                $lookup: {
                    from: "episodes",
                    let: { seasonId: "$season_record._id" }, 
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$season_id", "$$seasonId"] },
                            },
                        },
                    ],

                

                    as: "episodes_record"
                }
            },


        ]);
        return data;
    },
    add: async (body) => {
        let data;
        data = await SeriesModel.find({ name: body.name });

        if (data.length == 0) {
            const data = SeriesModel.create(body);
            // const token = jwt.sign(body, secretKey);
            console.log('data');
            return data;
        }
        else {
            return "This series is already available"
        }


    },


    delete: async (id) => {
        const seriess = await SeriesModel.find()
        for (const series of seriess) {

            if (series.id === id) {
                return await SeriesModel.findByIdAndDelete(id);
            }
        }

    },
    update: async (id, body) => {

        const seriess = await SeriesModel.find()

        console.log(seriess);
        for (const series of seriess) {

            if (series.id === id) {
                const series = await SeriesModel.findById(id);

                console.log(series);
                if (series) {
                    if (body.name) {
                        series.name = body.name;
                    }
                    if (body.description) {
                        series.description = body.description;
                    }
                    if (body.trailer_id) {
                        series.trailer_id = body.trailer_id;
                    }
                    if (body.thumbnail_id) {
                        series.thumbnail_id = body.thumbnail_id;
                    }


                    await series.save();
                    return series;

                }



            } else {
                return "Invalid series id";
            }


        }



    }

};
