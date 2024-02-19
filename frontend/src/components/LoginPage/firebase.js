// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM2MN4AsTF3g4rAxrS5_tvBFlYj8PfjWY",
  authDomain: "trade-trove-cmpt372.firebaseapp.com",
  projectId: "trade-trove-cmpt372",
  storageBucket: "trade-trove-cmpt372.appspot.com",
  messagingSenderId: "1061437628625",
  appId: "1:1061437628625:web:8625fec5cc2d431c7365f0",
  measurementId: "G-LXGJL7532E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

