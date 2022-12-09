import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCj9CzpFYApwS384Ze7EOQ8rpKA6G7prOY",
    authDomain: "bookin-d9e9c.firebaseapp.com",
    projectId: "bookin-d9e9c",
    storageBucket: "bookin-d9e9c.appspot.com",
    messagingSenderId: "307297920105",
    appId: "1:307297920105:web:136c0042af1bf89779aef8"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);