const upload_middleware = (req, res, next) => {
    console.log(req.file);
    if (req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png') {
        req.database = 'images';
    } else if (req.file.mimetype == 'video/mp4') {
        req.database = 'videos';
    } else {
        return res.status(400).send("File type not supported");
    }
    next();
};

module.exports = { upload_middleware };