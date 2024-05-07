import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";

import {
  handlerCategoryDELETE,
  handlerCategoryGETID,
  handlerCategoryPUT,
} from "../../../server/routes/category";

export default async function handler(req, res) {
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Set other CORS headers as needed (e.g., methods, headers, etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  switch (req.method) {
    case METHOD.GET:
      await handlerCategoryGETID(req, res, ROUTER.CATEGORY);
      return;
    case METHOD.PUT:
      await handlerCategoryPUT(req, res, ROUTER.CATEGORY);
      return;
    case METHOD.DELETE:
      await handlerCategoryDELETE(req, res, ROUTER.CATEGORY);
      return;
    default:
      res.status(405).end();
  }
}
