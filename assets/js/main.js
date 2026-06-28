/* fablessBio — interactions
   Kept intentionally small. Everything degrades gracefully without JS. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Theme toggle (light default, dark opt-in, persisted) ---- */
  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    var setLabel = function () {
      var isDark = document.documentElement.getAttribute("data-theme") === "dark";
      themeBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
      themeBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    };
    setLabel();
    themeBtn.addEventListener("click", function () {
      var isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
      }
      try { localStorage.setItem("fb-theme", isDark ? "light" : "dark"); } catch (e) {}
      setLabel();
    });
  }

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

  /* ---- Genome stream (signature, multi-line) ---- */
  var BASES = "ACGT";
  var randBase = function () { return BASES[(Math.random() * 4) | 0]; };
  var panels = document.querySelectorAll(".genome-body");

  panels.forEach(function (panel) {
    var rowCount = parseInt(panel.getAttribute("data-rows"), 10) || 8;
    var cols = parseInt(panel.getAttribute("data-cols"), 10) || 64;
    var rows = [];

    for (var r = 0; r < rowCount; r++) {
      var cells = [];
      for (var c = 0; c < cols; c++) cells.push({ ch: randBase(), hi: false });
      var rowEl = document.createElement("div");
      rowEl.className = "genome-row";
      var posEl = document.createElement("span");
      posEl.className = "pos";
      var strandEl = document.createElement("span");
      strandEl.className = "strand";
      rowEl.appendChild(posEl);
      rowEl.appendChild(strandEl);
      panel.appendChild(rowEl);
      rows.push({
        cells: cells, hiLeft: 0,
        pos: 1 + ((Math.random() * 90000) | 0),
        strandEl: strandEl, posEl: posEl
      });
    }

    var fmt = function (n) { return n.toLocaleString("en-US"); };

    var renderRow = function (row) {
      var cells = row.cells, n = cells.length, out = "", buf = "", cls = null;
      var flush = function () {
        if (buf) { out += cls ? '<span class="' + cls + '">' + buf + "</span>" : buf; buf = ""; }
      };
      for (var i = 0; i < n; i++) {
        var thisCls = (i === n - 1) ? "head" : (cells[i].hi ? "hi" : null);
        if (thisCls !== cls) { flush(); cls = thisCls; }
        buf += cells[i].ch;
        if (i % 3 === 2 && i !== n - 1) buf += " ";
      }
      flush();
      row.strandEl.innerHTML = out;
      row.posEl.textContent = fmt(row.pos);
    };

    rows.forEach(renderRow);
    if (reduced) return;

    var tick = function () {
      for (var k = 0; k < rows.length; k++) {
        var row = rows[k];
        if (Math.random() < 0.12) continue; // desync rows slightly
        row.cells.shift();
        var hi = false;
        if (row.hiLeft > 0) { hi = true; row.hiLeft--; }
        else if (Math.random() < 0.02) { row.hiLeft = 2; hi = true; } // start a called codon
        row.cells.push({ ch: randBase(), hi: hi });
        row.pos++;
        renderRow(row);
      }
    };
    setInterval(tick, 82);
  });

  /* ---- Current year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
