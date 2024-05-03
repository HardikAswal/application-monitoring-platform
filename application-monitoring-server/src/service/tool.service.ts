import { mongoDb } from '../utils/mongoDb';
import * as dotenv from 'dotenv';

dotenv.config();

export async function createHTTPLog(data: any) {
	try {
		const db: any = await mongoDb(`${process.env.MONGODB_DB_NAME}`);
		const collection = db.collection('http');

		await collection.insertOne(data);
	} catch (error) {
		console.log(error);
		throw new Error('Unable to create HTTP log');
	}
}

export async function createEventLog(data: any) {
	try {
		const db: any = await mongoDb(`${process.env.MONGODB_DB_NAME}`);
		const collection = db.collection('event');

		await collection.insertOne(data);
	} catch (error) {
		console.log(error);
		throw new Error('Unable to create event log');
	}
}

export async function createAPILog(data: any) {
	try {
		const db: any = await mongoDb(`${process.env.MONGODB_DB_NAME}`);
		const collection = db.collection('api');

		await collection.insertOne(data);
	} catch (error) {
		console.log(error);
		throw new Error('Unable to create API log');
	}
}

export async function createErrorLog(data: any) {
	try {
		const db: any = await mongoDb(`${process.env.MONGODB_DB_NAME}`);
		const collection = db.collection('error');

		await collection.insertOne(data);
	} catch (error) {
		console.log(error);
		throw new Error('Unable to create error log');
	}
}

export async function createProfiler(data: any) {
	try {
		const db: any = await mongoDb(`${process.env.MONGODB_DB_NAME}`);
		const collection = db.collection('profiler');

		await collection.insertOne(data);
	} catch (error) {
		console.log(error);
		throw new Error('Unable to create profiler log');
	}
}

export async function findEmailIdByClientKey(
	clientKey: string,
): Promise<string | null> {
	try {
		const db: any = await mongoDb(`${process.env.MONGODB_DB_NAME}`);

		const collection = db.collection('auth');
		const document = await collection.findOne({ clientKey });

		if (document) {
			const emailId = document.emailId;
			return emailId;
		} else {
			return null; // No matching document found for the clientKey
		}
	} catch (error) {
		console.error('Error in findEmailIdByClientKey:', error);
		throw new Error('Unable to find emailId by clientKey');
	}
}
