import Joi from 'joi';

const performanceDataSchema = Joi.object({
	timestamp: Joi.date().required(),
	methodName: Joi.string().required(),
	executionTime: Joi.number().positive().required(),
	context: Joi.object().optional(),
});

export default (requestData: any) =>
	performanceDataSchema.validate(requestData);
