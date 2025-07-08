import { firestore } from "../firebase/config";
import {
  setDoc,
  getDocs,
  getDoc,
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
  let total = 0,
    quantity = 0;
  let isCompressed = false;
  let existing = false;

  cart.map((item) => {
    if (item.productName === currentProduct.productName && !isCompressed) {
      total = Number(item.price) + Number(currentProduct.price);
      quantity = item.quantity + 1;
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
      quantity: quantity,
      prevprice: currentProduct.price,
    };
  }
}
export async function getAllCart(user_id) {
  try {
    let items = [];

    const querySnapshot = await getDocs(collection(firestore, "cart"));

    querySnapshot.forEach((doc) => {
      items = doc.data().currentCart;
    });

    if (items.length != 0) {
      return items;
    }
  } catch (error) {
    console.log("Error in add to cart:", error);
  }
}

export async function getProduct(id) {
  const docRef = doc(firestore, "products", id);
  const docsnap = await getDoc(docRef);

  if (docsnap.exists()) {
    return docsnap.data();
  }
}
