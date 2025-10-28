/**
 * HTTP Logger service for posting action logs to an HTTPS endpoint
 */
export class HttpLogger {
	private readonly endpoint: string;
	private readonly sessionId: string;

	constructor(sessionId: string, endpoint: string = 'https://your-endpoint.com/api/logs') {
		this.sessionId = sessionId;
		this.endpoint = endpoint;
	}

	/**
	 * Posts an action log to the HTTPS endpoint
	 * @param type - The type of action
	 * @param value - The value or data associated with the action
	 * @param timestamp - Optional timestamp, defaults to current time
	 */
	async logAction(type: string, value: string, timestamp?: string): Promise<void> {
		const logData = {
			timestamp: timestamp || new Date().toISOString(),
			sessionId: this.sessionId,
			type,
			value
		};

		try {
            console.log('[HttpLogger]', logData);
			const response = await fetch(this.endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(logData)
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			console.log('Action log posted successfully:', logData);
		} catch (error) {
			console.error('Failed to post action log:', error);
			// Don't throw - we want the app to continue working even if logging fails
		}
	}
}
