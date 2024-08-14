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
    apiKey: "AIzaSyAg8H6t2CjSNH8yeRaHpdsKc5geHYd_nMc",
  authDomain: "foooody-app.firebaseapp.com",
  projectId: "foooody-app",
  storageBucket: "foooody-app.appspot.com",
  messagingSenderId: "583679006882",
  appId: "1:583679006882:web:6235e9393880a3d721dffb"
};
// const firebaseConfig = {
//     apiKey: "AIzaSyDlD4lxZIGn7riJ_0mfrIbBITvxlPspcCA",
//     authDomain: "foody-5.firebaseapp.com",
//     projectId: "foody-5",
//     storageBucket: "foody-5.appspot.com",
//     messagingSenderId: "1049682588546",
//     appId: "1:1049682588546:web:0f4eac632effcfca51959b"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage(app);
export  const storageRef = ref