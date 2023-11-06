import { mongoDb } from '../utils/mongoDb';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config();

export function generateClientKey(): string {
	return `log-${uuidv4()}`;
}

export async function saveClientKey(
	emailId: string,
	clientKey: string,
): Promise<void> {
	try {
		const db: any = await mongoDb(`${process.env.MONGODB_DB_NAME}`);
		const collection = db.collection('auth');

		const existingDocument = await collection.findOne({ emailId });

		if (existingDocument) {
			await collection.updateOne({ emailId }, { $set: { clientKey } });
			console.log(`Updated key: ${clientKey}`);
		} else {
			await collection.insertOne({ clientKey, emailId });
			console.log(`Created a new document with key: ${clientKey}`);
		}

		console.log(`Stored key: ${clientKey}, value: ${emailId}`);
	} catch (error) {
		console.log(error);
		throw new Error('Unable to save client key');
	}
}
