const functions = require("firebase-functions");
const middlewares=require("./middleware.js");

exports.getCSRFToken= functions.https.onRequest(middlewares.applyMiddleware(
    async (req, res) => {
      const csrfToken = req.csrfToken();
      res.cookie("csrfToken", csrfToken, {
        maxAge: 3600000,
        secure: true,
        httpOnly: true,
        });
      res.json({data: {csrfToken: csrfToken}, status: 200});
    },
),
);