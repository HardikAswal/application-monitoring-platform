import Joi from 'joi';

const apiMonitoringDataSchema = Joi.object({
	timestamp: Joi.date().required(),
	method: Joi.string().valid('GET', 'POST', 'PUT', 'DELETE').required(),
	url: Joi.string().uri().required(),
	status: Joi.number().integer().min(100).max(599).required(),
	responseTime: Joi.number().positive().required(),
	clientInfo: Joi.object({
		userAgent: Joi.string().required(),
		ipAddress: Joi.string().ip().required(),
	}).required(),
	success: Joi.boolean().required(),
});

export default (requestData: any) =>
	apiMonitoringDataSchema.validate(requestData);
