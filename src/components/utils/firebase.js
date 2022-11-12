import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCtsNnTHM3KQ19-u0yjZIZeBba2SvJWBsc",
  authDomain: "todo-boiler.firebaseapp.com",
  databaseURL: "https://todo-boiler-default-rtdb.firebaseio.com",
  projectId: "todo-boiler",
  storageBucket: "todo-boiler.appspot.com",
  messagingSenderId: "1044349079902",
  appId: "1:1044349079902:web:2421896f34221709023fcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);