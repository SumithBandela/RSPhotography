// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpmGRLsSAFq0bChTqCzNc2KNzjLz7Vejs",
  authDomain: "rsphotography-45fe1.firebaseapp.com",
  projectId: "rsphotography-45fe1",
  storageBucket: "rsphotography-45fe1.firebasestorage.app",
  messagingSenderId: "732735099358",
  appId: "1:732735099358:web:9569844e5994a65609cd4f",
  measurementId: "G-R12GBH1P4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db,collection,addDoc};