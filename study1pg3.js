document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");
  const zoomButtons = document.querySelectorAll(".zoom-trigger");

  if (!lightbox || !lightboxImage || !closeButton) {
    return;
  }

  let previouslyFocusedElement = null;

  function openLightbox(button) {
    const image = button.querySelector("img");

    if (!image) {
      return;
    }

    previouslyFocusedElement = document.activeElement;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");

    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;

    lightboxImage.src = "";
    lightboxImage.alt = "";

    document.body.classList.remove("lightbox-open");

    if (
      previouslyFocusedElement &&
      typeof previouslyFocusedElement.focus === "function"
    ) {
      previouslyFocusedElement.focus();
    }
  }

  zoomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openLightbox(button);
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key === "Tab") {
      trapFocus(event);
    }
  });

  function trapFocus(event) {
    const focusableElements = lightbox.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements.length) {
      event.preventDefault();
      closeButton.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  }
  const backToTopButton = document.getElementById("backToTop");

if (backToTopButton) {
    const updateBackToTopVisibility = () => {
        if (window.scrollY > 1200) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    };

    window.addEventListener("scroll", updateBackToTopVisibility);

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Check position when the page first loads
    updateBackToTopVisibility();
}
});