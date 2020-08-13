// ********** config script from firebase ********** 
// const firebaseConfig = {
//     apiKey: "AIzaSyC7i1hSfkEkaw3gvy1AANc7fBKkxMKV81Q",
//     authDomain: "instagram-clone-react-fa346.firebaseapp.com",
//     databaseURL: "https://instagram-clone-react-fa346.firebaseio.com",
//     projectId: "instagram-clone-react-fa346",
//     storageBucket: "instagram-clone-react-fa346.appspot.com",
//     messagingSenderId: "221008915251",
//     appId: "1:221008915251:web:dbefc827554d88ed28ec46",
//     measurementId: "G-FTFPN3NRGH"
//   };

import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC7i1hSfkEkaw3gvy1AANc7fBKkxMKV81Q",
    authDomain: "instagram-clone-react-fa346.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-fa346.firebaseio.com",
    projectId: "instagram-clone-react-fa346",
    storageBucket: "instagram-clone-react-fa346.appspot.com",
    messagingSenderId: "221008915251",
    appId: "1:221008915251:web:dbefc827554d88ed28ec46",
    measurementId: "G-FTFPN3NRGH"
});

// accessing 3 services from firebase

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

