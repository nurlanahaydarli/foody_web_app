import { fileStorage } from "../configs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import fs from "fs";

export const uploadFile = async (folder = "uploads", file) => {
  const fileContent = fs.readFileSync(file.path);

  const fileName = file?.name ?? file?.originalFilename.split(".")[0];

  const storageRef = ref(fileStorage, `${folder}/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, fileContent, {
    contentType: file.headers["content-type"],
  });

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track the upload progress here if needed
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
