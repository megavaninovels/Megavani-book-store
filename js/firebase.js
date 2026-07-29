
// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

// Firebase Auth
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firestore
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDg-i_hZwj0XrDqBOIF-gx5NfgQ7JJvAIk",
  authDomain: "megavani-bookstore.firebaseapp.com",
  projectId: "megavani-bookstore",
  storageBucket: "megavani-bookstore.firebasestorage.app",
  messagingSenderId: "443760121145",
  appId: "1:443760121145:web:8902d6fda10c760267c4e8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
