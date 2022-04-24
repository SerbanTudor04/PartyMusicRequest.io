const functions = require("firebase-functions");
const middlewares=require("./middleware.js");

exports.getCSRFToken= functions.https.onRequest(middlewares.applyMiddleware(
    async (req, res) => {
      const csrfToken = req.csrfToken();
      res.cookie("XSRF-TOKEN", csrfToken, {
        maxAge: 3600000,
        secure: true,
        httpOnly: false,
      });
      res.json({status: "success", data: {csrfToken: csrfToken}});
    },
),
);
