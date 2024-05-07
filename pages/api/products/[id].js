import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";
import {
  handlerProductDELETE,
  handlerProductGETID,
  handlerProductPUT,
} from "../../../server/routes/product";

export default async function handler(req, res) {
  console.log(req.body);
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Set other CORS headers as needed (e.g., methods, headers, etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  switch (req.method) {
    case METHOD.GET:
      await handlerProductGETID(req, res, ROUTER.PRODUCTS);
      return;
    case METHOD.PUT:
      await handlerProductPUT(req, res, ROUTER.PRODUCTS);
      return;
    case METHOD.DELETE:
      await handlerProductDELETE(req, res, ROUTER.PRODUCTS);
      return;
    default:
      res.status(405).end();
  }
}
