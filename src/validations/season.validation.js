import Joi from "joi";

export const SeasonValidationSchema = {
	add: {
		body: Joi.object().keys({
			series_id: Joi.string().required(),
			name: Joi.string().required(),
			description:Joi.string().required()
		}),
	},
};
