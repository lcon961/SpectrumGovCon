document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".nav-overlay");
  const openBtn = document.querySelector(".nav-toggle");
  const closeBtn = document.querySelector(".nav-close");

  const openNav = () => {
    overlay.classList.add("open");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const closeNav = () => {
    overlay.classList.remove("open");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  if (openBtn && overlay) {
    openBtn.addEventListener("click", openNav);
    closeBtn?.addEventListener("click", closeNav);
    overlay.querySelectorAll(".nav-overlay-links a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      if (status) {
        status.textContent =
          "Thanks — this is a demo form with no backend connected yet. Wire it up to Formspree, Netlify Forms, or your CRM to start receiving submissions.";
        status.style.display = "block";
      }
      form.reset();
    });
  }

  const yearEl = document.querySelector(".footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
