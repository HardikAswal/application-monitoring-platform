import fetch from 'node-fetch';

export async function eventLogger(
	eventType: string,
	eventData: Record<string, any>,
	clientKey: string,
	clientURL: string,
	eventSource?: string,
	severity?: string,
	user?: Record<string, any>,
	clientInfo?: Record<string, any>,
	description?: string,
) {
	const event = {
		timestamp: new Date(),
		eventType,
		eventData,
		...(eventSource && { eventSource }),
		...(severity && { severity }),
		...(user && { user }),
		...(clientInfo && { clientInfo }),
		...(description && { description }),
	};

	try {
		const response = await fetch(clientURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${clientKey}`,
			},
			body: JSON.stringify(event),
		});

		if (!response.ok) {
			console.error(`Failed to log event: ${response.statusText}`);
		}
	} catch (err) {
		console.error('Error logging event:', err);
	}
}
