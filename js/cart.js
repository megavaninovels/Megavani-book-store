
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
