// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC-8JOrK8h5SBVQimIxV7eWEqynLjRUr1Y",
  authDomain: "carelendar-62858.firebaseapp.com",
  projectId: "carelendar-62858",
  storageBucket: "carelendar-62858.appspot.com",
  messagingSenderId: "943385558297",
  appId: "1:943385558297:web:f624ee85c1e7687cd41988",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
