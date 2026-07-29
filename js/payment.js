// Customer
import { auth, db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
const customer = JSON.parse(localStorage.getItem("customer"));
let currentUser = null;

onAuthStateChanged(auth, (user) => {

    currentUser = user;

});

document.getElementById("customer-name").innerText = customer.name;
document.getElementById("customer-phone").innerText = customer.phone;
document.getElementById("customer-email").innerText = customer.email;
document.getElementById("customer-address").innerText = customer.address;

// Cart

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const list = document.getElementById("book-list");

let total = 0;

cart.forEach(book => {

    total += book.price * book.quantity;

    list.innerHTML += `

<div class="d-flex justify-content-between align-items-center mb-3">

<div>

<h5>${book.title}</h5>

<p class="text-muted mb-0">

Qty : ${book.quantity}

</p>

</div>

<strong>

₹${book.price * book.quantity}

</strong>

</div>

<hr>

`;

});

document.getElementById("subtotal").innerText = "₹" + total;
document.getElementById("grand-total").innerText = "₹" + total;
const payButton = document.getElementById("payNow");

payButton.addEventListener("click", () => {

    openRazorpay();

});
function openRazorpay() {

    var options = {

        key: "rzp_live_Sc4uTAV0qWbqo1",

        amount: total * 100,

        currency: "INR",

        name: "YAAN Publication",

        description: "Book Purchase",

        image: "assets/logo.png",

        prefill: {

            name: customer.name,

            email: customer.email,

            contact: customer.phone

        },

        theme: {

            color: "#6b1d46"

        },

       handler: async function (response) {

    if (!currentUser) {

        alert("Please login again.");
        return;

    }


    try {

       const orderRef = await addDoc(collection(db, "orders"), {

            uid: currentUser.uid,

            customer: customer,

            items: cart,

            total: total,

            paymentId: response.razorpay_payment_id,

            paymentStatus: "Paid",

            orderStatus: "Placed",

            createdAt: serverTimestamp()

        });
localStorage.setItem("orderId", orderRef.id);
        localStorage.setItem(
            "paymentId",
            response.razorpay_payment_id
        );

        localStorage.removeItem("cart");

        alert("Payment Successful!");

        window.location.href = "success.html";

    } catch (error) {

        console.error(error);

        alert("Order save failed.");

    }

},
