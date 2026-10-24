/**
 * project.js — preenche a página de projeto a partir de ?slug=
 * Fonte: data/projects.json. Sem innerHTML: parágrafos entram por textContent.
 * Slug ausente ou inexistente -> 404.
 */
(function () {
  var article = document.querySelector("[data-project]");
  if (!article) return;

  var lang = (window.KP && window.KP.lang) || "pt";
  var t = (window.KP && window.KP.t) || function (key) { return key; };
  var source = article.getAttribute("data-project-src") || "data/projects.json";
  var notFound = article.getAttribute("data-404") || "404.html";
  var otherPage = article.getAttribute("data-other-page");
  var otherLang = lang === "en" ? "pt-BR" : "en";

  var params = new URLSearchParams(window.location.search);
  var slug = params.get("slug");

  var nodes = {
    title: article.querySelector("[data-project-title]"),
    summary: article.querySelector("[data-project-summary]"),
    role: article.querySelector("[data-project-role]"),
    period: article.querySelector("[data-project-period]"),
    stack: article.querySelector("[data-project-stack]"),
    cover: article.querySelector("[data-project-cover]"),
    draft: article.querySelector("[data-project-draft]"),
    links: article.querySelector("[data-project-links]"),
    nextNav: document.querySelector("[data-project-nav]"),
    nextLink: document.querySelector("[data-project-next]")
  };

  function goNotFound() {
    window.location.replace(notFound);
  }

  function setMeta(name, content) {
    var tag = document.querySelector('meta[name="' + name + '"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  }

  function absolute(url) {
    return new URL(url, window.location.href).href;
  }

  function paragraphs(container, texts) {
    container.replaceChildren();
    (texts || []).forEach(function (text) {
      var p = document.createElement("p");
      p.textContent = text;
      container.appendChild(p);
    });
  }

  function setCase(section, texts) {
    var wrapper = article.querySelector('[data-case="' + section + '"]');
    if (!wrapper) return;
    var body = wrapper.querySelector("[data-case-body]");
    if (!texts || !texts.length) {
      wrapper.hidden = true;
      return;
    }
    wrapper.hidden = false;
    paragraphs(body, texts);
  }

  function renderCover(project) {
    var cover = nodes.cover;
    if (!cover) return;
    cover.replaceChildren();

    if (project.image && project.image.src) {
      var img = document.createElement("img");
      img.src = project.image.src;
      img.alt = project.image.alt ? project.image.alt[lang] || "" : "";
      img.width = 1280;
      img.height = 720;
      img.decoding = "async";
      cover.appendChild(img);
      cover.hidden = false;
    } else {
      cover.hidden = true;
    }
  }

  function renderLinks(project) {
    var links = project.links || {};
    var entries = [
      ["repo", links.repo, t("repo")],
      ["demo", links.demo, t("demo")]
    ].filter(function (entry) {
      return Boolean(entry[1]);
    });

    nodes.links.replaceChildren();
    if (!entries.length) {
      nodes.links.hidden = true;
      return;
    }

    entries.forEach(function (entry) {
      var link = document.createElement("a");
      link.className = "btn btn--primary";
      link.href = entry[1];
      link.textContent = entry[2];
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      nodes.links.appendChild(link);
    });
    nodes.links.hidden = false;
  }

  function renderNext(project, projects) {
    if (!nodes.nextNav || !nodes.nextLink) return;
    var index = projects.indexOf(project);
    var next = projects[(index + 1) % projects.length];

    if (!next || next === project) {
      nodes.nextNav.hidden = true;
      return;
    }

    nodes.nextLink.href = otherPage + "?slug=" + encodeURIComponent(next.slug);
    nodes.nextLink.textContent = next.title[lang];
    nodes.nextNav.hidden = false;
  }

  function syncAlternates(project) {
    var canonical = absolute(window.location.pathname + "?slug=" + encodeURIComponent(project.slug));
    var canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) canonicalTag.setAttribute("href", canonical);

    var ptUrl = absolute((lang === "en" ? "../projeto.html" : "projeto.html") + "?slug=" + encodeURIComponent(project.slug));
    var enUrl = absolute((lang === "en" ? "project.html" : "en/project.html") + "?slug=" + encodeURIComponent(project.slug));

    document.querySelectorAll('link[rel="alternate"]').forEach(function (tag) {
      var code = tag.getAttribute("hreflang");
      if (code === "pt-BR") tag.setAttribute("href", ptUrl);
      if (code === "en") tag.setAttribute("href", enUrl);
      if (code === "x-default") tag.setAttribute("href", ptUrl);
    });

    var langLink = document.querySelector('.lang-switch a[lang="' + otherLang + '"]');
    if (langLink) {
      langLink.href = (lang === "en" ? "../projeto.html" : "en/project.html") + "?slug=" + encodeURIComponent(project.slug);
    }
  }

  function render(project, projects) {
    var text = project.case ? project.case : {};

    document.title = project.title[lang] + " — Kauã Paz";
    setMeta("description", project.summary[lang]);

    nodes.title.textContent = project.title[lang];
    nodes.summary.textContent = project.summary[lang];
    nodes.role.textContent = project.role[lang];
    nodes.period.textContent = project.period[lang];
    nodes.stack.textContent = (project.stack || []).join(" · ");

    if (project.placeholder) {
      nodes.draft.hidden = false;
      setMeta("robots", "noindex");
    }

    renderCover(project);
    ["challenge", "approach", "result", "next"].forEach(function (section) {
      var value = text[section];
      setCase(section, value ? value[lang] : null);
    });
    renderLinks(project);
    renderNext(project, projects);
    syncAlternates(project);

    article.removeAttribute("aria-busy");
    article.classList.add("is-ready");
  }

  function showError() {
    nodes.title.textContent = t("projectError");
    nodes.summary.replaceChildren();
    article.removeAttribute("aria-busy");
    article.classList.add("is-error");
  }

  if (!slug) {
    goNotFound();
    return;
  }

  nodes.title.textContent = t("loading");

  fetch(source, { headers: { Accept: "application/json" } })
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(function (data) {
      var projects = ((data && data.projects) || []).filter(function (project) {
        return project && project.slug && project.title && project.summary;
      });
      var project = projects.filter(function (item) {
        return item.slug === slug;
      })[0];

      if (!project) {
        goNotFound();
        return;
      }
      render(project, projects);
    })
    .catch(function () {
      showError();
    });
})();
