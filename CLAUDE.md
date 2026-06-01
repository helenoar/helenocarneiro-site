# CLAUDE.md — Site Heleno Carneiro

Site pessoal de Heleno Carneiro em Next.js 16 (App Router) + Tailwind v4 + Framer Motion. Deploy automático na Vercel via GitHub (`helenoar/helenocarneiro-site`).

## Como atualizar conteúdo

Toda atualização de conteúdo é feita editando os arquivos JSON em `/data/`. Após editar, fazer `git add` + `git commit` + `git push` e a Vercel faz deploy automático.

### Currículo (4 idiomas)
Edite os arquivos em `/data/cv-pt.json`, `cv-en.json`, `cv-es.json`, `cv-fr.json`.

Cada arquivo tem a estrutura:
- `sections.cover` — nome, subtítulo, contatos
- `sections.about` — bio e estatísticas
- `sections.choreography` — obras como coreógrafo
- `sections.teaching` — docência
- `sections.performance` — obras como intérprete
- `sections.training` — formação e técnicas
- `sections.workshops` — oficinas e residências
- `sections.festivals` — festivais internacionais
- `sections.showreel` — links de vídeo

### Portfólio
Edite `/data/portfolio.json`. Para adicionar uma obra nova:
1. Adicione as fotos em `/public/portfolio/[slug]/`
2. A primeira foto deve se chamar `cover.jpg` e também aparecer como `01.jpg`
3. Adicione um objeto no array de `portfolio.json` com `slug`, `title`, `credit`, `creditEn`, `photos`

### Vídeos
Edite `/data/videos.json`. Cada item tem `id`, `label`, `youtubeId`, `description`.
O `youtubeId` é a parte final da URL do YouTube (ex: `HprkrE2l024` de `youtu.be/HprkrE2l024`).

### Dados da home
Edite `/data/home.json` para mudar nome, subtítulo ou contatos na página inicial.

## Design System
- Fundo: `#1C1C1C` (`bg-bg`)
- Pink: `#FF006E` (`text-pink`, `bg-pink`)
- Fontes: Barlow (`font-barlow`) e Barlow Condensed (`font-barlow-condensed`)

## Deploy
```bash
git add .
git commit -m "content: [descrição da mudança]"
git push origin main
```
O site atualiza automaticamente em ~1 minuto após o push.
