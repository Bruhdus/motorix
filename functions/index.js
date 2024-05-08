const admin = require("firebase-admin");
const {SecretManagerServiceClient} = require("@google-cloud/secret-manager");
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const {onRequest} = require("firebase-functions/v2/https");

let firestoreInstance;

/**
 * Accesses the secret from Google Cloud Secret Manager.
 * @return {Promise<admin.firestore.Firestore>} A Promise
 * that resolves to the initialized Firestore instance.
 */
async function initializeFirestore() {
  if (!firestoreInstance) {
    // Getting the secret service account key from Google's secret service
    const client = new SecretManagerServiceClient();
    const name = "projects/1021603764543/secrets"+
    "/firebase-service-account-key/versions/1";
    let retries = 0;
    const maxRetries = 3;

    while (!firestoreInstance && retries < maxRetries) {
      try {
        const [version] = await client.accessSecretVersion({name});
        const serviceAccount = JSON.parse(
            version.payload.data.toString("utf8"));

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });

        firestoreInstance = admin.firestore();
      } catch (error) {
        console.error("Error accessing secret:", error);

        // Implemented exponential backoff retry logic
        const backoffDelay = Math.min(2 ** retries * 1000, 60000);
        console.warn(`Retrying secret access in ${backoffDelay / 1000}seconds`);
        await new Promise((resolve) => setTimeout(resolve, backoffDelay));

        retries++; // Increment the retry count
      }
    }

    if (!firestoreInstance) {
      console.error("Maximum retries exceeded. Failing Cloud Function.");
      throw new Error("Maximum retries exceeded. Failing Cloud Function.");
    }
  }

  return firestoreInstance;
}


/**
 * Generates a random verification code.
 * @return {string} The generated verification code.
 */
function generateVerificationCode() {
  const codeLength = 6;
  const possibleChars = "0123456789";
  let verificationCode = "";
  for (let i = 0; i < codeLength; i++) {
    verificationCode += possibleChars
        .charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return verificationCode;
}

exports.sendMail = onRequest(
    {cors: ["localhost:3000"]},
    async (req, res) => {
      const email = req.query.email;
      const verificationCode = generateVerificationCode();
      const firestore = await initializeFirestore();

      // Create a new document in Firestore with verification code
      const docRef = firestore.collection("verificationCodes").doc(email);

      try {
        await docRef.set({
          code: verificationCode,
          expiryTime: new Date().getTime(),
        });

        const transporter = nodemailer.createTransport({
          host: functions.config().nodemailer.host,
          port: 587,
          secure: false,
          auth: {
            user: functions.config().nodemailer.email.user,
            pass: functions.config().nodemailer.email.pass,
          },
        });

        const message = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Verify Your Email Address",
          text: `Your verification code is: ${verificationCode}`,
          html: `<b>Your verification code is: ${verificationCode}</b>`,
        };

        transporter.sendMail(message);
        res.status(200).send("Email sent successfully");
      } catch (error) {
        if (error.code === "messaging/invalid-argument") {
          res.status(400).send("Invalid email or verification code");
        } else {
          res.status(500).send("Internal server error");
        }
      }
    });


exports.verifyCode = onRequest(
  {cors: ["localhost:3000"]},
  async (req, res) => {
    const email = req.query.email;
    const enteredCode = req.query.code;
    const firestore = initializeFirestore();

    try {
      // Retrieve verification code document from Firestore
      firestore.collection("verificationCodes").doc(email).get()
        .then((doc) => {
          if (!doc.exists) {
            return res.status(400).send({error: "Invalid verification code or code expired"});
          }

          const storedCode = doc.data().code;
          const expiryTime = doc.data().expiryTime;

          // Check code validity and expiry
          if (enteredCode !== storedCode ||
              expiryTime < admin.firestore.Timestamp.now().toMillis()) {
            return {error: "Invalid verification code or code expired"};
          }

          // Code is valid, delete document and return success
          return firestore.collection("verificationCodes").doc(email).delete()
              .then(() => {
                return {message: "Email verified successfully"};
              })
              .catch((error) => {
                console.error("Error deleting verification code:", error);
                return {error};
              });
        })
        .catch((error) => {
          console.error("Error retrieving verification code:", error);
          return {error};
        });
    } catch (error) {

    }
});
