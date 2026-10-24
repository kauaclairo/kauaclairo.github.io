# SPECS.md — Portfólio pessoal de Kauã Paz

**Status:** planejamento aprovado para v1 (nada implementado)
**Última atualização:** 2026-10-23
**Responsável:** Kauã Paz (@kauaclairo)

Site pessoal de portfólio, com foco em **dados e IA**, publicado no GitHub Pages.
Objetivo único: fazer um recrutador ou líder técnico entender em menos de 1 minuto
quem é Kauã, o que ele sabe fazer e onde ver as evidências.

---

## 1. Decisões fechadas

| Tema | Decisão |
| --- | --- |
| Posicionamento | Dados / IA |
| Assinatura | **Kauã Paz** |
| Stack | HTML + CSS + JS puro, zero build, zero dependências |
| Estrutura | Híbrida: home com seções + página individual por projeto |
| Estética | Corporativo sóbrio (azul-marinho + neutros) |
| Fonte de conteúdo | Arquivo JSON local com campos PT e EN |
| Idiomas | PT-BR principal (raiz) + EN secundário (`/en/`) |
| URL | `https://kauaclairo.github.io` (repo `kauaclairo.github.io`, branch `main`, raiz) |
| Escopo extra v1 | Analytics leve (GoatCounter) + animações de scroll |
| Tema | Claro e escuro, com alternância no header, persistência local e padrão vindo do sistema |
| Conteúdo inicial | 4 projetos placeholder realistas, marcados como provisórios |

## 2. Objetivos e não objetivos

**Objetivos**
1. Comunicar identidade e foco em dados/IA em uma dobra.
2. Provar competência com 4 estudos de caso curtos e verificáveis.
3. Ser rápido, acessível e legível em qualquer dispositivo.
4. Ser trivial de atualizar: adicionar um projeto = editar 2 arquivos.

**Não objetivos (v1)**
- Blog, notas técnicas ou CMS.
- Formulário de contato com back-end, comentários, busca, área logada.
- Domínio próprio, download de CV, versão em outro idioma além de PT/EN.
- Efeitos visuais pesados, vídeo de fundo, WebGL.

**Métrica de sucesso:** visitante consegue abrir um projeto e voltar à home sem se perder;
Lighthouse mobile ≥ 95 em Performance, Acessibilidade, Boas Práticas e SEO.

## 3. Público

| Persona | O que procura | O que o site precisa entregar |
| --- | --- | --- |
| Recrutador técnico (30–60s) | Área, senioridade, stack, contato | Headline clara, tags de stack, e-mail visível |
| Líder técnico / colega | Como o problema foi resolvido, trade-offs | Estudo de caso com problema → solução → resultado |
| Cliente / freelancer | Confiança e prova | Projetos com resultado e link de demo/repo |

## 4. Arquitetura de informação

```
Home (PT, /)
├── Header fixo — assinatura, nav (Projetos, Sobre, Contato), seletor PT/EN
├── Hero — nome, posicionamento, 1 frase de prova, 2 CTAs
├── Projetos — grid de 4 cards + link para detalhe
├── Sobre — bio, foco atual, stack, formação/trajetória
├── Contato — e-mail + GitHub + LinkedIn
└── Footer — ano, assinatura, link para o EN

Página de projeto (PT, /projeto.html?slug=…)
├── Breadcrumb / voltar
├── Cabeçalho: título, resumo, período, papel, stack
├── Imagem de capa
├── Desafio → Abordagem → Resultado
├── Links: repositório, demo
└── Próximo projeto

/ (inglês, /en/ e /en/project.html?slug=…) espelha a mesma estrutura.
```

Detalhe: cada página de projeto é servida por **um único template** (`projeto.html` / `en/project.html`)
que lê `?slug=` do JSON e preenche a página. Slug inválido ou ausente → redireciona para a home
(ou `404.html` se o `slug` não existir no JSON).

