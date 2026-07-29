
import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {

        await createUserWithEmailAndPassword(auth, email, password);

        alert("Account Created Successfully");

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);

    }

});
const userCredential = await createUserWithEmailAndPassword(auth, email, password);

const user = userCredential.user;

await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: document.getElementById("name").value.trim(),
    email: email,
    createdAt: new Date()
});
