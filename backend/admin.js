var admin = require("firebase-admin");
var serviceAccount = require("./ServiceAccountKey.json");

//provides mechanism for creating token
//It expires in 1 hour

//signInWithCustomToken() -> will remain signed in when not logged out or invalidated
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//Will hold the UID that be passed as a parameter when creating the custom token
const uid = "some-uid";

//additional claims to the custom token
//will be available in my auth object security rules
const additionalClaims = {
  premiumAccount: true,
};

admin
  .auth()
  .createCustomToken(uid, additionalClaims)
  .then((customToken) => {
    console.log(customToken);
  })
  .catch((error) => {
    console.log("Error creating custom tokens", error);
  });
