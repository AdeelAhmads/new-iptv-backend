import Joi from "joi";

export const StreamValidationSchema = {
	add: {
		body: Joi.object().keys({
			episode_id:Joi.string().required(),
			user_id: Joi.string().required(),
			time: Joi.string().required()
			
		}),
	},
};
