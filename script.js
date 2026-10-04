/* =========================================================
   VISHNUVARTHAN R — PREMIUM PORTFOLIO
   Complete script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01 — ELEMENTS
    ===================================================== */

    const header = document.querySelector(".header");
    const navLinks = document.querySelector(".nav-links");
    const menuBtn = document.querySelector(".menu-btn");

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    const revealElements = document.querySelectorAll(
        ".reveal, .stat-card, .skill-card, .project-card, .timeline-item"
    );

    const profileCard = document.querySelector(".profile-card");
    const hero = document.querySelector(".hero");


    /* =====================================================
       02 — HEADER SCROLL EFFECT
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =====================================================
       03 — MOBILE NAVIGATION
    ===================================================== */

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("mobile-active");

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuBtn.innerHTML = isOpen
                ? "✕"
                : "☰";
        });


        /* Close mobile menu after clicking link */

        navItems.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove(
                    "mobile-active"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.innerHTML = "☰";
            });

        });
    }


    /* =====================================================
       04 — SMOOTH SCROLL
    ===================================================== */

    navItems.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       05 — ACTIVE NAVIGATION
    ===================================================== */

    if (sections.length && navItems.length) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const currentId =
                            entry.target.id;

                        navItems.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                            const linkTarget =
                                link.getAttribute("href");

                            if (
                                linkTarget ===
                                `#${currentId}`
                            ) {
                                link.classList.add(
                                    "active"
                                );
                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",
                    threshold: 0
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }




    /* =====================================================
       06 — SCROLL REVEAL
    ===================================================== */

    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach((element, index) => {

            element.classList.add("reveal");

            /*
             * Slight stagger effect
             */

            const delay =
                Math.min(index * 50, 300);

            element.style.transitionDelay =
                `${delay}ms`;

            revealObserver.observe(element);
        });
    }


    /* =====================================================
       07 — PROFILE CARD 3D TILT
       Desktop only
    ===================================================== */

    if (
        profileCard &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        profileCard.addEventListener(
            "mousemove",
            event => {

                const rect =
                    profileCard.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -4;

                const rotateY =
                    ((x - centerX) / centerX) * 4;

                profileCard.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-6px)
                    scale(1.01)
                    `;
            }
        );


        profileCard.addEventListener(
            "mouseleave",
            () => {

                profileCard.style.transform =
                    "";

            }
        );
    }


    /* =====================================================
       08 — PROJECT CARD TILT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );

    if (
        projectCards.length &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        projectCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const rotateX =
                        ((y - rect.height / 2) /
                            (rect.height / 2)) *
                        -2;

                    const rotateY =
                        ((x - rect.width / 2) /
                            (rect.width / 2)) *
                        2;

                    card.style.transform =
                        `
                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-8px)
                        `;
                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });
    }

    document.querySelectorAll('.profile-avatar img').forEach((img) => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

    /* =====================================================
       09 — MAGNETIC BUTTON EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn"
        );

    if (
        buttons.length &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        buttons.forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `
                        translate(
                            ${x * 0.08}px,
                            ${y * 0.08}px
                        )
                        `;
                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform = "";

                }
            );

        });
    }


    /* =====================================================
       10 — CURSOR GLOW
       Very subtle
    ===================================================== */

    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        const cursorGlow =
            document.createElement("div");

        cursorGlow.className =
            "cursor-glow";

        document.body.appendChild(
            cursorGlow
        );


        document.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.transform =
                    `
                    translate(
                        ${event.clientX}px,
                        ${event.clientY}px
                    )
                    `;

            }
        );
    }


    /* =====================================================
       11 — ACTIVE HERO PARALLAX
    ===================================================== */

    if (
        hero &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        hero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;

                const visual =
                    document.querySelector(
                        ".hero-visual"
                    );

                if (!visual) return;

                visual.style.transform =
                    `
                    translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )
                    `;
            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                const visual =
                    document.querySelector(
                        ".hero-visual"
                    );

                if (!visual) return;

                visual.style.transform = "";

            }
        );
    }


    /* =====================================================
       12 — DYNAMIC YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       13 — ESCAPE KEY
       Close mobile menu
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            if (!navLinks || !menuBtn) {
                return;
            }

            navLinks.classList.remove(
                "mobile-active"
            );

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.innerHTML = "☰";
        }
    );


    /* =====================================================
       14 — PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    console.log(
        "VR Portfolio • Loaded successfully 🚀"
    );

});