// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "finalproject-e3e7e.firebaseapp.com",
  projectId: "finalproject-e3e7e",
  storageBucket: "finalproject-e3e7e.appspot.com",
  messagingSenderId: "421706009370",
  appId: "1:421706009370:web:14de9a5946937326eb7aa3",
  measurementId: "G-K8K9FB1PWV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
