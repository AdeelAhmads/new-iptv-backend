import Joi from "joi";

export const SeriesValidationSchema = {
	add: {
		body: Joi.object().keys({

			name: Joi.string().required(),
			description: Joi.string().required(),
			trailer_id: Joi.string().required(),
			thumbnail_id: Joi.string().required()
		}),
	},
};
