import { firestore } from "../configs/firebaseAdmin";

export async function addData(col, data) {
  try {
    // Add data to the specified collection
    const docRef = await firestore
      .collection(col)
      .add({ ...data, created: Date.now() });

    const createData = {
      id: docRef.id,
      ...data,
    };

    return createData;
  } catch (err) {
    console.log(err);
  }
}

// import { db } from "configs/firebase";
// import { addDoc, collection } from "firebase/firestore";

// export async function addData(col, data) {
//   try {
//     const ref = collection(db, col);
//     const doc = await addDoc(ref, data);

//     const createData = {
//       id: doc.id,
//       ...data,
//     };

//     return createData;
//   } catch (err) {
//     console.log(err);
//   }
// }
