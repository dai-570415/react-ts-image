$ git clone https://github.com/dai-570415/react-ts-image.git

$ cd react-ts-image

$ npm install

# Below, please set.

$ npm start


## Firebase.js

```js
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/storage";

// Firebaseのキーを入れる
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
```