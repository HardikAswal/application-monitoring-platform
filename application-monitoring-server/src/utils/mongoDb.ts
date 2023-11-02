import { MongoClient, Db, ServerApiVersion } from 'mongodb';

const uri: string = `mongodb+srv://admin:x1DqliJ5rYMqc2Vj@cluster0.qbehugm.mongodb.net/?retryWrites=true&w=majority`;

const mongoDb = async (dbName: string): Promise<Db | null> => {
	const client: MongoClient = new MongoClient(uri);

	try {
		await client.connect();
		console.info('Connected to MongoDB');
		return client.db(dbName);
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		throw new Error('Failed to connect to MongoDB');
	}
};

export { mongoDb };
