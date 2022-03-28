const functions = require("firebase-functions");
const fireAdminJS = require("./fire");
const fireStore = fireAdminJS.fireStore;
const cors = require("cors")({origin: true});
const express = require("express");
const process = require("process");
const userJS = require("./users.js");
const cookieParser = require("cookie-parser")();
const app = express();

app.use(cors);
app.use(cookieParser);

if (!process.env.DEBUG_PMR) {
  app.use(userJS.validateFirebaseIdToken);
}

app.use(express.json());

app.post("/addContactRequest", async (req, res) => {
  // @ts-ignore

  const retJson = {
    message: "",
    data: {},
    errors: {},
  };

  const message = req.body.data.message;
  const subject = req.body.data.subject;

  if (!message || !subject) {
    retJson.message = "An error occured while trying to add a contact us request";
    retJson.errors["parameters"] = "The subject of message parameter are missing.";
    functions.logger.info(`${req.user.name} tried to make a contact us request, with the following errors:`, retJson);
    res.json(retJson);
    return;
  }

  retJson.data["message"] = message;
  retJson.data["subject"] = subject;

  const contactData = {
    message: message,
    subject: subject,
    added_by: String(req.user.id),

  };

  await fireStore.collection("contacts").doc().create(contactData).then(
      (r) => {
        functions.logger.info("Contact document added with params", contactData);
      },
  ).catch(
      (error) => {
        functions.logger.error("Error on contact document add with params", contactData, error);
      },
  );
  retJson.message = "Request added with success";
  functions.logger.info(`${req.user.name} (${req.user.id}) made a succesfully contact us request.`, retJson);
  res.json(retJson);
});


exports.app=functions.https.onRequest(app);
