import Joi from 'joi';

const errorDataSchema = Joi.object({
	timestamp: Joi.date().required(),
	message: Joi.string().required(),
	stack: Joi.string().required(),
	context: Joi.object().optional(),
	errorType: Joi.string().optional(),
	requestDetails: Joi.object().optional(),
	user: Joi.object().optional(),
	clientInfo: Joi.object().optional(),
	environment: Joi.string().optional(),
	severity: Joi.string().optional(),
});

export default (requestData: any) => errorDataSchema.validate(requestData);
