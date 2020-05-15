// get db object from file at path ../fbadmin.js"
const { db } = require('../fbadmin');

// to get the whole "shops" JSON tree from Firebase and return as API to the client
exports.getAllDiamonds = (req, res) =>
{
    // get whole "shops" JSON tree from Firebase
    db.ref("shops").on("value", (data) =>
    {
        // send the JSON tree back to the client
        res.json(data.val());
    });
}