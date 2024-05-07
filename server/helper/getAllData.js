import { convertSnapshotToArray } from "./convertSnapsToArray";
import { firestore } from "../configs/firebaseAdmin";

export async function getAllData(col) {
  const snapshot = await firestore.collection(col).get();
  const data = convertSnapshotToArray(snapshot);

  return data;
}

// import { db } from "configs/firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { convertSnapshotToArray } from "./convertSnapsToArray";

// export async function getAllData(col) {
//   const ref = collection(db, col);
//   const snapshot = await getDocs(ref);

//   const data = convertSnapshotToArray(snapshot);

//   return data;
// }
