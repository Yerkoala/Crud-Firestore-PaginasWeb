import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZfs6NANEcNshkH81rDACtDYI7eN1woeE",
  authDomain: "serverbddnorelacional.firebaseapp.com",
  projectId: "serverbddnorelacional",
  storageBucket: "serverbddnorelacional.appspot.com",
  messagingSenderId: "390004693644",
  appId: "1:390004693644:web:ea45c18dcfb876d97b39a9"
  };
// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();