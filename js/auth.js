
import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    const loginLink = document.getElementById("loginLink");
    const registerLink = document.getElementById("registerLink");

    if (!loginLink || !registerLink) return;

    if (user) {

        loginLink.style.display = "none";
        registerLink.innerHTML = "Logout";

        registerLink.onclick = async function (e) {

            e.preventDefault();

            await signOut(auth);

            alert("Logged Out");

            window.location.reload();

        };

    }

});
