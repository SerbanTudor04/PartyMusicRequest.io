const functions = require("firebase-functions");
const admin = require("firebase-admin");

const fireApp=admin.initializeApp();
const fireStore=admin.firestore(fireApp);
const fireAuth=admin.auth(fireApp);

const cors = require("cors")({origin: true});
const express = require("express");
const process = require("process");

const cookieParser = require("cookie-parser")();
// const bodyParser = require("body-parser");
const app = express();


const validateFirebaseIdToken = async (req, res, next) => {
  functions.logger.log("Check if request is authorized with Firebase ID token");

  if ((!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) &&
        !(req.cookies && req.cookies.__session)) {
    // functions.logger.error(
    //     "No Firebase ID token was passed as a Bearer token in the Authorization header.",
    //     "Make sure you authorize your request by providing the following HTTP header:",
    //     "Authorization: Bearer <Firebase ID Token>",
    //     "or by passing a \"__session\" cookie.",
    // );
    res.status(403).send("Unauthorized");
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    // functions.logger.log("Found \"Authorization\" header");
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    // functions.logger.log("Found \"__session\" cookie");
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send("Unauthorized");
    return;
  }

  try {
    const decodedIdToken = await fireAuth.verifyIdToken(idToken);
    functions.logger.log("ID Token correctly decoded", decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    // functions.logger.error("Error while verifying Firebase ID token:", error);
    res.status(403).send("Unauthorized");
    return;
  }
};


app.use(cors);
app.use(cookieParser);

if (!process.env.DEBUG_PMR) {
  app.use(validateFirebaseIdToken);
}

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(express.json());

app.post("/addContactRequest", async (req, res) => {
  // @ts-ignore

  const retJson={
    message: "",
    data: {},
    errors: {},
  };

  const message= req.body.data.message;
  const subject= req.body.data.subject;

  if (!message || !subject) {
    retJson.message="An error occured while trying to add a contact us request";
    retJson.errors["parameters"]="The subject of message parameter are missing.";
    functions.logger.info(`${req.user.name} tried to make a contact us request, with the following errors:`, retJson);
    res.json(retJson);
    return;
  }

  retJson.data["message"]=message;
  retJson.data["subject"]=subject;

  const contactData={
    message: message,
    subject: subject,
    added_by: String(req.user.id),

  };

  await fireStore.collection("contacts").doc().create(contactData).then(
      (r)=>{
        functions.logger.info("Contact document added with params", contactData);
      },
  ).catch(
      (error)=>{
        functions.logger.error("Error on contact document add with params", contactData, error);
      },
  );
  retJson.message="Request added with success";
  functions.logger.info(`${req.user.name} (${req.user.id}) made a succesfully contact us request.`, retJson);
  res.json(retJson);
});


exports.api = functions.https.onRequest(app);
