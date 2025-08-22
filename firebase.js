// Your web app's Firebase configuration
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firestore and make it globally available
const db = firebase.firestore();