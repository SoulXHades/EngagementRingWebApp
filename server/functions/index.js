const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp();
var db = admin.database();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// to get the whole "shops" JSON tree from Firebase and return as API to the client
// ref: https://firebase.google.com/docs/database/admin/retrieve-data#node.js
exports.getData = functions.region("asia-east2").https.onRequest((req, res) => 
{
    // get whole "shops" JSON tree from Firebase
    db.ref("shops").on("value", (data) =>
    {
        // send the JSON tree back to the client
        res.json(data.val());
    });
});
