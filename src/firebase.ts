import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtAyCRutAC0T3aLax8-YQB36zN4fld9uE",
  authDomain: "daily-moments-61251.firebaseapp.com",
  projectId: "daily-moments-61251",
  storageBucket: "daily-moments-61251.appspot.com",
  messagingSenderId: "382240730766",
  appId: "1:382240730766:web:c089f3fa8dfd98694263df",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
