import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";
import {
  handlerOfferDELETE,
  handlerOfferGETID,
  handlerOfferPUT,
} from "../../../server/routes/offer";

export default async function handler(req, res) {
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Set other CORS headers as needed (e.g., methods, headers, etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  switch (req.method) {
    case METHOD.GET:
      await handlerOfferGETID(req, res, ROUTER.OFFER);
      return;
    case METHOD.PUT:
      await handlerOfferPUT(req, res, ROUTER.OFFER);
      return;
    case METHOD.DELETE:
      await handlerOfferDELETE(req, res, ROUTER.OFFER);
      return;
    default:
      res.status(405).end();
  }
}
