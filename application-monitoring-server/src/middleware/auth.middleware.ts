import { Request, Response, NextFunction } from 'express';

// Authorization Middleware
export default function auth(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers['Authorization'];
	const clientKey = process.env.CLIENT_KEY;

	if (authHeader && authHeader === `Bearer ${clientKey}`) {
		// Authorized
		next();
	} else {
		// Unauthorized
		res.status(401).json({ error: 'Unauthorized' });
	}
}
