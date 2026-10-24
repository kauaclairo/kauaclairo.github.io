/**
 * reveal.js — animação suave de entrada por scroll.
 * Só anima o que está fora da viewport no carregamento; nada acima da dobra.
 * Sem IntersectionObserver ou com prefers-reduced-motion, não faz nada.
 */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  function register(scope) {
    var root = scope || document;
    var nodes = root.querySelectorAll("[data-reveal]");

    Array.prototype.forEach.call(nodes, function (node) {
      if (node.classList.contains("reveal")) return;

      var rect = node.getBoundingClientRect();
      /* Já visível no primeiro paint: mantém estático, sem esconder e reexibir. */
      if (rect.top < window.innerHeight * 0.92) return;

      var order = Number(node.getAttribute("data-reveal")) || 0;
      node.style.setProperty("--reveal-delay", order * 70 + "ms");
      node.classList.add("reveal");
      observer.observe(node);
    });
  }

  register();

  document.addEventListener("kp:projects", function (event) {
    register(event.detail && event.detail.target);
  });
})();
