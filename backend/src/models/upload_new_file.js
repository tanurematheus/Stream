const fs = require("fs");
const mongodb = require('mongodb');
const { connectToMongoDB } = require('../config/mongo_connection');
const { disconnectToMongoDB } = require('../config/mongo_disconnect');

const upload_new_file = async (database, bucketName, tags, filename, path) => {
    try {
        const client = await connectToMongoDB();
        const db = client.db(database);
        const bucket = new mongodb.GridFSBucket(db, { bucketName: bucketName });
        const fileUploadStream = bucket.openUploadStream(filename, { tags });
        const fileReadStream = fs.createReadStream(path);
        const uploadPromise = new Promise((resolve, reject) => {
            fileUploadStream.on('finish', resolve);
            fileUploadStream.on('error', reject);
        });
        fileReadStream.pipe(fileUploadStream);
        await uploadPromise;
    } catch (error) {
        throw error;
    } finally {
        await disconnectToMongoDB();
        fs.unlink(path, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
};

module.exports = { upload_new_file };



