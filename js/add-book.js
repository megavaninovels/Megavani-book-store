import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const form = document.getElementById("bookForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        await addDoc(collection(db, "books"), {

            title: document.getElementById("title").value.trim(),

            author: document.getElementById("author").value.trim(),

            description: document.getElementById("description").value.trim(),

            price: Number(document.getElementById("price").value),

            mrp: Number(document.getElementById("mrp").value),

            category: document.getElementById("category").value,

            subCategory: document.getElementById("subcategory").value.trim(),

            language: document.getElementById("language").value,

            pages: Number(document.getElementById("pages").value),

            stock: Number(document.getElementById("stock").value),

            cover: document.getElementById("cover").value.trim(),

            featured: document.getElementById("featured").checked,

            bestseller: document.getElementById("bestseller").checked,

            newArrival: document.getElementById("newarrival").checked,

            published: document.getElementById("published").checked,

            createdAt: serverTimestamp()

        });

        alert("Book added successfully!");

        form.reset();

        document.getElementById("published").checked = true;
        document.getElementById("stock").value = 100;

    } catch (error) {

        console.error(error);

        alert("Failed to add book.");

    }

});
