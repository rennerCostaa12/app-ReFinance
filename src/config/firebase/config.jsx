import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBplXoy5kNJZo2oHR76zhMnpOPZnV9H-TM",
    authDomain: "refinance-a2d3a.firebaseapp.com",
    projectId: "refinance-a2d3a",
    storageBucket: "refinance-a2d3a.appspot.com",
    messagingSenderId: "659929011751",
    appId: "1:659929011751:web:4a4b8be4c83f1492a1a002"
};

export const AppFirebase = initializeApp(firebaseConfig);
export const Auth = getAuth(AppFirebase);
export const DatabaseFirestore = getFirestore(AppFirebase);