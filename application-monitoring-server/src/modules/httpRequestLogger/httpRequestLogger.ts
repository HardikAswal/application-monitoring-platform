import { Request, Response, NextFunction } from 'express';

export function httpRequestLogger(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	// Log the HTTP request data to PostgreSQL
	// pool.query(
	// 	'INSERT INTO http_requests (method, url, status_code, timestamp) VALUES ($1, $2, $3, $4)',
	// 	[req.method, req.url, res.statusCode, new Date()],
	// 	(error: Error | null, result: any) => {
	// 		if (error) {
	// 			console.error('Error logging HTTP request:', error);
	// 		}
	// 	},
	// );
	console.log(req);
	console.log(res);
	next();
}
