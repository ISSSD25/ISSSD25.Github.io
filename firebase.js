// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDfVEk8zOj0PFdOxhXs4Lm3yGyEVltKYO4",
    authDomain: "isssd25.firebaseapp.com",
    projectId: "isssd25",
    storageBucket: "isssd25.firebasestorage.app",
    messagingSenderId: "264537104781",
    appId: "1:264537104781:web:a7a03f384af226b73b1dc4",
    measurementId: "G-ECSSNGQZND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);