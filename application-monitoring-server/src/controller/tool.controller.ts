import express, { Request, Response, NextFunction } from 'express';
import {
	createHTTPLog,
	createEventLog,
	createAPILog,
	createErrorLog,
	createProfiler,
} from '../service/tool.service';
import auth from '../middleware/auth.middleware';

const router = express.Router();

/**
 * Endpoint for adding http logs
 */

router.post('/tool/http-logger', auth, (req: Request, res: Response) => {
	try {
		const { data } = req.body;
		// const db: any = await mongoDb(`${process.env.MONGO_DB_NAME}`);
		// const collection = db.collection('application-monitoring-platform');

		// const data = await collection.find({}).toArray();
		// console.log(data);

		// console.log(req.user);
		return res.status(200).json({ message: 'Hello World' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: 'Failed to retrieve data from MongoDB',
		});
	}
});

export default router;
