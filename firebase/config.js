import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcuMogzLvpUXQmX97SgmmeUVpnnv8NPi4",
  authDomain: "restaurant-app-671ce.firebaseapp.com",
  projectId: "restaurant-app-671ce",
  storageBucket: "restaurant-app-671ce.firebasestorage.app",
  messagingSenderId: "316804060506",
  appId: "1:316804060506:web:db37e579672ce7e3fc0f63"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export {app, auth};