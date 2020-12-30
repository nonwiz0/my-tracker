import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxL2D_53tAIIzjeXpVznxQUg49ia89fUs",
    authDomain: "my-tracker-b7c2a.firebaseapp.com",
    projectId: "my-tracker-b7c2a",
    storageBucket: "my-tracker-b7c2a.appspot.com",
    messagingSenderId: "594662315023",
    appId: "1:594662315023:web:67f471df14ff95e3097f7a",
    measurementId: "G-NYMP4BM4D3"
  };

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();