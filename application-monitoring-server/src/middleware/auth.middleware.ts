import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const serviceAccount = process.env.SERVICE_ACCOUNT_KEY_PATH;

// Initialize Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

interface CustomRequest extends Request {
	user?: admin.auth.DecodedIdToken;
}

export default async function auth(
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) {
	const idToken = req.headers.authorization;

	if (!idToken) {
		return res.status(401).json({ message: 'ID token is missing' });
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		req.user = decodedToken;
		next();
	} catch (error: any) {
		console.error('ID token verification error:', error.message);
		return res.status(403).json({ message: 'ID token is invalid' });
	}
}
