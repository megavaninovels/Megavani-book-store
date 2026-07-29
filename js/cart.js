
// ================================
// YAAN Publication - Cart System
// ================================

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update Cart Badge
function updateCartBadge() {
    const badge = document.getElementById("cart-count");

    if (!badge) return;

    const cart = getCart();

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    badge.textContent = total;
}

// Add to Cart
document.querySelectorAll(".add-to-cart").forEach(button => {

    button.addEventListener("click", function () {

        const book = {
            id: this.dataset.id,
            title: this.dataset.title,
            author: this.dataset.author,
            price: Number(this.dataset.price),
            image: this.dataset.image,
            quantity: 1
        };

        let cart = getCart();

        const existing = cart.find(item => item.id === book.id);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push(book);
        }

        saveCart(cart);
        updateCartBadge();

        alert("✅ Added to Cart");
    });

});

// Load badge when page opens
updateCartBadge();

// ==========================
// Load Cart Page
// ==========================

function loadCartPage(){

    const container = document.getElementById("cart-items");

    if(!container) return;

    const cart = getCart();

    if(cart.length===0){

        container.innerHTML="<h4>Your cart is empty.</h4>";

        return;

    }

    let total=0;

    container.innerHTML="";

    cart.forEach(book=>{

        total+=book.price*book.quantity;

        container.innerHTML+=`

<div class="card mb-3">

<div class="row g-0">

<div class="col-md-2">

<img src="${book.image}"

class="img-fluid rounded-start">

</div>

<div class="col-md-10">

<div class="card-body">

<h5>${book.title}</h5>

<p>${book.author}</p>

<h5>₹${book.price}</h5>

<p>

Quantity :

${book.quantity}

</p>

</div>

</div>

</div>

</div>

`;

    });

    document.getElementById("cart-total").innerText=total;

}

loadCartPage();
