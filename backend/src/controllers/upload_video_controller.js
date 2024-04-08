const { upload_new_video } = require('../models/upload_new_video');
const fs = require('fs');

const upload_video_controller = async (req, res) => {
    console.log(req.file);
    const metadata = {
        actors: ["Actor 1", "Actor 2"],
        genre: "Comedy"
    };
    const filename = req.file.originalname;
    try {
        await upload_new_video(metadata, filename, req.file.path);
        res.status(200).send("Video uploaded successfully");
    } catch (error) {
        res.status(500).send("Error uploading video");
    }
};

module.exports = { upload_video_controller };