## 5. Jornada principal

1. Chega pelo link do currículo/LinkedIn.
2. Lê o hero: nome + "dados e IA" + uma linha de prova.
3. Rola e vê os 4 projetos; abre o mais relevante.
4. Lê o caso em ~2 minutos; confere o repositório.
5. Volta, lê o Sobre; clica em "Enviar e-mail" ou LinkedIn.

Cada um desses passos deve funcionar com **um clique** e sem rolagem excessiva.

## 6. Requisitos por seção

### 6.1 Header
- Altura 64px no desktop, 56px no mobile; `position: sticky`; fundo sólido com borda inferior de 1px.
- Assinatura à esquerda (link para o topo). Nav à direita, âncoras suaves para as seções.
- Seletor de idioma discreto: `PT | EN`, indicando o ativo com `aria-current="true"`.
- No mobile: nav colapsa em botão de menu (largura total do painel), fechável com `Esc` e clique fora.
- Deve ter contraste AA contra o fundo em qualquer estado.

### 6.2 Hero
- Coluna única, alinhada à esquerda, largura máxima 880px.
- `<h1>`: "Kauã Paz". Linha de apoio: posicionamento em dados e IA (1 frase, ≤ 140 caracteres).
- Um parágrafo curto (≤ 2 linhas) com a prova mais forte disponível.
- Dois CTAs: primário "Ver projetos" (âncora), secundário "Falar comigo" (mailto).
- Nenhuma animação de entrada nesta seção (protege LCP).

### 6.3 Projetos (grid)
- 4 cards em grid de 2 colunas no desktop, 1 no mobile; gap de 24px.
- Card: imagem 16:9, título, resumo de 2 linhas, 3–4 tags de stack, indicador "Ver estudo de caso →".
- Card inteiro clicável, mas com link real no título (navegável por teclado).
- Hover/focus: elevação de 2px e borda de acento; nada de zoom na imagem.
- Se `featured: true`, o primeiro card ocupa 2 colunas no desktop.

### 6.4 Sobre
- Layout assimétrico: texto em 7 colunas, painel de dados em 5 (stack, foco atual, disponibilidade).
- Bio em até 3 parágrafos curtos. Lista de stack agrupada (Linguagens / Dados / Ferramentas).
- Sem foto obrigatória na v1; se houver, 1:1, tratamento neutro.

### 6.5 Contato
- Título curto, uma frase de chamada, e-mail como link `mailto:` em destaque (não ofuscado).
- Links de GitHub e LinkedIn com ícones inline (SVG inline, `aria-hidden` + rótulo textual).
- Sem formulário. `id="contato"` para a âncora do header.

### 6.6 Página de projeto
- Título, resumo (≤ 2 linhas), metadados (período, papel, stack).
- Seções obrigatórias: **Desafio**, **Abordagem**, **Resultado**; opcional "Próximos passos".
- Links de repositório/demo abrem em nova aba com `rel="noopener noreferrer"`; somem quando nulos.
- Navegação "← Todos os projetos" e "Próximo projeto" (cíclica, conforme a ordem do JSON).
- `<title>`, description, canonical e `hreflang` atualizados a partir do JSON ao carregar.
- Slug ausente ou inexistente redireciona para `404.html`.
- Projetos com `placeholder: true` recebem `<meta name="robots" content="noindex">` em tempo de execução;
  ao trocar o conteúdo real, a página passa a ser indexável sem mexer no HTML.
- Fallback `<noscript>`: o artigo fica oculto por CSS e a nota aponta para o GitHub.

## 7. Modelo de conteúdo

Fonte única: `data/projects.json`. Um objeto por projeto, com PT e EN no mesmo registro.
Textos de interface vivem no HTML de cada idioma (indexável), e apenas rótulos trocados por JS
ficam em `assets/js/i18n.js`.

