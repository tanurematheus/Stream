const { upload_new_file } = require('../models/upload_new_file');

const upload_file_controller = async (req, res) => {
    const tags = {
        actors: ["Actor 1", "Actor 2"],
        genre: "Comedy"
    };
    const filename = req.file.originalname;
    try {
        await upload_new_file(req.database, 'upload', tags, filename, req.file.path);
        res.status(200).send("File uploaded successfully");
    } catch (error) {
        res.status(500).send("Error uploading file");
    }
};

module.exports = { upload_file_controller };
