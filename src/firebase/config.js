// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9om_hZlZxClAEXnKabADlgBjW1ex4ikI",
  authDomain: "thrift-store-36d33.firebaseapp.com",
  projectId: "thrift-store-36d33",
  storageBucket: "thrift-store-36d33.firebasestorage.app",
  messagingSenderId: "302115712745",
  appId: "1:302115712745:web:8b6367e72627f969b78a78",
  measurementId: "G-96CQXVNXG1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
