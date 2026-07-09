/* Just Stretch It — small interactions. No framework, no build step. */
(function () {
  "use strict";

  /* ---------------------------------------------------- Mobile nav toggle */
  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("navToggle");
  if (header && toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // Close the drawer after tapping a link inside it.
    header.querySelectorAll(".mobile-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* --------------------------------------------- Contact form (FormSubmit) */
  var form = document.getElementById("contactForm");
  if (form) {
    var btn = document.getElementById("formSubmit");
    var label = document.getElementById("submitLabel");
    var errorEl = document.getElementById("formError");
    var successEl = document.getElementById("formSuccess");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (errorEl) errorEl.hidden = true;
      if (btn) btn.disabled = true;
      if (label) label.textContent = "Sending…";

      var payload = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,
        _subject: "Website inquiry from " + (form.name.value || "a visitor"),
        _template: "table",
      };

      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          if (!r.ok) throw new Error("bad status");
          return r.json();
        })
        .then(function () {
          form.hidden = true;
          if (successEl) successEl.hidden = false;
        })
        .catch(function () {
          if (btn) btn.disabled = false;
          if (label) label.textContent = "Send message";
          if (errorEl) errorEl.hidden = false;
        });
    });
  }
})();
