const admin = require('firebase-admin');
require('dotenv').config(); // To load .env file

// Initialize Firebase Admin SDK using environment variables
if (process.env.NODE_ENV !== "test") {
  const credentials = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  };

  admin.initializeApp({
    credential: admin.credential.cert(credentials),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
} else {
  admin.initializeApp(); // No credentials needed for tests
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = {admin, db, auth};
