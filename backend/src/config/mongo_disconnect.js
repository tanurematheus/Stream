const { MongoClient } = require('mongodb');
require('dotenv').config();

async function disconnectToMongoDB() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.close();
        console.log('Disconnected from MongoDB');
        return client;
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
        return error;
    }
}

module.exports = { disconnectToMongoDB };
