const express = require("express");
const { upload_video_controller } = require("../controllers/upload_video_controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const upload_video = express();

upload_video.post("/upload", upload.single('file'), upload_video_controller);

module.exports = { upload_video };
