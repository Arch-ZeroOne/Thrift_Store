import { firestore } from "../firebase/config";
import {
  setDoc,
  getDocs,
  doc,
  collection,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";

export async function addToCart(id, items) {
  const docRef = collection(firestore, "cart");
  const q = query(docRef, where("userId", "==", id));
  const snapShot = await getDocs(q);

  if (!snapShot.empty) {
    var documentId = null;
    snapShot.forEach((data) => {
      documentId = data.id;
    });
    await updateDoc(doc(firestore, "cart", documentId), {
      currentCart: items,
    });
    return;
  } else {
    console.log("Empty");
    await addDoc(collection(firestore, "cart"), {
      userId: id,
      currentCart: items,
    });
  }
}

export function isExisting(cart, currentProduct) {
  let total = 0;
  let isCompressed = false;
  let existing = false;

  cart.map((item) => {
    if (item.productName === currentProduct.productName && !isCompressed) {
      total = Number(item.price) + Number(currentProduct.price);
      // console.log(
      //   `${Number(item.price)} + ${Number(currentProduct.price)} = ${total}`
      // );
      existing = true;
      isCompressed = true;
    }
  });

  if (existing) {
    return {
      productName: currentProduct.productName,
      price: total,
      prevprice: currentProduct.price,
    };
  }
}
