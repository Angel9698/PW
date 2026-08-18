/* ========================================
   LIGHTBOX
======================================== */

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

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

zoomableImages.forEach(image => {

    image.addEventListener("click", () => {
        openLightbox(image);
    });

    image.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
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
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
    }
});


/* ========================================
   BACK TO TOP
======================================== */

const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {
    if (window.scrollY > 1200) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

window.addEventListener("scroll", toggleBackToTop);

backToTop.addEventListener("click", () => {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth"
    });

});

toggleBackToTop();