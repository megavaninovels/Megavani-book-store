
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

        container.innerHTML += `

<div class="card mb-3 shadow-sm border-0 rounded-4">

    <div class="row g-0 align-items-center">

        <div class="col-md-2 col-4">

            <img src="${book.image}" class="img-fluid rounded-start">

        </div>

        <div class="col-md-10 col-8">

            <div class="card-body">

                <h4>${book.title}</h4>

                <p class="text-muted">${book.author}</p>

                <h5 class="text-danger">₹${book.price}</h5>

                <div class="d-flex align-items-center gap-2 mt-3">

                    <button
                        class="btn btn-outline-secondary btn-sm"
                        onclick="decreaseQuantity('${book.id}')">
                        −
                    </button>

                    <span class="fw-bold">
                        ${book.quantity}
                    </span>

                    <button
                        class="btn btn-outline-secondary btn-sm"
                        onclick="increaseQuantity('${book.id}')">
                        +
                    </button>

                    <button
                        class="btn btn-danger btn-sm ms-3"
                        onclick="removeBook('${book.id}')">
                        🗑 Remove
                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

`;

    });

    document.getElementById("cart-total").innerText=total;

}

loadCartPage();
// ==========================
// Increase Quantity
// ==========================

function increaseQuantity(id){

    let cart = getCart();

    const item = cart.find(book => book.id == id);

    if(item){
        item.quantity++;
    }

    saveCart(cart);
    updateCartBadge();
    loadCartPage();

}

// ==========================
// Decrease Quantity
// ==========================

function decreaseQuantity(id){

    let cart = getCart();

    const item = cart.find(book => book.id == id);

    if(item){

        item.quantity--;

        if(item.quantity <= 0){

            cart = cart.filter(book => book.id != id);

        }

    }

    saveCart(cart);
    updateCartBadge();
    loadCartPage();

}

// ==========================
// Remove Book
// ==========================

function removeBook(id){

    let cart = getCart();

    cart = cart.filter(book => book.id != id);

    saveCart(cart);
    updateCartBadge();
    loadCartPage();

}
// ==========================
// Buy Now
// ==========================

document.querySelectorAll(".buy-now").forEach(button => {

    button.addEventListener("click", function () {

        const book = {
            id: this.dataset.id,
            title: this.dataset.title,
            author: this.dataset.author,
            price: Number(this.dataset.price),
            image: this.dataset.image,
            quantity: 1
        };

        // Clear old cart
        localStorage.removeItem("cart");

        // Add only this book
        saveCart([book]);

        updateCartBadge();

        // Go to cart page
        window.location.href = "cart.html";

    });

});
