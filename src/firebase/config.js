import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyChTJrSaORCI6RxmaOwF-SpdDuOaP0KsLg",
  authDomain: "chat-app-855de.firebaseapp.com",
  projectId: "chat-app-855de",
  storageBucket: "chat-app-855de.appspot.com",
  messagingSenderId: "469447475329",
  appId: "1:469447475329:web:a65498e49016e1ee138d80"
};

// init firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp };