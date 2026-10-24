/**
 * i18n.js — textos usados por JavaScript.
 * O texto editorial de cada página continua no próprio HTML (uma página por idioma).
 * Este dicionário cobre apenas rótulos que o script precisa trocar em tempo real.
 *
 * Única variável global permitida no projeto: window.KP.
 */
(function (global) {
  var strings = {
    pt: {
      caseStudy: "Ver estudo de caso",
      draft: "exemplo",
      projectsError:
        "Não foi possível carregar os projetos agora. Veja os repositórios em github.com/kauaclairo.",
      themeToDark: "Ativar tema escuro",
      themeToLight: "Ativar tema claro",
      loading: "Carregando projeto…",
      projectError: "Não foi possível carregar este projeto.",
      notFound: "Projeto não encontrado.",
      repo: "Ver repositório",
      demo: "Ver demonstração",
      nextProject: "Próximo projeto",
      allProjects: "Todos os projetos"
    },
    en: {
      caseStudy: "View case study",
      draft: "sample",
      projectsError:
        "Projects could not be loaded right now. See the repositories at github.com/kauaclairo.",
      themeToDark: "Switch to dark theme",
      themeToLight: "Switch to light theme",
      loading: "Loading project…",
      projectError: "This project could not be loaded.",
      notFound: "Project not found.",
      repo: "View repository",
      demo: "View demo",
      nextProject: "Next project",
      allProjects: "All projects"
    }
  };

  var lang = document.documentElement.lang.toLowerCase().indexOf("en") === 0 ? "en" : "pt";

  global.KP = global.KP || {};
  global.KP.lang = lang;
  global.KP.t = function (key) {
    return strings[lang][key] || strings.pt[key] || key;
  };
})(window);
