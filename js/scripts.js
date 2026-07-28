/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
document.querySelectorAll(".read-more").forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        const card = this.closest(".card");
        const full = card.querySelector(".description-full");
        const short = card.querySelector(".description-short");

        if (full.style.display === "block") {

            full.style.display = "none";
            short.style.display = "block";
            this.innerHTML = "Read More ▼";

        } else {

            full.style.display = "block";
            short.style.display = "none";
            this.innerHTML = "Read Less ▲";

        }

    });

});
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        alert("Book added to cart!");
    });
});
