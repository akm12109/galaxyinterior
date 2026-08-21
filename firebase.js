// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDb2ag6LLlWe4KHv55i8aLEgVlWbyzBbnI",
    authDomain: "galaxy-interior.firebaseapp.com",
    databaseURL: "https://galaxy-interior-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "galaxy-interior",
    storageBucket: "galaxy-interior.firebasestorage.app",
    messagingSenderId: "230292492490",
    appId: "1:230292492490:web:6dce7f3b67865286be6433",
    measurementId: "G-VL9CFXR81T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const db = getFirestore(app);