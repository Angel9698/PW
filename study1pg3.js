document.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeButton = document.querySelector(".lightbox-close");
    const zoomableImages = document.querySelectorAll(".zoomable");

    let lastFocusedElement = null;


    function openLightbox(image) {

        lastFocusedElement = document.activeElement;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeButton.focus();
    }


    function closeLightbox() {

        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        lightboxImage.src = "";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }


    zoomableImages.forEach(image => {

        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");
        image.setAttribute(
            "aria-label",
            `${image.alt}. Open full-size image`
        );

        image.addEventListener("click", () => {
            openLightbox(image);
        });

        image.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                openLightbox(image);
            }

        });

    });


    closeButton.addEventListener("click", closeLightbox);


    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("open")
        ) {
            closeLightbox();
        }

    });

});