// firebaseAdmin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
    const serviceAccount = require("./foody-3-firebase-adminsdk-8atpy-19b4998802.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;