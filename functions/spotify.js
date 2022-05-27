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

exports.setupSpotifyToken = functions.https.onRequest(middlewares.applyMiddleware(
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
              functions.logger.error("Error retrieving user profile at user"+userUID, error);
              throw error;
            }

            functions.logger.log(
                "User: "+userUID+" Auth code exchange result received:",
                userResults,
            );
            // We have a Spotify access token and the user identity now.
            const accessToken = data.body["access_token"];
            const refreshToken=data.body["refresh_token"];
            const spotifyUserID = userResults.body["id"];
            // Save the access token to the Firebase Realtime Database

            const firebaseToken = await updateFireAccountData(
                userUID,
                spotifyUserID,
                accessToken,
                refreshToken,
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

exports.addSpotifySongToParty = functions.https.onRequest(middlewares.applyMiddleware(
    async (req, res) => {
      try {
        const userUID = String(req.user.uid);
        const partyID=req.body.data.partyID;
        const songLink=req.body.data.songLink;

        const isMemberOfParty=await validateIfUserIsMemberOfParty(userUID, partyID);
        if (!isMemberOfParty) {
          throw new Error("You are not a member of this party");
        }

        const spotifyAccessToken = await getUserSpotifyAccessToken(userUID);
        if (!spotifyAccessToken) {
          throw new Error("You need to associate a Spotify account to your PMR account first");
        }

        const songID= getSongID(songLink);
        if (!songID) {
          throw new Error("Song ID not found or song link is invalid!");
        }

        functions.logger.info("User "+userUID+" added song "+songID+" to party "+partyID);

        Spotify.setAccessToken(spotifyAccessToken);
        Spotify.getTrack(songID, {}, async (error, data) => {
          if (error) {
            functions.logger.error("Error retrieving song info at user" + userUID, error);
            throw error;
          }
          functions.logger.info("User:" + userUID + " Song info received:", data);
          const songData = data.body;
          const songName = songData.name;
          const songArtist = songData.artists[0].name;
          const songAlbum = songData.album.name;
          const songDuration = songData.duration_ms;

          // await addSonginParty(partyID, songID, songName, songArtist, songAlbum, songDuration, songLink);
          res.jsonp({
            data: {
              songName: songName,
              songArtist: songArtist,
              songAlbum: songAlbum,
              songDuration: songDuration,
              songLink: songLink,
            }, status: 200,
          });
        });
      } catch (error) {
        res.status(400);
        res.jsonp({data: {error: error.toString()}, status: 400});
      }
    },
));


exports.refreshSpotifyToken = functions.https.onRequest(middlewares.applyMiddleware(
    async (req, res) => {
      try {
        const userUID = String(req.user.uid);
        const spotifyRefreshToken = await getUserSpotifyRefreshToken(userUID);
        if (!spotifyRefreshToken) {
          throw new Error("You need to associate a Spotify account to your PMR account first");
        }
        Spotify.setRefreshToken(spotifyRefreshToken);
        Spotify.refreshAccessToken(async (error, data) => {
          if (error) {
            functions.logger.error("Error refreshing access token at user"+userUID, error);
            throw error;
          }
          functions.logger.info("User:"+userUID+" Access token refreshed:", data);
          const newAccessToken = data.body["access_token"];
          await updateFireAccountData(userUID, null, newAccessToken);
          res.jsonp({data: {token: newAccessToken}, status: 200});
        });
      } catch (error) {
        res.status(400);
        res.jsonp({data: {error: error.toString()}, status: 400});
      }
      return null;
    },
));

exports.validateSpotifyAccessToken= functions.https.onRequest(middlewares.applyMiddleware(
    async (req, res) => {
      try {
        const userUID = String(req.user.uid);
        const spotifyAccessToken = await getUserSpotifyAccessToken(userUID);
        if (!spotifyAccessToken) {
          throw new Error("You need to associate a Spotify account to your PMR account first");
        }
        Spotify.setAccessToken(spotifyAccessToken);
        Spotify.getMe(async (error, data) => {
          if (error) {
            functions.logger.error("Error retrieving user profile at user"+userUID, error);
            throw error;
          }
          functions.logger.info("User:"+userUID+" User profile received:", data);
          res.jsonp({data: {token: spotifyAccessToken}, status: 200});
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
 * @param {refreshToken} refreshToken The refresh token to exchange for a Firebase custom auth token
 * @return {Promise<string>} The Firebase custom auth token in a promise.
 */
async function updateFireAccountData(uid, spotifyID, accessToken, refreshToken) {
  const userData = await fireStore.collection("accounts").doc(uid).get();

  if (userData.exists) {
    // Update the user's Spotify ID and access token in the Realtime Database
    const data = userData.data();
    if (spotifyID) {
      data.spotifyID = spotifyID;
    }
    if (accessToken) {
      data.spotify_access_token = accessToken;
    }
    if (refreshToken) {
      data.spotify_refresh_token = refreshToken;
    }
    await fireStore.collection("accounts").doc(uid).update(data);
    return data.spotify_access_token;
  }
  return null;
}

/**
  * Validates if the user is a member of the party
  * @param {string} userUID
  * @param {string} partyID
  * @return {Promise<boolean>}
  *
  */
async function validateIfUserIsMemberOfParty(userUID, partyID) {
  const partyData = await fireStore.collection("partys").doc(partyID).get();
  if (partyData.exists) {
    const partyMembers=partyData.data().members;
    if (partyMembers.includes(userUID)) {
      return true;
    }
  }
  return false;
}


/**
  * Gets the song ID from the song link
  * @param {string} songLink
  * @return {string}
  */
function getSongID(songLink) {
  try {
    const songID=songLink.split("/")[4].split("?")[0];
    return songID;
  } catch (error) {
    return null;
  }
}

/**
 * Gets the user's Spotify access token from the datastore
 * @param {string} userUID
 * @return {Promise<string>}
 */
async function getUserSpotifyAccessToken(userUID) {
  const userData = await fireStore.collection("accounts").doc(userUID).get();
  if (userData.exists) {
    const data = userData.data();
    return data.spotify_access_token;
  }
  return null;
}
/**
 * Gets the user's Spotify access token from the datastore
 * @param {string} userUID
 * @return {Promise<string>}
 */
async function getUserSpotifyRefreshToken(userUID) {
  const userData = await fireStore.collection("accounts").doc(userUID).get();
  if (userData.exists) {
    const data = userData.data();
    return data.spotify_refresh_token;
  }
  return null;
}
