import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

const cart = getCart();
let customer = {};

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    const snap = await getDoc(doc(db, "users", user.uid));

    customer = snap.data();

    document.getElementById("name").value = customer.name || "";
    document.getElementById("phone").value = customer.phone || "";
    document.getElementById("email").value = customer.email || "";

    document.getElementById("address").value =
        `${customer.addressLine || ""}, ${customer.city || ""}, ${customer.state || ""} - ${customer.pincode || ""}, ${customer.country || ""}`;

});

let total = 0;

cart.forEach(book => {
    total += book.price * book.quantity;
});

document.getElementById("subtotal").innerText = "₹" + total;
document.getElementById("checkout-total").innerText = "₹" + total;
// ==========================
// Proceed to Payment
// ==========================

document.getElementById("payment-btn").addEventListener("click", function () {

    if (
        document.getElementById("name").value.trim() === "" ||
        document.getElementById("phone").value.trim() === "" ||
        document.getElementById("email").value.trim() === "" ||
        document.getElementById("address").value.trim() === ""
    ) {

        alert("Please fill all required fields.");
        return;

    }

    const phone = document.getElementById("phone").value.trim();

    if (phone.length !== 10 || isNaN(phone)) {

        alert("Please enter a valid 10-digit phone number.");
        return;

    }

    customer.address = document.getElementById("address").value.trim();

    localStorage.setItem("customer", JSON.stringify(customer));

    window.location.href = "payment.html";

});
