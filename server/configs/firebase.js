// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1084Ak7OamlsTvjkAlyVYuh3NNvfuqzc",
    authDomain: "foody-3.firebaseapp.com",
    projectId: "foody-3",
    storageBucket: "foody-3.appspot.com",
    messagingSenderId: "962449069028",
    appId: "1:962449069028:web:63e285cc26c17e4a0aedf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fileStorage = getStorage(app);