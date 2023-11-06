import { Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';

export async function httpRequestLogger(
	req: Request,
	res: Response,
	next: NextFunction,
	clientKey: string,
	clientURL: string,
) {
	// Create an object with the data to log
	const requestData: Record<string, any> = {
		method: req.method,
		url: req.url,
		status_code: res.statusCode,
		timestamp: new Date(),
		user_agent: req.get('user-agent'), // User-Agent header
		remote_ip: req.ip, // User's remote IP address
		referer: req.get('referer'), // Referer header
		content_type: req.get('content-type'), // Content-Type header
		content_length: req.get('content-length'), // Content-Length header
		accept_language: req.get('accept-language'), // Accept-Language header
		accept_encoding: req.get('accept-encoding'), // Accept-Encoding header
		origin: req.get('origin'), // Origin header
		host: req.get('host'), // Host header
		protocol: req.protocol, // Protocol (http or https)
		path: req.path, // Request path
		query: req.query, // URL query parameters
		cookies: req.cookies, // Cookies sent with the request
		body: req.body, // Request body (for POST requests)
		is_xhr: req.xhr, // Indicates if it's an XMLHttpRequest
	};

	try {
		// Make an HTTP POST request to the backend app using fetch
		const response = await fetch(clientURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: clientKey, // Add authentication headers as needed
			},
			body: JSON.stringify(requestData),
		});

		if (!response.ok) {
			console.error(`HTTP request failed with status ${response.status}`);
		}
	} catch (error) {
		console.error('Error logging HTTP request:', error);
	} finally {
		// Continue the user's request flow even if there was an error
		next();
	}
}
