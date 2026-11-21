
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        link.addEventListener("click", () => {
            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    console.log("Portfolio chargé correctement.");
});
