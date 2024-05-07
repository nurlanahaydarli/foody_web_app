import { firestore } from "../configs/firebaseAdmin";

export async function uptData(col, id, data) {
  try {
    // Update the document with the specified ID in the collection
    await firestore.collection(col).doc(id).update(data);

    const updatedData = {
      id,
      ...data,
    };

    return updatedData;
  } catch (err) {
    console.log(err);
  }
}

// import { db } from "configs/firebase";
// import { updateDoc, doc } from "firebase/firestore";

// export async function uptData(col, id, data) {
//   try {
//     const productDocRef = doc(db, col, id);

//     await updateDoc(productDocRef, data);

//     const uptData = {
//       id,
//       ...data,
//     };

//     return uptData;
//   } catch (err) {
//     console.log(err);
//   }
// }
