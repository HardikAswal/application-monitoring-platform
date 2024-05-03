import fetch from 'node-fetch';

export async function profiler<T>(
	methodName: string,
	fn: () => Promise<T>,
	clientKey: string,
	clientURL: string,
	context?: Record<string, any>,
): Promise<T> {
	try {
		const start = process.hrtime();
		const result = await fn();
		const end = process.hrtime(start);
		const executionTime = (end[0] * 1e3 + end[1] * 1e-6).toFixed(2);

		// Define the payload with performance data
		const performanceData = {
			timestamp: new Date(),
			methodName,
			executionTime,
			...(context && { context }),
		};

		try {
			const response = await fetch(clientURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: clientKey, // Add authentication headers
				},
				body: JSON.stringify(performanceData),
			});

			if (!response.ok) {
				console.error(
					`Failed to send performance data: ${response.statusText}`,
				);
			}
		} catch (error) {
			console.error('Error sending performance data:', error);
		}

		return result;
	} catch (error) {
		// Handle the error, log it, or report it as needed
		console.error(`Error in method ${methodName}:`, error);

		// Re-throw the error to ensure it's propagated
		throw error;
	}
}
