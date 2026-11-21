
"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // 1. ÉLÉMENTS DU SITE
    // ========================================

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    // ========================================
    // 2. MENU MOBILE
    // ========================================

    const menuButton = document.querySelector(".menu-toggle");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("active");

            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Fermer le menu" : "Ouvrir le menu"
            );

            menuButton.classList.toggle("is-open", isOpen);

        });

        navigationLinks.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");
                menuButton.classList.remove("is-open");

                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Ouvrir le menu");

            });

        });

    }

    // ========================================
    // 3. NAVIGATION ACTIVE
    // ========================================

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navigationLinks.forEach(link => {

                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active-link", isActive);

                        if (isActive) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }

                    });

                }

            });

        }, {
            rootMargin: "-30% 0px -60% 0px"
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }

    // ========================================
    // 4. ANIMATIONS AU DÉFILEMENT
    // ========================================

    const animatedElements = document.querySelectorAll(
        ".section-heading, .about-main, .about-highlight, " +
        ".skill-card, .service-card, .project-card, .contact-item"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        const revealObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        animatedElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    }

    // ========================================
    // 5. ANNÉE AUTOMATIQUE
    // ========================================

    const currentYear = document.querySelector("#current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ========================================
    // 6. FERMER LE MENU AVEC ÉCHAP
    // ========================================

    document.addEventListener("keydown", event => {

        if (event.key === "Escape" && menuButton && navLinks) {

            navLinks.classList.remove("active");
            menuButton.classList.remove("is-open");

            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Ouvrir le menu");

            menuButton.focus();

        }

    });

    console.log("FANASINA Portfolio : chargé correctement.");

});
