/**
 * app.js — comportamento base do esqueleto (fase M0)
 * Responsabilidades: menu mobile e ano do rodapé.
 * Sem dependências, sem globals.
 */

const header = document.querySelector(".site-header");
const toggle = document.querySelector("[data-nav-toggle]");
const panel = document.querySelector("[data-nav-panel]");

function closeNav({ restoreFocus = false } = {}) {
  if (!toggle || !panel) return;
  toggle.setAttribute("aria-expanded", "false");
  panel.dataset.open = "false";
  toggle.setAttribute("aria-label", toggle.dataset.labelOpen ?? "Abrir menu");
  if (restoreFocus) toggle.focus();
}

function openNav() {
  if (!toggle || !panel) return;
  toggle.setAttribute("aria-expanded", "true");
  panel.dataset.open = "true";
  toggle.setAttribute("aria-label", toggle.dataset.labelClose ?? "Fechar menu");
}

if (toggle && panel) {
  panel.dataset.open = "false";

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeNav({ restoreFocus: true });
    else openNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav({ restoreFocus: true });
  });

  document.addEventListener("click", (event) => {
    if (toggle.getAttribute("aria-expanded") !== "true") return;
    if (!header?.contains(event.target)) closeNav();
  });

  panel.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 768px)").matches) closeNav();
  });
}

const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* Scrollspy: marca a seção visível no menu (apenas na home) */
const navLinks = Array.prototype.slice.call(
  document.querySelectorAll('.site-nav a[href^="#"]')
);

if (navLinks.length && "IntersectionObserver" in window) {
  const bySection = new Map();

  navLinks.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);
    if (section) bySection.set(section, link);
  });

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.removeAttribute("aria-current"));
        const active = bySection.get(entry.target);
        if (active) active.setAttribute("aria-current", "location");
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  bySection.forEach((link, section) => spy.observe(section));
}
