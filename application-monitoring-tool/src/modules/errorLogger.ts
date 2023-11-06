import fetch from 'node-fetch';

export async function errorLogger(
	error: Error,
	clientKey: string,
	clientURL: string,
	context?: Record<string, any>, // Context as a JSON object with customizable fields
	errorType?: string,
	requestDetails?: Record<string, any>,
	user?: Record<string, any>,
	clientInfo?: Record<string, any>,
	environment?: string,
	severity?: string,
) {
	const errorData: Record<string, any> = {
		timestamp: new Date(),
		message: error.message,
		stack: error.stack,
		...(context && { context }),
		...(errorType && { errorType }),
		...(requestDetails && { requestDetails }),
		...(user && { user }),
		...(clientInfo && { clientInfo }),
		...(environment && { environment }),
		...(severity && { severity }),
	};

	try {
		const response = await fetch(clientURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: clientKey,
			},
			body: JSON.stringify(errorData),
		});

		if (!response.ok) {
			console.error(`Failed to log error: ${response.statusText}`);
		}
	} catch (err) {
		console.error('Error logging error:', err);
	}
}