```json
{
  "slug": "previsao-demanda",
  "featured": true,
  "year": 2025,
  "period": { "pt": "mar–jun 2025", "en": "Mar–Jun 2025" },
  "role": { "pt": "Análise e modelagem", "en": "Analysis & modeling" },
  "title": { "pt": "Previsão de demanda", "en": "Demand forecasting" },
  "summary": { "pt": "…", "en": "…" },
  "stack": ["Python", "Pandas", "scikit-learn"],
  "image": { "src": "assets/img/projects/demanda.webp", "alt": { "pt": "…", "en": "…" } },
  "links": { "repo": "https://github.com/…", "demo": null },
  "case": {
    "challenge": { "pt": ["…"], "en": ["…"] },
    "approach": { "pt": ["…"], "en": ["…"] },
    "result": { "pt": ["…"], "en": ["…"] },
    "next": { "pt": ["…"], "en": ["…"] }
  },
  "placeholder": true
}
```

Regras: todo campo textual é objeto `{ pt, en }`; arrays representam parágrafos; `placeholder: true`
renderiza um selo discreto "exemplo" e entra na lista de pendências. Nenhum campo pode ficar vazio —
o carregador valida e falha de forma visível em desenvolvimento (log no console), silenciosa em produção.

## 8. i18n — PT principal, EN secundário

- PT-BR na raiz: `/`, `/projeto.html?slug=…`.
- EN em subpasta: `/en/`, `/en/project.html?slug=…`.
- Documentos EN recebem `<html lang="en">`; trechos de interface em outro idioma usam `lang` local.
- `hreflang` recíproco em todas as páginas: `pt-BR`, `en`, `x-default` → versão PT.
- Troca de idioma mantém o contexto: na home vai para a home do outro idioma; em página de projeto
  preserva o `slug`.
- Preferência de idioma é lembrada em `localStorage`, mas **não** redireciona automaticamente
  (evita quebrar links compartilhados e confundir buscadores). No máximo, um aviso discreto
  no topo quando o navegador está em EN e a página é PT.
- Nomes de arquivos e âncoras são iguais nos dois idiomas; só o texto muda.

## 9. Design system

### 9.1 Cor

| Token | Valor | Uso |
| --- | --- | --- |
| `--ink` | `#0B1B2B` | Texto principal |
| `--ink-muted` | `#55606F` | Texto secundário (contraste 6.3:1) |
| `--navy` → `--heading` | `#0F2A44` | Títulos, marca e texto de botão fantasma |
| `--accent` | `#1F6FB2` | Links, foco, CTA (5.3:1 sobre branco) |
| `--accent-strong` | `#14507F` | Hover do acento |
| `--bg` | `#FFFFFF` | Fundo |
| `--bg-subtle` | `#F7F8FA` | Seções alternadas |
| `--line` | `#E6E9EE` | Bordas e divisores |
| `--focus` | `#1F6FB2` | Anel de foco (2px + offset 2px) |

Tema escuro (`html[data-theme="dark"]`, mesmo nome de token, valores remapeados):

| Token | Valor | Contraste medido |
| --- | --- | --- |
| `--bg` | `#0A141F` | — |
| `--bg-subtle` | `#0F1D2B` | — |
| `--ink` | `#E6EDF5` | 15,7:1 sobre `--bg` |
| `--ink-muted` | `#9FB2C6` | 8,5:1 sobre `--bg` |
| `--heading` | `#F2F6FA` | 17,1:1 sobre `--bg` |
| `--accent` | `#6FB3E8` | 8,2:1 sobre `--bg` |
| `--line` / `--line-strong` | `#1E3247` / `#5C7691` | 3,9:1 (borda de controle) |
| `--btn-bg` / `--btn-fg` | `#DCEBF7` / `#08131F` | 15,4:1 |

Regra: acento em no máximo 3 elementos visíveis por tela. Nada de cor decorativa em texto longo.
Nenhum componente usa cor literal — todos leem tokens semânticos, então o tema escuro é só remapeamento.
O atributo `data-theme` é definido por script no `<head>` (antes do CSS) para não haver flash de tema claro.

