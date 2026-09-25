/* =========================================
   KELTEC SOLUTIONS
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTop = document.getElementById("backToTop");
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const yearElement = document.getElementById("year");


    /* =========================================
       CURRENT YEAR
    ========================================= */

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =========================================
       MOBILE MENU
    ========================================= */

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("active");

            document.body.classList.toggle("menu-open");

            const icon = menuToggle.querySelector("i");

            if (navbar.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }


    /* =========================================
       CLOSE MOBILE MENU
    ========================================= */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            document.body.classList.remove("menu-open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });


    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    function handleHeader() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections = document.querySelectorAll("section[id]");

    function updateActiveNavigation() {

        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${sectionId}`) {

                        link.classList.add("active");

                    }

                });

            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =========================================
       BACK TO TOP
    ========================================= */

    function handleBackToTop() {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener("scroll", handleBackToTop);

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       CONTACT FORM
    ========================================= */

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const service = document.getElementById("service").value;
            const message = document.getElementById("message").value.trim();


            /* Basic validation */

            if (!name || !phone || !email || !service || !message) {

                formMessage.textContent =
                    "Please fill in all the required fields.";

                formMessage.className =
                    "form-message error";

                return;

            }


            /* Email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                formMessage.className =
                    "form-message error";

                return;

            }


            /*
                FRONTEND DEMO

                The form currently does not send data
                to a server. We will connect it to a
                backend later.
            */

            formMessage.textContent =
                `Thank you, ${name}. Your enquiry has been prepared successfully.`;

            formMessage.className =
                "form-message success";


            contactForm.reset();

        });

    }


    /* =========================================
       SMOOTH ANCHOR LINKS
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId =
                anchor.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       SERVICE CARD HOVER EFFECT
    ========================================= */

    const serviceCards =
        document.querySelectorAll(".service-card");

    serviceCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.setProperty(
                "--hover-y",
                "-8px"
            );

        });

        card.addEventListener("mouseleave", () => {

            card.style.setProperty(
                "--hover-y",
                "0px"
            );

        });

    });


    /* =========================================
       ESCAPE KEY CLOSES MOBILE MENU
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            navbar.classList.remove("active");

            document.body.classList.remove("menu-open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});