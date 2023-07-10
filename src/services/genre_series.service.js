import { GenreSeriesModel } from "../models/index.js";
import mongoose from "mongoose";
export const GenreSeriesService = {
    getAll: async () => {
        return GenreSeriesModel.find();
    },

    get: async (id) => {

        const genres = await GenreSeriesModel.find()

        console.log(genres);
        for (const genre of genres) {

            if (genre.id === id) {
                return await GenreSeriesModel.findById(id);
            }

        }

    },

    add: async (body) => {


        const data = GenreSeriesModel.create(body);
        return data;



    },

    delete: async (id) => {
        const genres = await GenreSeriesModel.find()
        for (const genre of genres) {

            if (genre.id === id) {
                return await GenreSeriesModel.findByIdAndDelete(id);
            }

        }

    },
    update: async (id, body) => {

        const genres = await GenreSeriesModel.find()

        console.log(genres);
        for (const genre of genres) {

            if (genre.id === id) {
                const genre = await GenreSeriesModel.findById(id);

                console.log(genre);
                if (genre) {
                    if (body.genre_id) {
                        genre.genre_id = body.genre_id;
                    }
                    if(body.series_id){
                        genre.series_id = body.series_id;
                    }

                    await genre.save();
                    return genre;

                }



            }

        }



    }

};
