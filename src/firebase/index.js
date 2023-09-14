// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP41KRswrx8_2npLerT1nx0d_lp7FNatU",
  authDomain: "todolist-93b4e.firebaseapp.com",
  projectId: "todolist-93b4e",
  storageBucket: "todolist-93b4e.appspot.com",
  messagingSenderId: "786814476781",
  appId: "1:786814476781:web:183d641047e26644f887e4",
  measurementId: "G-0SLZ2BWYT7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export  default firebase;