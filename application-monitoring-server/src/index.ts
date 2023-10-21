import express, { Application, Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';

const app: Application = express();

/**
 * Initialize the middlewares
 */
app.use(helmet());
app.use(cors());
app.use(
	morgan('dev', {
		stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
			flags: 'a',
		}),
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

/**
 * Initialize the controllers
 */
app.get('/', (req: Request, res: Response) => {
	console.log(req);

	try {
		return res.send(200).json({
			message: 'ok',
			data: {
				name: 'Hardik',
			},
		});
	} catch (exception) {
		console.log(exception);
		res.send(500).json({
			message: 'some error occurred',
		});
	}
});

/**
 * Initialize the application
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`🚀🚀 Server started on PORT: ${PORT} 🚀🚀`);
});
