const cors = require("cors");
const express = require("express");
const functions = require("firebase-functions");

const app = express();
// allow cross-origin requests (cors)
app.use(cors({ origin: true }));

// function objects from file at path "handlers/diamonds.js"
const { getAllDiamonds } = require('./handlers/diamonds');


// handle GET POST requests
app.get('/getAllDiamonds', getAllDiamonds);     // calls getDiamondData()

// ref: https://firebase.google.com/docs/database/admin/retrieve-data#node.js
// handle api requests
exports.api = functions.region("asia-east2").https.onRequest(app);
