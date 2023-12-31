// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHOZVXFNvgLbqc5lbfe_J7fA2bQLlLwV0",
  authDomain: "movie-list-adc78.firebaseapp.com",
  projectId: "movie-list-adc78",
  storageBucket: "movie-list-adc78.appspot.com",
  messagingSenderId: "697649131765",
  appId: "1:697649131765:web:1d5f76cb33177b445895bc",
  measurementId: "G-3SNV357GYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);