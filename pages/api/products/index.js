import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";
import {
  handlerProductGET,
  handlerProductPOST,
} from "../../../server/routes/product";

export default async function handler(req, res) {
  console.log(req.body);
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*"); // replace this your actual origin
  res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  switch (req.method) {
    case METHOD.GET:
      await handlerProductGET(req, res, ROUTER.PRODUCTS);
      return;
    case METHOD.POST:
      await handlerProductPOST(req, res, ROUTER.PRODUCTS);
      return;
    default:
      res.status(405).end();
  }
}
