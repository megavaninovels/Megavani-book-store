// Customer
import { auth, db } from "./firebase.js";
const customer = JSON.parse(localStorage.getItem("customer"));

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
