# kauaclairo.github.io

Portfólio pessoal de **Kauã Paz** — dados e inteligência artificial.
Site estático, sem build, publicado no GitHub Pages.

## Rodar localmente

Os projetos são carregados por `fetch`, então é preciso servir por HTTP:

```bash
python -m http.server 8000
```

Abra <http://localhost:8000>. Abrir `index.html` direto do disco não carrega o JSON.

## Estrutura

```
index.html              Home PT
projeto.html            Template de estudo de caso PT (?slug=)
en/index.html           Home EN
en/project.html         Template de estudo de caso EN
404.html                Página de erro bilíngue
assets/css/styles.css   Tokens, base, componentes (claro + escuro)
assets/js/              i18n, tema, projetos, animação, analytics, menu
data/projects.json      Fonte única de conteúdo, PT e EN juntos
```

## Adicionar ou editar um projeto

1. Edite `data/projects.json` e preencha `title`, `summary`, `role`, `period`, `stack`, `case`
   nos dois idiomas.
2. Coloque a imagem em `assets/img/projects/` (16:9, WebP, até 200 KB) e aponte `image.src`.
3. Troque `placeholder` para `false` — o `noindex` automático desaparece.

Nada mais precisa ser duplicado: home e página de projeto leem o mesmo registro.

## Publicar

O deploy é nativo do GitHub Pages: repositório `kauaclairo.github.io`, branch `main`, raiz.
O arquivo `.nojekyll` desativa o processamento do Jekyll.

```bash
git add .
git commit -m "feat: publica o portfólio"
git push -u origin main
```

Depois: **Settings → Pages → Source: Deploy from a branch → main / (root)**.

## Pendências antes de divulgar

- [ ] Bio real em PT e EN.
- [ ] E-mail profissional (hoje `contato@exemplo.com`) e LinkedIn.
- [ ] Trocar os 4 projetos de exemplo por casos reais.
- [ ] Criar conta no GoatCounter e colocar o código em `<meta name="goatcounter">`.
- [ ] Revisar os textos em inglês.

## Documentação

- `SPECS.md` — especificação do produto, design system e fases.
- `AGENTS.md` — regras de trabalho e critérios de qualidade.
