import { emptyBasket } from "../constant/basket";
import { ROUTER } from "../constant/router";
import { getDataID } from "../helper/getDataID";
import { getQueryData } from "../helper/getQueryData";
import { uptData } from "../helper/uptData";
import { verifyJWT } from "../utils/jwt";
import { response } from "../utils/response";

export async function handlerAddProductCardGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    const [{ user_id, ...data }] = await getQueryData(
      col,
      "user_id",
      decodedToken.userId
    );

    res.status(200).json(response(data));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerAddProductCardPOST(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    const { product_id } = req.body;

    const card = await getQueryData(col, "user_id", decodedToken.userId);
    const userBasket = card?.[0];

    let newItem;
    let newItems;

    const itemIndex = userBasket.items.findIndex(
      (item) => item.id === product_id
    );

    if (itemIndex == -1) {
      const product = await getDataID(ROUTER.PRODUCTS, product_id);

      newItem = {
        ...product,
        count: 1,
        amount: +product.price,
      };

      newItems = [...userBasket.items, newItem];
    } else {
      const findItem = { ...userBasket.items[itemIndex] };

      newItems = [...userBasket.items];

      const newCount = findItem?.count + 1;

      newItem = {
        ...findItem,
        count: newCount,
        amount: +(+findItem.price * newCount).toFixed(2),
      };

      newItems[itemIndex] = newItem;
    }

    const newdData = {
      items: newItems,
      total_count: newItems.reduce((sum, item) => sum + item.count, 0),
      total_item: newItems.length,
      user_id: decodedToken.userId,
      total_amount: +newItems
        .reduce((sum, item) => sum + parseFloat(item.amount), 0)
        .toFixed(2),
    };

    const data = await uptData(col, userBasket.id, newdData);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerDeleteProductCard(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    const { product_id } = req.body;

    const card = await getQueryData(col, "user_id", decodedToken.userId);
    const userBasket = card?.[0];

    const itemIndex = userBasket.items.findIndex(
      (item) => item.id === product_id
    );

    if (itemIndex == -1) {
      res.status(404).json({ error: "Product is undefined" });
    }

    const findItem = { ...userBasket.items[itemIndex] };

    let newItems = [...userBasket.items];

    if (findItem?.count === 1) {
      newItems = newItems.filter((item) => item.id !== product_id);
    } else {
      const newCount = findItem?.count - 1;

      const newItem = {
        ...findItem,
        count: newCount,
        amount: +(+findItem.price * newCount).toFixed(2),
      };

      newItems[itemIndex] = newItem;
    }

    const newdData = {
      items: newItems,
      total_count: newItems.reduce((sum, item) => sum + item.count, 0),
      total_item: newItems.length,
      user_id: decodedToken.userId,
      total_amount: +newItems
        .reduce((sum, item) => sum + parseFloat(item.amount), 0)
        .toFixed(2),
    };

    const data = await uptData(col, userBasket.id, newdData);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerClearProductCardPOST(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];
  const decodedToken = verifyJWT(idToken);

  try {
    const { basket_id } = req.body;

    if (!basket_id) {
      res.status(404).json({ error: "Invalid basket id" });
    }

    const { user_id, ...data } = await uptData(
      col,
      basket_id,
      emptyBasket(decodedToken.userId)
    );

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}
