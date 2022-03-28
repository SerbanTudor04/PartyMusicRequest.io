const admin = require("firebase-admin");
//  handles the firebase global app instance
const fireApp=admin.initializeApp();
exports.fireStore=admin.firestore(fireApp);
exports.fireAuth=admin.auth(fireApp);
