const functions = require("firebase-functions");
const fireAdminJS = require("./fire");
const fireStore = fireAdminJS.fireStore;
const crypto = require("crypto");
const SpotifyWebApi = require("spotify-web-api-node");
const middlewares=require("./middleware.js");

// Spotify API


const Spotify = new SpotifyWebApi({
  clientId: functions.config().spotify.client_id,
  clientSecret: functions.config().spotify.client_secret,
  redirectUri: "https://partymusicrequest.web.app/auth/callback/spotify",
});

// Spotify auth scopes
const OAUTH_SCOPES = [
  "user-read-email",
  "user-read-currently-playing",
  "user-read-playback-position",
  "user-modify-playback-state",
];

exports.getRedirectAuthSpotify = functions.https.onRequest(
    middlewares.applyMiddleware(
        async (req, res) => {
          const state = req.cookies.state || crypto.randomBytes(20).toString("hex");
          functions.logger.log("Setting verification state:", state);
          res.cookie("state", state.toString(), {
            maxAge: 3600000,
            secure: true,
            httpOnly: true,
          });
          const authorizeURL = Spotify.createAuthorizeURL(
              OAUTH_SCOPES,
              state.toString(),
          );
          res.send({data: {redirectURL: authorizeURL, state: state.toString()}, status: 200});
        }),
);

exports.validateSpotifyToken = functions.https.onRequest(middlewares.applyMiddleware(
    async (req, res) => {
      try {
        const userUID = String(req.user.uid);
        const queryState = req.query.state ?? req.body.data.state;
        const queryCode = req.query.code ?? req.body.data.code;
        if ( !queryState || !queryCode) {
          throw new Error(
              "State cookie not set or expired. Maybe you took too long to authorize. Please try again.",
          );
        }

        Spotify.authorizationCodeGrant(queryCode, (error, data) => {
          if (error) {
            functions.logger.log("Error retrieving access token at user"+userUID, error);
            throw error;
          }
          functions.logger.log(
              "Received Access Token:",
              data.body["access_token"],
          );
          Spotify.setAccessToken(data.body["access_token"]);

          Spotify.getMe(async (error, userResults) => {
            if (error) {
              throw error;
            }
            functions.logger.log(
                "User: "+userUID+" Auth code exchange result received:",
                userResults,
            );
            // We have a Spotify access token and the user identity now.
            const accessToken = data.body["access_token"];
            const spotifyUserID = userResults.body["id"];
            // Save the access token to the Firebase Realtime Database
            const firebaseToken = await updateFireAccountData(
                userUID,
                spotifyUserID,
                accessToken,
            );

            // Serve an HTML page that signs the user in and updates the user profile.
            res.jsonp({data: {token: firebaseToken}, status: 200});
          });
        });
      } catch (error) {
        res.status(400);
        res.jsonp({data: {error: error.toString()}, status: 400});
      }
      return null;
    },
));

/**
 * Updates a Firebase account with the given user profile and returns a custom auth token allowing
 * signing-in this account.
 * Also saves the accessToken to the datastore at /accounts/$uid
 *
 * @param {user} uid User profile object returned by Firebase Auth
 * @param {spotifyID} spotifyID Spotify user ID
 * @param {accessToken} accessToken The access token to exchange for a Firebase custom auth token
 * @return {Promise<string>} The Firebase custom auth token in a promise.
 */
async function updateFireAccountData(uid, spotifyID, accessToken) {
  const userData = await fireStore.collection("accounts").doc(uid).get();

  if (userData.exists) {
    // Update the user's Spotify ID and access token in the Realtime Database
    const data = userData.data();
    data.spotifyID = spotifyID;
    data.spotify_access_token = accessToken;
    await fireStore.collection("accounts").doc(uid).update(data);
    const spotifyUid = `spotify:${spotifyID}`;
    const customToken = await fireAdminJS.fireAuth.createCustomToken(
        spotifyUid,
    );
    functions.logger.log(
        "Created Custom token for UID \"",
        uid,
        "\" Token:",
        customToken,
    );
    return customToken;
  }
  return null;
}
