// const functions = require("firebase-functions");
// const cookieParser = require("cookie-parser");
// const crypto = require("crypto");
// const fireJS= require("./fire");
// const fireStore=fireJS.fireStore;
// const fireAuth=fireJS.fireAuth;


// // Spotify OAuth 2 setup
// // TODO: Configure the `spotify.client_id` and `spotify.client_secret` Google Cloud environment variables.
// const SpotifyWebApi = require("spotify-web-api-node");
// const Spotify = new SpotifyWebApi({
//   clientId: functions.config().spotify.client_id,
//   clientSecret: functions.config().spotify.client_secret,
//   redirectUri: `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com/popup.html`,
// });

// // Scopes to request.
// const OAUTH_SCOPES = ["user-read-email"];

// /**
//  * Redirects the User to the Spotify authentication consent screen. Also the 'state' cookie is set for later state
//  * verification.
//  */
// exports.redirect = functions.https.onRequest((req, res) => {
//   cookieParser()(req, res, () => {
//     const state = req.cookies.state || crypto.randomBytes(20).toString("hex");
//     functions.logger.log("Setting verification state:", state);
//     res.cookie("state", state.toString(), {maxAge: 3600000, secure: true, httpOnly: true});
//     const authorizeURL = Spotify.createAuthorizeURL(OAUTH_SCOPES, state.toString());
//     res.redirect(authorizeURL);
//   });
// });

// /**
//  * Exchanges a given Spotify auth code passed in the 'code' URL query parameter for a Firebase auth token.
//  * The request also needs to specify a 'state' query parameter which will be checked against the 'state' cookie.
//  * The Firebase custom auth token is sent back in a JSONP callback function with function name defined by the
//  * 'callback' query parameter.
//  */
// exports.token = functions.https.onRequest((req, res) => {
//   try {
//     cookieParser()(req, res, () => {
//       functions.logger.log("Received verification state:", req.cookies.state);
//       functions.logger.log("Received state:", req.query.state);
//       if (!req.cookies.state) {
//         throw new Error("State cookie not set or expired. Maybe you took too long to authorize. Please try again.");
//       } else if (req.cookies.state !== req.query.state) {
//         throw new Error("State validation failed");
//       }
//       functions.logger.log("Received auth code:", req.query.code);
//       Spotify.authorizationCodeGrant(req.query.code, (error, data) => {
//         if (error) {
//           throw error;
//         }
//         functions.logger.log(
//             "Received Access Token:",
//             data.body["access_token"],
//         );
//         Spotify.setAccessToken(data.body["access_token"]);

//         Spotify.getMe(async (error, userResults) => {
//           if (error) {
//             throw error;
//           }
//           functions.logger.log(
//               "Auth code exchange result received:",
//               userResults,
//           );
//           // We have a Spotify access token and the user identity now.
//           const accessToken = data.body["access_token"];
//           const spotifyUserID = userResults.body["id"];
//           const profilePic = userResults.body["images"][0]["url"];
//           const userName = userResults.body["display_name"];
//           const email = userResults.body["email"];

//           // Create a Firebase account and get the Custom Auth Token.
//           const firebaseToken = await createFirebaseAccount(spotifyUserID, userName, profilePic, email, accessToken);
//           // Serve an HTML page that signs the user in and updates the user profile.
//           res.jsonp({token: firebaseToken});
//         });
//       });
//     });
//   } catch (error) {
//     res.jsonp({error: error.toString()});
//   }
//   return null;
// });

