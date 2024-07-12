// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDwivwIIOmOS98eOicByVX3q6Vn6VN1X5I",
  authDomain: "chatting-app-177d3.firebaseapp.com",
  projectId: "chatting-app-177d3",
  storageBucket: "chatting-app-177d3.appspot.com",
  messagingSenderId: "524077068209",
  appId: "1:524077068209:web:9a8899d092bc0789a69790",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
