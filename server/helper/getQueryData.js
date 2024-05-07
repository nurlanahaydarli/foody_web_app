import { firestore } from "../configs/firebaseAdmin";
import { convertSnapshotToArray } from "./convertSnapsToArray";

export async function getQueryData(col, key, id, condition = "==") {
  try {
    const ref = firestore.collection(col);
    const q = ref.where(key, condition, id);

    const querySnapshot = await q.get();

    const data = convertSnapshotToArray(querySnapshot);

    return data;
  } catch (error) {
    console.error("Error getting query data:", error);
    throw error;
  }
}

// import { db } from "configs/firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { convertSnapshotToArray } from "./convertSnapsToArray";

// export async function getQueryData(col, key, id) {
//   const ref = collection(db, col);

//   const q = query(ref, where(key, "==", id));

//   const snapshot = await getDocs(q);

//   const data = convertSnapshotToArray(snapshot);

//   return data;
// }
