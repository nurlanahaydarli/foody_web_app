// pages/api/auth/signin.js

import admin from "../../../server/configs/firebaseAdmin";
import { ROUTER } from "../../../server/constant/router";
import { addData } from "../../../server/helper/addData";
import { getQueryData } from "../../../server/helper/getQueryData";
import { enableCors } from "../../../server/utils/enableCors";
import { generateJWT, generateRefreshToken } from "../../../server/utils/jwt";
import { comparePasswords } from "../../../server/utils/passwordHash";

async function handler(req, res) {
  if (req.method == "GET") {
    res.status(200).json({ hello: "hey" });
    // await handlerProductGET(req, res, ROUTER.PRODUCTS);
  }

  if (req.method == "POST") {
    const { email, password } = req.body;

    try {
      const userCredentials = await admin.auth().getUserByEmail(email);

      const userInfo = await getQueryData(
        ROUTER.USERS_HASH_PASSWORD,
        "email",
        email
      );

      const isPasswordCorrect = await comparePasswords(
        password,
        userInfo[0].password
      );

      if (!isPasswordCorrect || !userCredentials) {
        res.status(404).json({ error: "Password or email is not correct" });
      }

      // const access_token = await admin
      //   .auth()
      //   .createCustomToken(userCredentials.uid);

      const access_token = generateJWT(userCredentials.uid);
      const refresh_token = generateRefreshToken(userCredentials.uid);

      const card = await getQueryData(
        ROUTER.CARD,
        "user_id",
        userCredentials.uid
      );

      const userCard = card?.[0];

      if (!userCard) {
        await addData(ROUTER.CARD, {
          items: [],
          user_id: userCredentials.uid,
          total_amount: 0,
          total_item: 0,
        });
      }

      const user = {
        id: userCredentials.uid,
        email: userCredentials.email,
        ...userCredentials.customClaims,
        access_token,
        refresh_token,
      };

      res.status(200).json({
        message: "User signed in successfully",
        user,
      });
    } catch (error) {
      console.error("Error signing in:", error);
      res.status(401).json({ error: "Could not sign in" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }

  // switch (req.method) {
  //   case METHOD.GET:
  //     await handlerProductGET(req, res, ROUTER.PRODUCTS);
  //     return;
  //   case METHOD.POST:
  //     await handlerProductPOST(req, res, ROUTER.PRODUCTS);
  //     return;
  //   default:
  //     res.status(405).end();
  // }
}

// async function handler(req, res) {
//   // await applyCors(req, res);

//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*"); // replace this your actual origin
//   res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );

//   if (req.method === "POST") {
//     const { email, password } = req.body;

//     try {
//       const userCredentials = await admin.auth().getUserByEmail(email);

//       const userInfo = await getQueryData(
//         ROUTER.USERS_HASH_PASSWORD,
//         "email",
//         email
//       );

//       const isPasswordCorrect = await comparePasswords(
//         password,
//         userInfo[0].password
//       );

//       if (!isPasswordCorrect || !userCredentials) {
//         res.status(404).json({ error: "Password or email is not correct" });
//       }

//       // const access_token = await admin
//       //   .auth()
//       //   .createCustomToken(userCredentials.uid);

//       const access_token = generateJWT(userCredentials.uid);
//       const refresh_token = generateRefreshToken(userCredentials.uid);

//       const card = await getQueryData(
//         ROUTER.CARD,
//         "user_id",
//         userCredentials.uid
//       );

//       const userCard = card?.[0];

//       if (!userCard) {
//         await addData(ROUTER.CARD, {
//           items: [],
//           user_id: userCredentials.uid,
//           total_amount: 0,
//           total_item: 0,
//         });
//       }

//       const user = {
//         id: userCredentials.uid,
//         email: userCredentials.email,
//         ...userCredentials.customClaims,
//         access_token,
//         refresh_token,
//       };

//       res.status(200).json({
//         message: "User signed in successfully",
//         user,
//       });
//     } catch (error) {
//       console.error("Error signing in:", error);
//       res.status(401).json({ error: "Could not sign in" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }

export default enableCors(handler);
