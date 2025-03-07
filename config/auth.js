const admin = require('firebase-admin');

require('dotenv').config(); 

const credentials = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Fix newlines in private key
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  };

const COOKIE_NAME = "authToken"
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false, // Use true in production with HTTPS
    sameSite: 'Lax',
    maxAge: 3600 * 1000, // 1 hour
};

module.exports = {COOKIE_NAME, COOKIE_OPTIONS};