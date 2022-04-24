
const rateLimit = require("express-rate-limit")({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
});
const cookieParser = require("cookie-parser")();
const cors = require("cors");
const userJS = require("./users.js");


// const csrf = require("csurf");

// const csrfProtection = csrf({
//   cookie: true,
//   secure: true,
//   maxAge: 3600,
//   httpOnly: true,
//   sameSite: "Strict",
// });

exports.applyMiddleware = (handler) => (req, res) => {
  return rateLimit(req, res, () => {
    return cors({origin: true})(req, res, () => {
      return cookieParser(req, res, () => {
        return userJS.validateFirebaseIdToken(req, res, () => {
          return handler(req, res);
        });
      });
    });
  });
};


