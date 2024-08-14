// firebaseAdmin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
    // const serviceAccount = require("./foody-3-firebase-adminsdk-8atpy-6897ff2d7c.json");
    const serviceAccount = require("./foooody-app-firebase-adminsdk-ccre1-fb5e4eb599.json");
    
    // const serviceAccount = require("./foody-5-firebase-adminsdk-pvv01-e301ba401b.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;