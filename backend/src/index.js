const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { upload_video } = require('./routes/upload_video');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(upload_video);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});