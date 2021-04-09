import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDN-qLMZN3SaTK8h3ZP6-rWkYItG0ETKuw",
  authDomain: "essafacours.firebaseapp.com",
  projectId: "essafacours",
  storageBucket: "essafacours.appspot.com",
  messagingSenderId: "413648904712",
  appId: "1:413648904712:web:84ec96f7428afcaf27e7bd",
  measurementId: "G-6XJKMQ54FQ",
};

const app = firebase.initializeApp(firebaseConfig);
const storage = app.storage();
const db = app.firestore();
// const googleProvider = new firebase.auth.GoogleAuthProvider();
const auth = app.auth();

export { db, storage, auth};//,googleProvider };
