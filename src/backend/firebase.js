import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCkjPw1a4T2m26XZU-kOk7dSdWJwgiT6ek",
  authDomain: "pro--student.firebaseapp.com",
  projectId: "pro--student",
  storageBucket: "pro--student.appspot.com",
  messagingSenderId: "945775953051",
  appId: "1:945775953051:web:2a37017d41800ec85e323e",
  measurementId: "G-F8TH3HZ0JF",
};

const app = firebase.initializeApp(firebaseConfig);
const storage = app.storage();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const auth = app.auth();
export { db, storage, auth, googleProvider };
