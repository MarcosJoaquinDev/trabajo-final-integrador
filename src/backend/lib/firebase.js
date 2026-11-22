// API "compat" de Firebase: mantiene el estilo namespaced (.collection(), .doc())
// que usan los repositorios, y funciona con las credenciales de la app web.
const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

// Los repositorios esperan `admin` como la instancia de Firestore.
module.exports = { admin: db, db };
