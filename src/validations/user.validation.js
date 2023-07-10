import Joi from "joi";

export const UserValidationSchema = {
	add: {
		body: Joi.object().keys({
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			email: Joi.string().required(),
			password: Joi.string().required()
		}),
	},
};
