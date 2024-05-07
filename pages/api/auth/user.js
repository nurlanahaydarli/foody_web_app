import admin from "../../../server/configs/firebaseAdmin";

import { verifyJWT } from "../../../server/utils/jwt";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Set other CORS headers as needed (e.g., methods, headers, etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];
  const decodedToken = verifyJWT(idToken);

  if (req.method === "GET") {
    try {
      const userCredentials = await admin.auth().getUser(decodedToken.userId);

      const user = {
        id: userCredentials.uid,
        email: userCredentials.email,
        ...userCredentials.customClaims,
        creationTime: userCredentials.metadata.creationTime,
      };

      // Here, you can perform actions based on the authenticated user's UID
      // For example, fetch user data from Firestore or perform other tasks

      return res.status(200).json({ message: "Authenticated!", user });
    } catch (err) {
      console.log(err);
      res.status(401).json({ error: "Could not sign in" });
    }
    return;
  }

  if (req.method === "PUT") {
    try {
      const { email, username, fullname, img_url, phone } = req.body ?? {};

      if (!email || !username || !fullname || !phone) {
        res.status(404).json({ error: "Please fill to fields" });
      }

      const updateUser = {
        email,
      };

      const customClaims = {
        username,
        fullname,
        img_url,
        phone,
      };

      await admin.auth().updateUser(decodedToken.userId, updateUser);

      // Update custom claims for the user
      await admin.auth().setCustomUserClaims(decodedToken.userId, customClaims);

      return res.status(200).json({
        message: "Updated user!",
        user: { ...updateUser, id: decodedToken.userId, ...customClaims },
      });
    } catch (err) {
      console.log(err);
      res.status(401).json({ error: "Could not sign in" });
    }
    return;
  }
}

// {
//     "email":"r10@gmail.com",
//     "password":"serxan1111"
//   }
