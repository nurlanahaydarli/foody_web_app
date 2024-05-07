import { ROUTER } from "../constant/router";
import { addData } from "../helper/addData";
import { deleteData } from "../helper/deleteData";
import { getAllData } from "../helper/getAllData";
import { getDataID } from "../helper/getDataID";
import { getQueryData } from "../helper/getQueryData";
import { uptData } from "../helper/uptData";
import { Restaurant } from "../models/Restaurant";
import { response } from "../utils/response";

export async function handlerRestuarantGETID(req, res, col) {
  try {
    const { id } = req.query;

    const data = await getDataID(col, id);
    const products = await getQueryData(ROUTER.PRODUCTS, "rest_id", id);

    res.status(200).json(response({ ...data, products }));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerRestuarantGET(req, res, col) {
  try {
    const { category_id, search } = req.query;

    if (category_id) {
      const data = await getQueryData(col, "category_id", category_id);
      res.status(200).json(response(data));
      return;
    }

    if (search) {
      const data = await getQueryData(
        col,
        "name",
        search[0].toUpperCase() + search.slice(1),
        ">="
      );
      res.status(200).json(response(data));
      return;
    }

    const data = await getAllData(col);

    res.status(200).json(response(data));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerRestuarantPOST(req, res, col) {
  try {
    const {
      name,
      cuisine,
      delivery_price,
      delivery_min,
      img_url,
      address,
      category_id,
    } = req.body;

    if (
      !name ||
      !cuisine ||
      !img_url ||
      !address ||
      // (!delivery_price && isNaN(+delivery_price)) ||
      !delivery_min ||
      !category_id
    ) {
      res
        .status(404)
        .json(
          "Please check your fieldnames and also price must be only number!"
        );
      return;
    }

    const restaurant = new Restaurant(
      name,
      cuisine,
      delivery_price,
      delivery_min,
      img_url,
      address,
      category_id
    ).toPlainObject();

    const data = await addData(col, restaurant);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerRestuarantPUT(req, res, col) {
  const { id } = req.query;

  try {
    const {
      name,
      cuisine,
      delivery_price,
      delivery_min,
      img_url,
      address,
      category_id,
    } = req.body;

    if (
      !name ||
      !id ||
      !cuisine ||
      !img_url ||
      !address ||
      (!delivery_price &&
        typeof delivery_price !== "number" &&
        isNaN(+delivery_price)) ||
      !delivery_min ||
      !category_id
    ) {
      res.status(404).json("Please check your fieldnames!");
      return;
    }

    const restaurant = new Restaurant(
      name,
      cuisine,
      delivery_price,
      delivery_min,
      img_url,
      address,
      category_id
    ).toPlainObject();

    const data = await uptData(col, id, restaurant);
    res.status(200).json({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerRestuarantDELETE(req, res, col) {
  try {
    const { id } = req.query;

    await deleteData(col, id);

    res.status(204).json({ message: "Success", id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
