import Joi from "joi";

export const Genre_SeriesValidationSchema = {
    add: {
        body: Joi.object().keys({
            genre_id: Joi.string().required(),
            series_id: Joi.string().required(),
        }),
    },
};