### 9.2 Tipografia
- Família: system stack (`-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`) na v1;
  evolução opcional para Inter self-hosted (woff2, subset latin, `font-display: swap`).
- Escala: 12 / 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56 px; `h1` fluido com `clamp(2.5rem, 5.5vw, 3.75rem)`.
- Pesos: 400, 600, 700. Entrelinha 1.15 em títulos, 1.65 em corpo.
- Largura de leitura: 60–72 caracteres (`max-width: 68ch`).

### 9.3 Espaço, grid e forma
- Base 4px: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Container 1120px, padding lateral 24px (mobile) / 40px (desktop).
- Grid de 12 colunas, gutter 24px.
- Projetos: 1 coluna no mobile, 2 em ≥768 (destaque ocupa a linha toda), 3 em ≥1024 logo abaixo
  do destaque — sem card órfão.
- Estudo de caso: 7 colunas de texto + 3,5 de ficha lateral fixa (`position: sticky`) em ≥1024;
  no mobile a ficha vem logo abaixo do resumo.
- Raios: 6px (cards), 4px (botões/tags), 0 para imagens de seção.
- Sombras: apenas duas (`--shadow-sm` em card em repouso, `--shadow-md` em hover). Nada mais.
- Breakpoints: 480, 768, 1024, 1280.

### 9.4 Componentes
`button` (primário/secundário/ghost), `tag`, `link-arrow`, `card`, `section-header` (com índice 01–03),
`meta-list`, `project-aside`, `lang-switch` (bandeira + rótulo textual), `theme-toggle`, `mobile-nav`,
`breadcrumb`, `prose`, `footer` em três colunas. Cada um com estados documentados no CSS.

## 10. Movimento
- Reveal on scroll com `IntersectionObserver`: `opacity 0→1` + `translateY(14px→0)`, 550ms, `ease-out`,
  com atraso de 70ms entre itens vizinhos.
- Só dispara uma vez; elementos já visíveis no primeiro paint **não** recebem a classe de animação.
- Sem parallax, sem contadores animados, sem transição de página.
- `prefers-reduced-motion: reduce` remove todas as transições e animações (o script nem registra nada).
- Conteúdo deve estar no HTML mesmo com JS desligado (classe de animação só é aplicada por JS).

## 11. Analytics — GoatCounter
- Código da conta em `<meta name="goatcounter">`; enquanto for `SEUCODIGO`, **nada é carregado**
  (sem requisição, sem erro no console).
- Quando configurado, `analytics.js` injeta `https://gc.zgo.at/count.js` com `async`.
- Sem cookies, sem dados pessoais, respeita `Do Not Track`.
- O site funciona normalmente se o script falhar.
- Eventos personalizados: `project-open` (slug), `contact-click` (email), `lang-switch` (destino),
  `theme-toggle`.

## 12. Estrutura de arquivos

```
kauaclairo.github.io/
├─ index.html              # Home PT
├─ projeto.html            # Template de projeto PT
├─ 404.html                # Página de erro (PT/EN)
├─ en/
│  ├─ index.html           # Home EN
│  └─ project.html         # Template de projeto EN
├─ assets/
│  ├─ css/styles.css
│  ├─ js/{i18n,theme,projects,project,reveal,analytics,app}.js
│  └─ img/{favicon.svg,projects,og}/…
├─ data/projects.json       # fonte única: 4 projetos, PT + EN
├─ robots.txt
├─ .nojekyll
├─ README.md
├─ AGENTS.md
└─ SPECS.md
```

Sem `package.json`, sem `node_modules`, sem `.github/workflows` na v1 (deploy nativo de branch).

## 13. Fora de escopo / decisões adiadas

