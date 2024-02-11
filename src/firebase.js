import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHFHaRquDG_JkBMzM26QzQKfsXe1AvHJ8",
  authDomain: "fir-react-login-seed.firebaseapp.com",
  databaseURL: "https://fir-react-login-seed-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-react-login-seed",
  storageBucket: "fir-react-login-seed.appspot.com",
  messagingSenderId: "111794557588",
  appId: "1:111794557588:web:7017ac634effa83b445a81"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
