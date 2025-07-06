const express = require("express");
const router = express.Router();

var admin = require("firebase-admin");
var serviceAccount = require("../ServiceAccountKey.json");

//provides mechanism for creating token
//It expires in 1 hour

//signInWithCustomToken() -> will remain signed in when not logged out or invalidated
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//Will hold the UID that be passed as a parameter when creating the custom token

//additional claims to the custom token
//will be available in my auth object security rules

//*Route that handles the adding of claims
router.post("/", (req, res) => {
  if (req.body.id) {
    const additionalClaims = {
      isSeller: req.body.seller,
    };

    admin
      .auth()
      .setCustomUserClaims(req.body.id, additionalClaims)
      .catch((error) => {
        console.log("Error creating custom tokens", error);
      });
  }
});

//* Gets the current role
router.post("/getRole", (req, res) => {
  const idToken = req.body.token;
  if (idToken) {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((claims) => {
        res.json({ seller: claims.isSeller });
      });
  }
});

module.exports = router;
