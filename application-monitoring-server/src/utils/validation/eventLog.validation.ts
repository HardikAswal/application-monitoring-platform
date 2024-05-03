import Joi from 'joi';

const eventSchema = Joi.object({
	timestamp: Joi.date().required(),
	eventType: Joi.string().required(),
	eventData: Joi.object().required(),
	eventSource: Joi.string().optional(), // Optional properties
	severity: Joi.string().optional(),
	user: Joi.string().optional(),
	clientInfo: Joi.object().optional(),
	description: Joi.string().optional(),
});

export default (requestData: any) => eventSchema.validate(requestData);
