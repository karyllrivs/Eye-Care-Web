import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDz1WJVxstYlL08Sy5yhoThqEoEGJ8LqJM",
  authDomain: "eye-care-9a730.firebaseapp.com",
  databaseURL:
    "https://eye-care-9a730-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eye-care-9a730",
  storageBucket: "eye-care-9a730.appspot.com",
  messagingSenderId: "616114647494",
  appId: "1:616114647494:web:ca41a44fb140fce0f882c7",
  measurementId: "G-T8TNKVFS8B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics, app };
