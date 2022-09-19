const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
const dotenv = require("dotenv");

const router = require("./routes/router");

const PORT = 8000;

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

app.listen(PORT, async () => {
    console.log(`server up on port ${PORT}`);
});



mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);