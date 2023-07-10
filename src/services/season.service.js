import { SeasonModel } from "../models/index.js";
import jwt from "jsonwebtoken";
import passwordHash from 'password-hash';
import mongoose from "mongoose";
export const SeasonService = {
    getAll: async () => {
        return SeasonModel.find();
    },

    get: async (id) => {

        const seasons = await SeasonModel.find()

        console.log(seasons);
        for (const season of seasons) {

            if (season.id === id) {
                return await SeasonModel.findById(id);
            }
         
        }

    },
    getEpisodes:async (id)=>{
        const data = await SeasonModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$lookup: {
					from: "episodes",
					localField: "_id",
					foreignField: "season_id",
					as: "episode_record",
				},
			},
		]);
		return data;
    },

    add: async (body) => {
        let data;
        data = await SeasonModel.find({ name: body.name });
        
        if (data.length == 0) {
            const data = SeasonModel.create(body);
            // const token = jwt.sign(body, secretKey);
            return data;
        }
        else {
            return "This season is already available"
        }


    },

    delete: async (id) => {
       
        const seasons = await SeasonModel.find()

        // console.log(users);
        for (const season of seasons) {

            if (season.id === id) {
                return await SeasonModel.findByIdAndDelete(id);
            }

        }

    },
    update: async (id, body) => {

        const seasons = await SeasonModel.find()

        console.log(seasons);
        for (const season of seasons) {

            if (season.id === id) {
                const season = await SeasonModel.findById(id);

                console.log(season);
                if (season) {
                    if (body.name) {
                        season.name = body.name;
                    }
                    if (body.description) {
                        season.description = body.description;
                    }


                    await season.save();
                    return season;

                }



            } 

        }



    }

};
