"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navigationAnchors = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );
    const currentYear = document.getElementById("current-year");

    // Met à jour automatiquement l'année du pied de page.
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Menu mobile.
    function closeMobileMenu() {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("is-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fermer le menu" : "Ouvrir le menu"
            );
        });

        navigationAnchors.forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 700) {
                closeMobileMenu();
            }
        });
    }

    // Animations d'apparition au défilement.
    const revealSelectors = [
        ".section-heading",
        ".about-main",
        ".about-highlight",
        ".skill-card",
        ".service-card",
        ".project-card",
        ".contact-item"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(", ")
    );

    if ("IntersectionObserver" in window) {
        document.documentElement.classList.add("js-ready");

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    }

    // Met en évidence le lien correspondant à la section visible.
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window && sections.length > 0) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.id;

                    navigationAnchors.forEach((link) => {
                        const isCurrent =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", isCurrent);

                        if (isCurrent) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                });
            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }
});
