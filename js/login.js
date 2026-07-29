
import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleBtn");

// Email Login
loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter Email and Password");
        return;
    }

    try {

        await signInWithEmailAndPassword(auth, email, password);

        alert("Login Successful");

        window.location.href = "index.html";

    } catch (error) {

        alert(error.message);

    }

});

// Google Login
googleBtn.addEventListener("click", async () => {

    try {

        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider);

        alert("Google Login Successful");

       window.location.replace("index.html");
    } catch (error) {

        alert(error.message);

    }

});
