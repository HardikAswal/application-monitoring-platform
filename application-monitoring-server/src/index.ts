import express, { Application, Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import { mongoDb } from './utils/mongoDb';
import * as dotenv from 'dotenv';

dotenv.config();

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
app.use(
	express.urlencoded({
		extended: false,
	}),
);
app.use(compression());

/**
 * Initialize the controllers
 */

console.log(process.env.MONGODB_DB_NAME);

app.get('/', async (req: Request, res: Response) => {
	try {
		const { body } = req;

		const db: any = await mongoDb(`${process.env.MONGO_DB_NAME}`);
		const collection = db.collection('application-monitoring-platform');

		const data = await collection.find({}).toArray();
		console.log(data);

		return res.status(200).json({ message: data });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: 'Failed to retrieve data from MongoDB',
		});
	}
});

/**
 * Initialize the application
 */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`🚀🚀 Server started on PORT: ${PORT} 🚀🚀`);
});
