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

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();

    if (name === "" || phone === "" || email === "" || address === "") {

        alert("Please fill all required fields.");

        return;

    }

    if (phone.length !== 10 || isNaN(phone)) {

        alert("Please enter a valid 10-digit phone number.");

        return;

    }

    const customer = {
        name,
        phone,
        email,
        address
    };

    localStorage.setItem("customer", JSON.stringify(customer));

    window.location.href = "payment.html";

});
