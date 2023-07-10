import { EpisodeService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const EpisodeController = {
    getAll: async (req, res) => {
        try {
            const data = await EpisodeService.getAll();
            console.log(data);

            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    get: async (req, res) => {
        try {
            const data = await EpisodeService.get(req.params.id);
            if (!data) {
                return httpResponse.NOT_FOUND(res, data)
            }
            else {
                return httpResponse.SUCCESS(res, data);
            }

        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    getStream:async (req,res)=>{
        try {
            const data = await EpisodeService.getStream(req.params.id);
            if (!data) {
                return httpResponse.NOT_FOUND(res, data)
            }
            else {
                return httpResponse.SUCCESS(res, data);
            }

        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },

    add: async (req, res) => {
        try {
            console.log(req.body);

            const data = await EpisodeService.add(req.body);
            if(data=="This episode is already available"){
                return httpResponse.CONFLICT(res, data);
            }else{
                return httpResponse.CREATED(res, data);
            }
          
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    delete: async (req, res) => {
        try {
            console.log(req.params.id);

            const data = await EpisodeService.delete(req.params.id);
            // const data = await EpisodeService.get(req.params.id);
            if (!data) {
                return httpResponse.NOT_FOUND(res, data)
            }
            else {
                return httpResponse.SUCCESS(res, data);
            }
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    update: async (req, res) => {
        console.log(req.params.id);


        try {
            console.log(req.params.id);
            const data = await EpisodeService.update(req.params.id, req.body);
            if (!data) {
                return httpResponse.NOT_FOUND(res, data)
            }
            else {
                return httpResponse.SUCCESS(res, data);
            }
        } catch (error) {
            return httpResponse.NOT_FOUND(res, error);
        }
    }
};
