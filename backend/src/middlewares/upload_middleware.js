const upload_middleware = (req, res, next) => {
    console.log("Middleware for upload_video");
    next();
};

module.exports = { upload_middleware };