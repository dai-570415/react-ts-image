import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "Your_Code",
    authDomain: "Your_Code",
    databaseURL: "Your_Code",
    projectId: "Your_Code",
    storageBucket: "Your_Code",
    messagingSenderId: "Your_Code",
    appId: "Your_Code",
    measurementId: "Your_Code"
};

firebase.initializeApp(firebaseConfig);

export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;