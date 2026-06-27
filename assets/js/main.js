/* fablessBio — interactions
   Kept intentionally small. Everything degrades gracefully without JS. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Scroll reveal ---- */
  var revealables = document.querySelectorAll(".reveal, .stagger");
  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---- Sequence readout (signature) ---- */
  var seq = document.querySelector(".seq .bases");
  if (seq) {
    var alphabet = "ACGT";
    var run = function (len) {
      var s = "";
      for (var i = 0; i < len; i++) {
        if (i > 0 && i % 3 === 0) s += " ";
        s += alphabet[(Math.random() * 4) | 0];
      }
      return s;
    };
    var render = function () {
      // Static, readable strand with a couple of highlighted codons.
      var pre = run(18), hi = run(3), post = run(18);
      seq.innerHTML =
        '<b>' + pre + '</b> <span class="hi">' + hi + '</span> <b>' + post +
        '</b><span class="caret">_</span>';
    };
    render();
    if (!reduced) {
      setInterval(render, 2600);
    }
  }

  /* ---- Current year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
