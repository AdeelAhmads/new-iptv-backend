import { EpisodeModel } from "../models/index.js";
import mongoose from "mongoose";
export const EpisodeService = {
    getAll: async () => {
        return EpisodeModel.find();
    },

    get: async (id) => {

        const episodes = await EpisodeModel.find()

        console.log(episodes);
        for (const episode of episodes) {

            if (episode.id === id) {
                return await EpisodeModel.findById(id);
            }
           
        }

    },
    getStream:async (id)=>{
        const data = await EpisodeModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$lookup: {
					from: "streams",
					localField: "_id",
					foreignField: "episode_id",
					as: "streams_record",
				},
			},
		]);
		return data;
    },

    add: async (body) => {
        let data;
        data = await EpisodeModel.find({ name: body.name });
        if (data.length == 0) {
            const data = EpisodeModel.create(body);
            return data;
        }
        else {
            return "This episode is already available"
        }


    },

    delete: async (id) => {
     
        const episodes = await EpisodeModel.find()

        // console.log(users);
        for (const episode of episodes) {

            if (episode.id === id) {
                return await EpisodeModel.findByIdAndDelete(id);
            }

        }

    },
    update: async (id, body) => {

        const episodes = await EpisodeModel.find()

        console.log(episodes);

        for (const episode of episodes) {

            if (episode.id === id) {
                const episode = await EpisodeModel.findById(id);

                console.log(episode);

                if (episode) {
                    if (body.season_id) {

                        episode.season_id = body.season_id;
                    }
                    if (body.name) {

                        episode.name = body.name;
                    }
                    if(body.description) {
                        episode.description = body.description;
                    }
                    if(body.thumbnail_id) {
                        episode.thumbnail_id= body.thumbnail_id;
                    }
                

                    await episode.save();
                    return episode;

                }



            }


        }



    }

};
