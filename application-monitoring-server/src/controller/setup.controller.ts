import express, { Request, Response } from 'express';
import auth from '../middleware/auth.middleware';
import { v4 as uuidv4 } from 'uuid';
import { generateClientKey, saveClientKey } from '../service/setup.service';

const router = express.Router();

/**
 * Endpoint for generating client key & storing in db against emailId
 */

router.get(
	'/setup/generate-client-key',
	auth,
	async (req: Request, res: Response) => {
		try {
			console.log(req.headers);
			const clientKey = generateClientKey();

			await saveClientKey('hardik.aswal@gmail.com', clientKey);

			return res.status(200).json({ data: clientKey });
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				error: 'Failed to generate client key',
			});
		}
	},
);

export default router;
