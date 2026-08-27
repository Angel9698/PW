document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       LIGHTBOX
    ======================================== */

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeButton = document.querySelector(".lightbox-close");
    const zoomButtons = document.querySelectorAll(".zoom-trigger");

    let previouslyFocusedElement = null;


    const openLightbox = (button) => {

        if (!lightbox || !lightboxImage || !closeButton) {
            return;
        }

        const image = button.querySelector("img");

        if (!image) {
            return;
        }

        previouslyFocusedElement = document.activeElement;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.hidden = false;
        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("lightbox-open");

        closeButton.focus();
    };


    const closeLightbox = () => {

        if (!lightbox || !lightboxImage) {
            return;
        }

        lightbox.hidden = true;
        lightbox.setAttribute("aria-hidden", "true");

        lightboxImage.src = "";
        lightboxImage.alt = "";

        document.body.classList.remove("lightbox-open");

        if (
            previouslyFocusedElement &&
            typeof previouslyFocusedElement.focus === "function"
        ) {
            previouslyFocusedElement.focus();
        }
    };


    zoomButtons.forEach((button) => {

        button.addEventListener("click", () => {
            openLightbox(button);
        });

    });


    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }


    if (lightbox) {

        lightbox.addEventListener("click", (event) => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }


    document.addEventListener("keydown", (event) => {

        if (!lightbox || lightbox.hidden) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

    });


    /* ========================================
       BACK TO TOP
    ======================================== */

    const backToTopButton = document.getElementById("backToTop");
    const problemSection = document.querySelector(".theater-problem");


    const updateBackToTopVisibility = () => {

        if (!backToTopButton || !problemSection) {
            return;
        }

        const triggerPosition =
            problemSection.getBoundingClientRect().top;

        backToTopButton.classList.toggle(
            "show",
            triggerPosition <= 0
        );
    };


    window.addEventListener(
        "scroll",
        updateBackToTopVisibility,
        { passive: true }
    );


    if (backToTopButton) {

        backToTopButton.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    updateBackToTopVisibility();

});