import { addData } from "../helper/addData";
import { deleteData } from "../helper/deleteData";
import { getAllData } from "../helper/getAllData";
import { getDataID } from "../helper/getDataID";
import { uptData } from "../helper/uptData";
import { Offer } from "../models/Offer";
import { response } from "../utils/response";

export async function handlerOfferGET(req, res, col) {
  try {
    const data = await getAllData(col);

    res.status(200).json(response(data));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerOfferGETID(req, res, col) {
  try {
    const { id } = req.query;

    const data = await getDataID(col, id);

    res.status(200).json(response(data));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerOfferPOST(req, res, col) {
  try {
    const { name, img_url, description } = req.body;

    if (!name || !img_url || !description) {
      res.status(404).json("Your fields are empty!");
      return;
    }

    const offer = new Offer(name, description, img_url).toPlainObject();

    const data = await addData(col, offer);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerOfferPUT(req, res, col) {
  try {
    const { id } = req.query;

    const { name, img_url, description } = req.body;

    if (!name || !id || !img_url || !description) {
      res
        .status(404)
        .json(
          "Please check your fieldnames and also price must be only number!"
        );
      return;
    }

    const offer = new Offer(name, description, img_url).toPlainObject();

    const data = await uptData(col, id, offer);
    res.status(200).json({ message: "Success", data });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function handlerOfferDELETE(req, res, col) {
  try {
    const { id } = req.query;

    await deleteData(col, id);

    res.status(204).json({ message: "Success", id });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
