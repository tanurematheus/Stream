const { MongoClient } = require('mongodb');
require('dotenv').config();

async function connectToMongoDB() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return error;
    }
}

module.exports = {
    connectToMongoDB
}