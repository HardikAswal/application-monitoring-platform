type LogType = 'http' | 'event' | 'error' | 'api' | 'profile';

export async function api(
	clientKey: string,
	type: LogType,
	data: any,
): Promise<void> {
	try {
		// url for backend service
		const url = '';

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${clientKey}`,
			},
			body: JSON.stringify({
				type,
				data,
			}),
		});

		if (!response.ok) {
			throw new Error(`Failed to log data: ${response.statusText}`);
		}
	} catch (error) {
		console.error('Error calling backend API:', error);
		throw error; // Re-throw the error to propagate it
	}
}
