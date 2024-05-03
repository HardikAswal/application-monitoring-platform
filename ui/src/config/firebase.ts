import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvhyfJ5i0460X-y1ZEJPJVxzOh4VIBafI",
  authDomain: "application-monitoring-97531.firebaseapp.com",
  projectId: "application-monitoring-97531",
  storageBucket: "application-monitoring-97531.appspot.com",
  messagingSenderId: "57697269324",
  appId: "1:57697269324:web:daa85814a68daa1fcd66e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { app, provider, auth };
