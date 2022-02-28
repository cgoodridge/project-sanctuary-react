// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGS7aJ--tZICb9zBfCqWEy2pwCc-roDc8",
  authDomain: "natgeo-database.firebaseapp.com",
  projectId: "natgeo-database",
  storageBucket: "natgeo-database.appspot.com",
  messagingSenderId: "553317843027",
  appId: "1:553317843027:web:89d438c60e5b2184e446a6",
  measurementId: "G-3P0R5F60ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);