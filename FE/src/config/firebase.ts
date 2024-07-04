import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBxnoq4oxkvcE-i8wx4yD7LOewz-P5kDXM",
  authDomain: "toinh25102004.firebaseapp.com",
  projectId: "toinh25102004",
  storageBucket: "toinh25102004.appspot.com",
  messagingSenderId: "727497630428",
  appId: "1:727497630428:web:fd073302cef92c0c1cca19",
  measurementId: "G-E2Z7DW4HNV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
