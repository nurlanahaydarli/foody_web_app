import { uploadFile } from "../helper/uploadFile";
import { parseForm } from "../utils/parseForm";

export async function handlerUploadPOST(req, res, col) {
  try {
    const form = await parseForm(req);

    const { file } = form.files;

    if (!file) {
      res.status(404).json("File not found!");
      return;
    }

    const img_url = await uploadFile(col, file[0]);

    res.status(201).json({ img_url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
