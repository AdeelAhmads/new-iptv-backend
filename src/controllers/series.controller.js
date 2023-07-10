import { SeriesService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const SeriesController = {
    getAll: async (req, res) => {
        try {
            const data = await SeriesService.getAll();
            console.log(data);

            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    get: async (req, res) => {
        try {
            const data = await SeriesService.get(req.params.id);
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
    getSeasons:async (req, res) => {
        try {
			const data = await SeriesService.getSeasons(req.params.id);
			if (!data) {
				return httpResponse.NOT_FOUND(res, data);
			} else {
				return httpResponse.SUCCESS(res, data);
			}
			// return httpResponse.CREATED(res, data);
		} catch (error) {
			return httpResponse.INTERNAL_SERVER_ERROR(res, error);
		}
    },

    getEpisodes: async (req,res) =>{
        try {
            
			const data = await SeriesService.getEpisodes(req.params.id);
			if (!data) {
				return httpResponse.NOT_FOUND(res, data);
			} else {
				return httpResponse.SUCCESS(res, data);
			}
			// return httpResponse.CREATED(res, data);
		} catch (error) {
			return httpResponse.INTERNAL_SERVER_ERROR(res, error);
		}
    },

    add: async (req, res) => {
        try {
            console.log(req.body);

            const data = await SeriesService.add(req.body);
            if(data=="This series is already available"){
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

            const data = await SeriesService.delete(req.params.id);
            // const data = await SeriesService.get(req.params.id);
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
            const data = await SeriesService.update(req.params.id, req.body);
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
