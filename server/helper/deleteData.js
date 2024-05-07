import { firestore } from "../configs/firebaseAdmin";

export async function deleteData(col, id) {
  try {
    await firestore.collection(col).doc(id).delete();
  } catch (err) {
    console.log(err);
  }
}

// import { db } from "configs/firebase";
// import { FirestoreError, deleteDoc, doc } from "firebase/firestore";

// export async function deleteData(col, id) {
//   try {
//     const productDocRef = doc(db, col, id);

//     await deleteDoc(productDocRef);

//   } catch (err) {
//     console.log(err);
//   }
// }
