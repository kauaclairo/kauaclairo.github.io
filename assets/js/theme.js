/**
 * theme.js — alternância entre tema claro e escuro.
 * O tema inicial já foi aplicado no <head> (script inline) para evitar flash;
 * aqui só sincronizamos rótulos e persistimos a escolha.
 */
(function () {
  var root = document.documentElement;
  var button = document.querySelector("[data-theme-toggle]");
  if (!button) return;

  var t = (window.KP && window.KP.t) || function (key) { return key; };
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function current() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function hasStoredPreference() {
    try {
      return Boolean(localStorage.getItem("theme"));
    } catch (error) {
      return false;
    }
  }

  function apply(theme, persist) {
    root.setAttribute("data-theme", theme);
    var isDark = theme === "dark";
    var label = isDark ? t("themeToLight") : t("themeToDark");

    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);

    var srLabel = button.querySelector("[data-theme-label]");
    if (srLabel) srLabel.textContent = label;

    if (persist) {
      try {
        localStorage.setItem("theme", theme);
      } catch (error) {
        /* modo privado: segue sem persistir */
      }
    }
  }

  apply(current(), false);

  button.addEventListener("click", function () {
    apply(current() === "dark" ? "light" : "dark", true);
  });

  // Sem preferência salva, acompanha a mudança do sistema.
  media.addEventListener("change", function (event) {
    if (!hasStoredPreference()) apply(event.matches ? "dark" : "light", false);
  });
})();
