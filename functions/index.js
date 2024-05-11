const admin = require("firebase-admin");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const { onRequest } = require("firebase-functions/v2/https");

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
    const name = "projects/1021603764543/secrets" +
      "/firebase-service-account-key/versions/1";
    let retries = 0;
    const maxRetries = 3;

    while (!firestoreInstance && retries < maxRetries) {
      try {
        const [version] = await client.accessSecretVersion({ name });
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


// Function to check if email is already in use
async function isEmailAlreadyInUse(email) {
  try {
    await admin.auth().getUserByEmail(email);
    return true;
  } catch (error) {
    return false
  }
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
  { cors: ["localhost:3000"] },
  async (req, res) => {
    const email = req.query.email;
    if (!email) {
      return res.status(400).send("No email provided");
    }
    const firestore = await initializeFirestore();
    if (await isEmailAlreadyInUse(email)) {
      return res.status(409).send("Email already in use");
    }

    // Create a new document in Firestore with verification code
    const docRef = firestore.collection("verificationCodes").doc(email);
    const verificationCode = generateVerificationCode();

    try {
      await docRef.set({
        code: verificationCode,
        expiryTime: new Date(Date.now() + (5 * 60 * 1000)).getTime(),
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
      return res.status(200).send("Email sent successfully");
    } catch (error) {
      if (error.code === "messaging/invalid-argument") {
        return res.status(400).send("Invalid email");
      } else {
        return res.status(500)
          .send("Internal server error. Please try again in a few minutes");
      }
    }
  });


exports.vc = onRequest(
  { cors: ["localhost:3000"] },
  async (req, res) => {
    const email = req.query.email;
    const enteredCode = req.query.code;
    if (email === "") {
      return res.status(400).send("No email provided")
    }
    if (enteredCode === "") {
      return res.status(400).send("No code provided")
    }

    const firestore = await initializeFirestore();

    try {
      // Retrieve verification code document from Firestore
      const verificationDoc = await firestore
        .collection("verificationCodes").doc(email).get();
      if (!verificationDoc.exists) {
        return res.status(400)
          .send("Document doesn't exist");
      }

      const storedCode = verificationDoc.data().code;
      const expiryTime = verificationDoc.data().expiryTime;
      const currentTime = new Date().getTime()

      // Check code validity and expiry
      if (currentTime > expiryTime) {
        return res.status(400).send("Code expired");
      }

      if (storedCode !== enteredCode) {
        return res.status(400).send("Invalid verification code");
      }

      // Code is valid, delete document and return success
      await firestore.collection("verificationCodes").doc(email).delete();
      return res.status(200).send("Email verified successfully");
    } catch (error) {
      return res.status(500)
        .send("Internal server error. Please try again in a few minutes");
    }
  });
