import express, { Request, Response } from 'express';
import toolAuth from '../middleware/toolAuth.middleware';
import {
	createHTTPLog,
	createEventLog,
	createAPILog,
	createErrorLog,
	createProfiler,
} from '../service/tool.service';
import {
	httpLogValidation,
	eventLogValidation,
	apiLogValidation,
	errorLogValidation,
	profilerValidation,
} from '../utils/validation';

const router = express.Router();

router.post('/tool', toolAuth, async (req: Request, res: Response) => {
	try {
		const data = req.body;

		if (httpLogValidation(data)) {
			await createHTTPLog(data);
		} else if (eventLogValidation(data)) {
			await createEventLog(data);
		} else if (apiLogValidation(data)) {
			await createAPILog(data);
		} else if (errorLogValidation(data)) {
			await createErrorLog(data);
		} else if (profilerValidation(data)) {
			await createProfiler(data);
		} else {
			console.error('Invalid schema');
			return res.status(400);
		}

		return res.status(200);
	} catch (error) {
		console.error(error);
		return res.status(500);
	}
});

export default router;
