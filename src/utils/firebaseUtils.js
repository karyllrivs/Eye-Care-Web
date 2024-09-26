import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCadgv1pL0ATNNDWUCdRuIKV0M47PxlAWc",
  authDomain: "eye-care-68b1a.firebaseapp.com",
  projectId: "eye-care-68b1a",
  storageBucket: "eye-care-68b1a.appspot.com",
  messagingSenderId: "744794584754",
  appId: "1:744794584754:web:be9edd6bbec9d487e2fbab",
  measurementId: "G-G7NFZED6Q1",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
