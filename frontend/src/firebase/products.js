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

// Will be revised for now it gets all the products
export async function getTrending() {
  try {
    let items = [];
    let object_data = {};

    const querySnapshot = await getDocs(collection(firestore, "products"));

    querySnapshot.forEach((doc) => {
      object_data.id = doc.id;
      object_data.data = doc.data();
      items.push(object_data);
      object_data = {};
    });

    console.log(items);

    if (items.length != 0) {
      return items;
    }
  } catch (error) {}
}

export async function getSimilar(category) {
  try {
    const ref = collection(firestore, "products");
    const q = query(ref, where("category", "==", category));
    const snapshot = await getDocs(q);
    let document = [];

    snapshot.forEach((doc) => {
      document.push(doc.data());
    });

    if (document) return document;
  } catch (error) {
    console.log("Error Occured in Get Similar", error);
  }
}

// Here we can have a TypeError: can't access property "_freezeSettings", e is undefined when we try to query an undefined or null database
export async function getProductBySeller(seller_id) {
  try {
    const docRef = collection(firestore, "products");
    const q = query(docRef, where("seller_id", "==", seller_id));
    const snapShot = await getDocs(q);
    let products = [];

    snapShot.forEach((doc) => {
      products.push(doc.data());
    });

    if (products.length > 0) {
      return products;
    }
  } catch (error) {
    console.log("Error in get product by seller", error);
  }
}
