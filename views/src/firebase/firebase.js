import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "Goes HERE",
  authDomain: "xpert-dcc46.firebaseapp.com",
  projectId: "xpert-dcc46",
  storageBucket: "xpert-dcc46.appspot.com",
  messagingSenderId: "383137692774",
  appId: "1:383137692774:web:ac182454bac3de0b6b41a7",
  measurementId: "G-TBQQMDKQB1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