| Item | Motivo | Gatilho para revisitar |
| --- | --- | --- |
| Formulário de contato | Exigiria serviço externo | Se e-mail gerar atrito |
| Blog/notas | Escopo maior que o portfólio | 3+ textos prontos |
| Domínio próprio | Custo/gestão | Se URL virar cartão de visita |
| Build com Astro | Duplicação de HTML PT/EN | Se passar de 8 projetos ou 2 idiomas extras |
| SEO avançado (sitemap, OG image gerada) | Não selecionado na entrevista | Antes de divulgar em massa |
| Páginas de projeto estáticas | Template único via `?slug=` atende a v1 | Se a indexação dos casos virar prioridade |

## 14. Riscos conhecidos

1. **Duplicação de HTML entre PT e EN.** Mitigação: textos vêm do JSON; só o esqueleto é duplicado. Se crescer, migrar para Astro.
2. **Páginas de projeto renderizadas por JS** podem ser indexadas com atraso. Mitigação: título, description,
   canonical e `hreflang` sincronizados em runtime, `noindex` automático para placeholders e `<noscript>`.
   Gatilho: se os casos reais precisarem ranquear bem, gerar HTML estático na M5.
3. **Conteúdo placeholder** pode ir ao ar. Mitigação: selo visível + checklist de pendências antes do deploy.
4. **Imagens pesadas** quebram o orçamento. Mitigação: pipeline manual de exportação (16:9, WebP ≤ 200 KB, `srcset` 1x/2x).
5. **Acessibilidade do menu mobile** costuma falhar em foco e `Esc`. Mitigação: teste dedicado na checklist de DoD.

## 15. Entregas da v1

| Fase | Entrega | Critério de aceite | Estado |
| --- | --- | --- | --- |
| M0 | Tokens, `styles.css` base, esqueleto das páginas | Página em branco com tipografia e grid corretos | ✅ 2026-10-23 |
| M1 | Home PT completa | Hero, 4 cards, Sobre, Contato, footer | ✅ 2026-10-23 |
| M2 | i18n e Home EN | Troca de idioma preserva contexto; `hreflang` correto | ✅ 2026-10-23 |
| M2.1 | Tema claro/escuro | Ambos com contraste AA, sem flash, escolha persistida | ✅ 2026-10-23 |
| M3 | Template de projeto + 4 estudos de caso | Slug inválido cai em 404; metadados dinâmicos | ✅ 2026-10-23 |
| M4 | Movimento, analytics, 404, robôs | Reduced-motion ok; nenhum erro de console | ✅ 2026-10-23 |
| M5 | Revisão de acessibilidade e performance, deploy | Lighthouse ≥ 95 nas 4 categorias, mobile | 🟡 pronto para publicar |

Revisão local: os cards são carregados por `fetch`, então é preciso servir por HTTP
(`python -m http.server 8000` na raiz). Abrir `index.html` direto do disco bloqueia o JSON.

## 16. Pendências de conteúdo (bloqueiam o deploy, não o planejamento)

- [ ] Bio real (3 parágrafos) em PT e EN.
- [ ] Confirmar e-mail profissional e URL do LinkedIn.
- [ ] Trocar os 4 projetos de exemplo por casos reais: título, resumo, papel, período, stack, links
      e imagens. Ao marcar `placeholder: false`, o `noindex` automático desaparece.
- [ ] Decidir se haverá foto no Sobre.
- [ ] Criar conta GoatCounter e substituir `SEUCODIGO` em `<meta name="goatcounter">`
      (enquanto for placeholder, nenhum script é carregado).
- [ ] Revisar textos EN com alguém fluente (ou aceitar revisão assistida).
- [ ] Conferir Lighthouse mobile ≥ 95 nas quatro categorias depois do primeiro deploy.

## 17. Glossário
**Hero** — primeira seção visível. **Card** — bloco resumido de projeto. **Slug** — identificador
curto do projeto na URL. **Token** — variável de design (cor, espaço, tipo). **DoD** — Definition of Done.
