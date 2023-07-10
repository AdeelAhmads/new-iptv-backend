import { StreamService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const StreamController = {
    getAll: async (req, res) => {
        try {
            const data = await StreamService.getAll();
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    getSeries: async (req,res) => {
        try {
            const data = await StreamService.getSeries(req.params.id);
        
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
    getGenre:async (req,res)=>{
        try {
            const data = await StreamService.getGenre(req.params.id);
        
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
    get: async (req, res) => {
        try {
            const data = await StreamService.get(req.params.id);
        
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
    getSeason: async (req,res) => {

        try {
            const data = await StreamService.getSeason(req.params.id);
           
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
    getUser:async (req, res) =>{
        try {
            const data = await StreamService.getUser(req.params.id);
          
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
    getEpisode:async (req,res)=>{
        try {
            const data = await StreamService.getEpisode(req.params.id);
          
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
          

            const data = await StreamService.add(req.body);
            if (data == "This stream is already available") {
                return httpResponse.CONFLICT(res, data);
            } else {
                return httpResponse.CREATED(res, data);
            }

        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    delete: async (req, res) => {
        try {
            


            const data = await StreamService.delete(req.params.id);
            
            // const data = awaitStreamService.get(req.params.id);
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
            const data = await StreamService.update(req.params.id, req.body);
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
