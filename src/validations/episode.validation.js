import Joi from "joi";

export const EpisodeValidationSchema = {
	add: {
		body: Joi.object().keys({
			season_id: Joi.string().required(),
			name: Joi.string().required(),
			description: Joi.string().required(),
			thumbnail_id: Joi.string().required()
		}),
	},
};
