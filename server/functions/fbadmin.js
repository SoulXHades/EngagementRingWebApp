const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.database();

// export for other files to use these objects
module.exports = { admin, db };