import { Request, Response, NextFunction } from 'express';

export function apiMonitoring(
	req: Request,
	res: Response,
	next: NextFunction,
	clientKey: string,
	clientURL: string,
) {
	const startTime = process.hrtime();

	res.on('finish', async () => {
		const endTime = process.hrtime(startTime);
		const responseTimeInMilliseconds = endTime[0] * 1000 + endTime[1] / 1e6;

		const apiRequestData = {
			timestamp: new Date(),
			method: req.method,
			url: req.originalUrl,
			status: res.statusCode,
			responseTime: responseTimeInMilliseconds,
			clientInfo: {
				userAgent: req.get('user-agent'),
				ipAddress: req.ip,
			},
			success: res.statusCode >= 200 && res.statusCode < 300,
		};

		// Send the API request data to backend
		try {
			const response = await fetch(clientURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: clientKey, // Add authentication headers
				},
				body: JSON.stringify(apiRequestData),
			});

			if (!response.ok) {
				console.error(
					`Failed to send API request data to the backend: ${response.statusText}`,
				);
			}
		} catch (err) {
			console.error('Error sending API request data to the backend:', err);
		}
	});

	next();
}
