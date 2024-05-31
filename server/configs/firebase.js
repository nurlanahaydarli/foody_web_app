// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage,ref } from "firebase/storage";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyC1084Ak7OamlsTvjkAlyVYuh3NNvfuqzc",
//     authDomain: "foody-3.firebaseapp.com",
//     projectId: "foody-3",
//     storageBucket: "foody-3.appspot.com",
//     messagingSenderId: "962449069028",
//     appId: "1:962449069028:web:63e285cc26c17e4a0aedf1"
// };

const firebaseConfig = {
    apiKey: "AIzaSyC68IobQTT7kIpF39ZOAdZFcgv75doxD50",
    authDomain: "foody-4.firebaseapp.com",
    projectId: "foody-4",
    storageBucket: "foody-4.appspot.com",
    messagingSenderId: "745316669318",
    appId: "1:745316669318:web:84ab8b0b32d51120717e07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage(app);
export  const storageRef = ref