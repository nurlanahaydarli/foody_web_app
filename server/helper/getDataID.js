import { firestore } from "../configs/firebaseAdmin";

export async function getDataID(col, itemId) {
  try {
    // Get the document with the specified ID from the collection
    const productDoc = await firestore.collection(col).doc(itemId).get();

    if (productDoc.exists) {
      const productData = { id: productDoc.id, ...productDoc.data() };
      return productData;
    } else {
      return "Product not found";
    }
  } catch (err) {
    console.log(err);
  }
}

// import { db } from "configs/firebase";
// import { doc, getDoc } from "firebase/firestore";

// export async function getDataID(col, itemId) {
//   const productRef = doc(db, col, itemId); // Update with your collection name
//   const productSnap = await getDoc(productRef);

//   if (productSnap.exists()) {
//     const product = { id: productSnap.id, ...productSnap.data() };
//     return product;
//   } else {
//     return "Product not found";
//   }
// }
