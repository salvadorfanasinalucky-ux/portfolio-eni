
"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. MENU DE NAVIGATION MOBILE
    // =====================================

    const menuButton = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    function closeMenu() {
        if (!menuButton || !navLinks) return;

        navLinks.classList.remove("active");
        menuButton.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Ouvrir le menu");
        document.body.classList.remove("menu-open");
    }

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuButton.classList.toggle("is-open", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Fermer le menu" : "Ouvrir le menu"
            );

            document.body.classList.toggle("menu-open", isOpen);
        });

        navigationLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Fermer le menu avec la touche Échap
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
                menuButton.focus();
            }
        });

        // Fermer le menu si on revient à un écran large
        window.addEventListener("resize", () => {
            if (window.innerWidth > 700) {
                closeMenu();
            }
        });
    }


    // =====================================
    // 2. NAVIGATION ACTIVE AU DÉFILEMENT
    // =====================================

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

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

            },
            {
                rootMargin: "-25% 0px -65% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    // =====================================
    // 3. ANIMATIONS À L'APPARITION
    // =====================================

    const animatedElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-main, " +
        ".about-highlight, " +
        ".skill-card, " +
        ".service-card, " +
        ".project-card, " +
        ".contact-item"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        const revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        revealObserver.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        animatedElements.forEach(element => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });

    }


    // =====================================
    // 4. ANNÉE AUTOMATIQUE DU FOOTER
    // =====================================

    const currentYear = document.querySelector("#current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================
    // 5. PROTECTION DES LIENS INTERNES
    // =====================================

    navigationLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) {
                event.preventDefault();
                return;
            }

            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });

    });


    // =====================================
    // 6. MESSAGE DE CONFIRMATION CONSOLE
    // =====================================

    console.log(
        "FANASINA Portfolio : application chargée correctement."
    );

});
