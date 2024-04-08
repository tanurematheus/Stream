const fs = require("fs");
const mongodb = require('mongodb');
const { connectToMongoDB } = require('../config/mongo_connection');
const { disconnectToMongoDB } = require('../config/mongo_disconnect');

const upload_new_video = async (metadata, filename, path) => {
    try {
        const client = await connectToMongoDB();
        const db = client.db('videos');
        const bucket = new mongodb.GridFSBucket(db);
        const videoUploadStream = bucket.openUploadStream(filename, { metadata });
        const videoReadStream = fs.createReadStream(path);
        const uploadPromise = new Promise((resolve, reject) => {
            videoUploadStream.on('finish', resolve);
            videoUploadStream.on('error', reject);
        });
        videoReadStream.pipe(videoUploadStream);
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

module.exports = { upload_new_video };



