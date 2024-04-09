const express = require("express");
const multer = require('multer');
const { upload_file_controller } = require("../controllers/upload_file_controller");
const { upload_middleware } = require("../middlewares/upload_middleware");


const upload = multer({ dest: 'uploads/' });
const upload_video = express();

upload_video.post("/upload", upload.single('file'), upload_middleware, upload_file_controller);

module.exports = { upload_video };
