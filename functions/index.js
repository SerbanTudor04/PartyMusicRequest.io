const functions = require("firebase-functions");
const spotifyJS = require("./spotify.js");
const userJS = require("./users.js");
const contactUsJS=require("./contactUS.js");

exports.contactUsApi=functions.https.onRequest(contactUsJS.app);
exports.userCreate = functions.auth.user().onCreate(userJS.userCreate);
exports.validateSpotifyToken = functions.https.onRequest(spotifyJS.validateSpotifyToken);
exports.getRedirectAuthSpotify = functions.https.onRequest(spotifyJS.getRedirectAuthSpotify);
