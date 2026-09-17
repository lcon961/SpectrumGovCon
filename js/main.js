document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("open"));
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

  document.querySelector(".footer-year").textContent = new Date().getFullYear();
});
