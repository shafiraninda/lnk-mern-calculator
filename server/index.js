require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app =  express();
const cors = require("cors");
const routes = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// router
app.use(routes)

const CONNECTION_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@lnkcalculator.bzimz34.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 50000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.Promise = global.Promise;