/**
 * analytics.js — GoatCounter opcional.
 * Só injeta o script quando há um código real em <meta name="goatcounter">.
 * Com o placeholder SEUCODIGO, nada é carregado e nenhum erro aparece no console.
 */
(function () {
  var meta = document.querySelector('meta[name="goatcounter"]');
  var code = meta && meta.getAttribute("content");

  if (!code || code === "SEUCODIGO") return;

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://gc.zgo.at/count.js";
  script.setAttribute(
    "data-goatcounter",
    "https://" + code + ".goatcounter.com/count"
  );
  document.head.appendChild(script);

  function count(path, title) {
    if (window.goatcounter && typeof window.goatcounter.count === "function") {
      window.goatcounter.count({ path: path, title: title, event: true });
    }
  }

  document.addEventListener("click", function (event) {
    var target = event.target.closest ? event.target.closest("a, button") : null;
    if (!target) return;

    var href = target.getAttribute("href") || "";
    var project = href.match(/(?:projeto|project)\.html\?slug=([^&]+)/);

    if (project) {
      count("project-open:" + decodeURIComponent(project[1]), "Project open");
      return;
    }

    if (href.indexOf("mailto:") === 0) {
      count("contact-click:email", "Contact click");
      return;
    }

    if (target.closest(".lang-switch")) {
      count("lang-switch:" + (target.getAttribute("lang") || "unknown"), "Language switch");
      return;
    }

    if (target.hasAttribute("data-theme-toggle")) {
      count("theme-toggle", "Theme toggle");
    }
  });
})();
