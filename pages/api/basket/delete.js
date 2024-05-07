import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";
import { handlerDeleteProductCard } from "../../../server/routes/basket";

export default async function handler(req, res) {
  console.log(req.body);
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Set other CORS headers as needed (e.g., methods, headers, etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  switch (req.method) {
    case METHOD.DELETE:
      await handlerDeleteProductCard(req, res, ROUTER.CARD);
      return;
    default:
      res.status(405).end();
  }
}
