/**
 * projects.js — renderiza os cards da home a partir de data/projects.json.
 * Fonte única de conteúdo: um registro por projeto, com PT e EN juntos.
 * Sem innerHTML: todo texto entra por textContent.
 */
(function () {
  var grid = document.querySelector("[data-projects]");
  if (!grid) return;

  var lang = (window.KP && window.KP.lang) || "pt";
  var t = (window.KP && window.KP.t) || function (key) { return key; };
  var source = grid.getAttribute("data-projects-src") || "data/projects.json";
  var detailPage = grid.getAttribute("data-detail-page") || "projeto.html";

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function media(project) {
    var wrapper = el("div", "project-card__media");

    if (project.image && project.image.src) {
      var img = document.createElement("img");
      img.src = project.image.src;
      img.alt = project.image.alt ? project.image.alt[lang] || "" : "";
      img.width = 1280;
      img.height = 720;
      img.loading = "lazy";
      img.decoding = "async";
      wrapper.appendChild(img);
    } else {
      /* Sem imagem cadastrada: textura neutra em vez de imagem falsa. */
      wrapper.setAttribute("aria-hidden", "true");
      wrapper.appendChild(el("div", "media-placeholder"));
    }

    return wrapper;
  }

  function card(project, index) {
    var item = el("li", "project-grid__item" + (project.featured ? " project-grid__item--featured" : ""));
    var article = el("article", "project-card" + (project.featured ? " project-card--featured" : ""));
    item.setAttribute("data-reveal", String(index % 2 === 0 ? 0 : 1));
    if (project.placeholder) article.setAttribute("data-placeholder", "true");

    var title = el("h3", "project-card__title");
    var link = el("a", null, project.title[lang]);
    link.href = detailPage + "?slug=" + encodeURIComponent(project.slug);
    title.appendChild(link);

    var body = el("div", "project-card__body");
    body.appendChild(title);
    body.appendChild(el("p", "project-card__summary", project.summary[lang]));

    var tags = el("div", "project-card__tags");
    (project.stack || []).forEach(function (tech) {
      tags.appendChild(el("span", "tag", tech));
    });
    if (project.placeholder) {
      tags.appendChild(el("span", "badge-draft", t("draft")));
    }
    body.appendChild(tags);
    body.appendChild(el("span", "project-card__cta", t("caseStudy") + " →"));

    article.appendChild(media(project));
    article.appendChild(body);
    item.appendChild(article);
    return item;
  }

  function showError() {
    var note = el("p", "projects-note", t("projectsError"));
    var link = el("a", null, "github.com/kauaclairo");
    link.href = "https://github.com/kauaclairo";
    link.rel = "noopener noreferrer";
    note.appendChild(document.createTextNode(" "));
    note.appendChild(link);
    grid.replaceChildren();
    grid.appendChild(note);
  }

  grid.setAttribute("aria-busy", "true");

  fetch(source, { headers: { Accept: "application/json" } })
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(function (data) {
      var projects = (data && data.projects) || [];
      var valid = projects.filter(function (project) {
        return project && project.slug && project.title && project.summary;
      });
      grid.replaceChildren.apply(grid, valid.map(card));
      if (!valid.length) showError();
      document.dispatchEvent(
        new CustomEvent("kp:projects", { detail: { target: grid } })
      );
    })
    .catch(showError)
    .finally(function () {
      grid.removeAttribute("aria-busy");
    });
})();
