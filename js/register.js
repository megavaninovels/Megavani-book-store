import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }
console.log("Name:", name);
console.log("Email:", email);
console.log("Password:", password);
console.log("Type of Email:", typeof email);
console.log("Type of Password:", typeof password);
    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {

            uid: user.uid,
            name: name,
            email: email,
           phone: "",
addressLine: "",
city: "",
state: "",
pincode: "",
country: "India",
            role: "customer",
            createdAt: new Date()

        });

        alert("Account Created Successfully");

        window.location.href = "login.html";

    }

    catch (error) {

        alert(error.message);

    }

});
