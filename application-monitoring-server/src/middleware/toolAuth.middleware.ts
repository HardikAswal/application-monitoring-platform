import { Request, Response, NextFunction } from 'express';

export default async function toolAuth(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: 'Token is missing' });
	}

	try {
		//get corresponsing email from mongo
		next();
	} catch (error: any) {
		console.error('ID token verification error:', error.message);
		return res.status(403).json({ message: 'ID token is invalid' });
	}
}
