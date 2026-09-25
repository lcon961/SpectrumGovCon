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
    // Specialty pages link here as /contact?interest=<slug>; preselect that option.
    const interest = new URLSearchParams(window.location.search).get("interest");
    const select = form.querySelector("#interest");
    if (interest && select && select.querySelector(`option[value="${CSS.escape(interest)}"]`)) {
      select.value = interest;
    }

    // Submissions go to Gravity Forms form #47 on spectrumcareers.com via its REST API.
    // The submissions endpoint needs no API key, so nothing secret lives here.
    const GF_ENDPOINT = "https://www.spectrumcareers.com/wp-json/gf/v2/forms/47/submissions";
    const GF_FIELD_LABELS = { 1: "First name", 2: "Last name", 3: "Email", 5: "Company", 6: "Phone", 8: "Message" };
    const SUCCESS_MSG = "Thanks! Your message is on its way. A member of our GovCon team will reply within one business day.";
    const FAILURE_MSG = "Sorry, something went wrong sending your message. Please email info@spectrumgovcon.com or call (703) 738-1201.";

    const status = form.querySelector(".form-status");
    const button = form.querySelector('button[type="submit"]');
    const buttonHtml = button.innerHTML;

    const showStatus = (text, kind) => {
      status.textContent = text;
      status.className = `form-status ${kind}`;
      status.hidden = false;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const val = (name) => (form.elements[name]?.value || "").trim();

      // Bots fill the hidden field; pretend it worked and send nothing.
      if (val("website")) {
        showStatus(SUCCESS_MSG, "success");
        form.reset();
        return;
      }

      // Form #47 has no "interest" field, so fold it into the message.
      const interestLabel = select ? select.options[select.selectedIndex].text : "";
      const message = [
        interestLabel && `How can we assist: ${interestLabel}`,
        val("message"),
        "Submitted via spectrumgovcon.com/contact",
      ].filter(Boolean).join("\n\n");

      const payload = {
        input_1: val("first_name"),
        input_2: val("last_name"),
        input_3: val("email"),
        input_5: val("company"),
        input_6: val("phone"),
        input_8: message,
      };

      button.disabled = true;
      button.textContent = "Sending…";
      status.hidden = true;

      try {
        const res = await fetch(GF_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.is_valid) {
          showStatus(SUCCESS_MSG, "success");
          form.reset();
        } else if (data.validation_messages) {
          const problems = Object.entries(data.validation_messages)
            .map(([id, msg]) => `${GF_FIELD_LABELS[id] || "A field"}: ${msg}`)
            .join(" ");
          showStatus(`Please check the form. ${problems}`, "error");
        } else {
          showStatus(FAILURE_MSG, "error");
        }
      } catch {
        showStatus(FAILURE_MSG, "error");
      } finally {
        button.disabled = false;
        button.innerHTML = buttonHtml;
      }
    });
  }

  const yearEl = document.querySelector(".footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
