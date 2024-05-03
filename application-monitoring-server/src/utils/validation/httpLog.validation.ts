import Joi from 'joi';

const httpSchema = Joi.object({
	method: Joi.string().valid('GET', 'POST', 'PUT', 'DELETE').required(),
	url: Joi.string().uri().required(),
	status_code: Joi.number().integer().min(100).max(599).required(),
	timestamp: Joi.date().required(),
	user_agent: Joi.string().required(),
	remote_ip: Joi.string().ip().required(),
	referer: Joi.string().uri(),
	content_type: Joi.string(),
	content_length: Joi.number().integer(),
	accept_language: Joi.string(),
	accept_encoding: Joi.string(),
	origin: Joi.string().uri(),
	host: Joi.string(),
	protocol: Joi.string().valid('http', 'https').required(),
	path: Joi.string().required(),
	query: Joi.object().pattern(Joi.string(), Joi.string()), // Assumes query parameters are key-value pairs of strings
	cookies: Joi.object().pattern(Joi.string(), Joi.string()), // Assumes cookies are key-value pairs of strings
	body: Joi.object(), // You may want to define a specific schema for the request body if needed
	is_xhr: Joi.boolean().required(),
});

export default (requestData: any) => httpSchema.validate(requestData);
