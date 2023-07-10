import { SeasonService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const SeasonController = {
    getAll: async (req, res) => {
        try {
            const data = await SeasonService.getAll();
          
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    get: async (req, res) => {
        try {
            const data = await SeasonService.get(req.params.id);
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
    getEpisodes: async (req,res)=>{
        try {
            const data = await SeasonService.getEpisodes(req.params.id);
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
       
            const data = await SeasonService.add(req.body);
            if(data=="This season is already available"){
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
        
            const data = await SeasonService.delete(req.params.id);
            // const data = await SeasonService.get(req.params.id);
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

        try {
          
            const data = await SeasonService.update(req.params.id, req.body);
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
