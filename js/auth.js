import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    const guestMenu = document.getElementById("guestMenu");
    const userMenu = document.getElementById("userMenu");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!guestMenu || !userMenu) return;

    if (user) {

        guestMenu.style.display = "none";
        userMenu.style.display = "block";

    } else {

        guestMenu.style.display = "block";
        userMenu.style.display = "none";

    }

    if (logoutBtn) {

        logoutBtn.onclick = async function (e) {

            e.preventDefault();

            await signOut(auth);

            localStorage.removeItem("customer");
            localStorage.removeItem("cart");

            window.location.href = "login.html";

        };

    }

});
