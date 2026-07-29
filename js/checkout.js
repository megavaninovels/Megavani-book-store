
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

const cart = getCart();

let total = 0;

cart.forEach(book => {
    total += book.price * book.quantity;
});

document.getElementById("checkout-total").innerText = "₹" + total;
