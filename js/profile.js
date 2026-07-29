
import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        const data = docSnap.data();

        document.getElementById("name").value = data.name || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("phone").value = data.phone || "";
        document.getElementById("addressLine").value = data.addressLine || "";
        document.getElementById("city").value = data.city || "";
        document.getElementById("state").value = data.state || "";
        document.getElementById("pincode").value = data.pincode || "";
        document.getElementById("country").value = data.country || "India";

    }

});

document.getElementById("saveProfile").addEventListener("click", async () => {

    const user = auth.currentUser;

    if (!user) return;

    try {

        await updateDoc(doc(db, "users", user.uid), {

            name: document.getElementById("name").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            addressLine: document.getElementById("addressLine").value.trim(),
            city: document.getElementById("city").value.trim(),
            state: document.getElementById("state").value.trim(),
            pincode: document.getElementById("pincode").value.trim(),
            country: document.getElementById("country").value.trim()

        });

        alert("Profile updated successfully!");

    } catch (error) {

        alert(error.message);

    }

});
