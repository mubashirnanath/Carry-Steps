import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

async function connect() {
    try {
        const mongod = await MongoMemoryServer.create();
        const getUri = mongod.getUri();
        mongoose.set('strictQuery', true);
        const db = await mongoose.connect(getUri)
        console.log("Database Connected");
        return db;
    } catch (error) {
        console.log('Invalid Database connetion');
    }
}

export default connect;