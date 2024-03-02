import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0FiJ3vwH4_9UCuXqtrS8ti6XAYJDvwb8",
  authDomain: "english-learning-46694.firebaseapp.com",
  projectId: "english-learning-46694",
  storageBucket: "english-learning-46694.appspot.com",
  messagingSenderId: "35094008730",
  appId: "1:35094008730:web:81233c6ff6aee4acf2e023"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
