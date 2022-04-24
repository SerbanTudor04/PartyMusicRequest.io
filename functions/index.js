const functions = require("firebase-functions");
const spotifyJS = require("./spotify.js");
const userJS = require("./users.js");
const contactUsJS=require("./contactUS.js");

exports.contactUsApi=functions.https.onRequest(contactUsJS.app);
exports.userCreate = functions.auth.user().onCreate(userJS.userCreate);
exports.setupSpotifyToken = functions.https.onRequest(spotifyJS.setupSpotifyToken);
exports.addSpotifySongToParty = functions.https.onRequest(spotifyJS.addSpotifySongToParty);
exports.getRedirectAuthSpotify = functions.https.onRequest(spotifyJS.getRedirectAuthSpotify);
exports.validateSpotifyAccessToken = functions.https.onRequest(spotifyJS.validateSpotifyAccessToken);
exports.refreshSpotifyToken = functions.https.onRequest(spotifyJS.refreshSpotifyToken);
