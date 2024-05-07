import { emptyBasket } from "../constant/basket";
import { ROUTER } from "../constant/router";
import { addData } from "../helper/addData";
import { deleteData } from "../helper/deleteData";
import { getAllData } from "../helper/getAllData";
import { getDataID } from "../helper/getDataID";
import { getQueryData } from "../helper/getQueryData";
import { uptData } from "../helper/uptData";
import { Order } from "../models/Order";
import { verifyJWT } from "../utils/jwt";
import { response } from "../utils/response";

export async function handlerOrderGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const orders = await getAllData(col);

    res.status(200).json(response(orders));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerOrderHistoryGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const histories = await getAllData(col);

    res.status(200).json(response(histories));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerUserOrderGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    const orders = await getQueryData(col, "customer_id", decodedToken.userId);

    res.status(200).json(response(orders));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerAddOrderPOST(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);

    const { basket_id, delivery_address, payment_method, contact } = req.body;

    console.log('"payment_method', payment_method);

    // if (payment_method != 0 || payment_method != 1) {
    //   res
    //     .status(404)
    //     .json({ error: "Invalid payment method.Please choose 0 or 1!" });
    //   return;
    // }

    const userBasket = await getDataID(ROUTER.CARD, basket_id);

    if (!userBasket.items.length) {
      res.status(404).json({ error: "Basket is empty!" });
    }

    const order = new Order(
      decodedToken.userId,
      delivery_address,
      userBasket.total_amount,
      contact,
      payment_method,
      userBasket.items
    );

    const data = await addData(col, order);

    await uptData(ROUTER.CARD, basket_id, emptyBasket(decodedToken.userId));

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerDeleteOrder(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { order_id } = req.body;

    const order = await getDataID(ROUTER.ORDER, order_id);

    if (!order) {
      res.status(404).json({ error: "Order is undefined" });
    }

    await addData(ROUTER.ORDER_HISTORY, order);

    await deleteData(col, order_id);
    res.status(204).json({ message: "Success", order_id });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
