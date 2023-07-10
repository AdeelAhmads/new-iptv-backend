import Joi from "joi";

export const FileValidationSchema = {
    add: {
        body: Joi.object().keys({
            orignal_name: Joi.string().required(),
            current_name: Joi.string().required(),
            type: Joi.string().required(),
            path: Joi.string().required(),
            size: Joi.string().required()
        }),
    },
};
