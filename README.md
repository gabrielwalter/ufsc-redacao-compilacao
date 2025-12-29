# ufsc-redacao-analysis

[![status: experimental](https://img.shields.io/badge/status-testing-yellow)](https://github.com/gabrielwalter/ufsc-redacao-analysis) [![license: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

> ⚠️ **Projeto experimental** — construído com auxílio de IA na interface gráfica (Copilot e Claude Sonnet 4.5). Esta ferramenta **não tem qualquer vínculo com a UFSC**.

> Análise de redações — projeto fullstack com frontend em Vite + React e backend mínimo em Express (TS).


## 📌 Visão geral

Projeto para análise e visualização de dados de redações (UFSC). Contém um cliente React em `client/` e um servidor em `server/` (TypeScript).

## 🎯 Para vestibulandos (usuário-alvo)

Este projeto é **expositivo**: analisa padrões observados em um corpus de redações da UFSC com foco em **gêneros textuais** e características recorrentes — ele não realiza correções personalizadas nem aceita upload de redações de usuários.

O que a ferramenta apresenta (de forma descritiva):

- **Gêneros textuais** mais frequentes por ano/edital e suas características típicas.
- **Visualizações agregadas** que ajudam você a entender padrões e estratégias observadas no corpus.

Como interpretar os resultados:

- Use os gráficos e as descrições para conhecer os padrões que tendem a aparecer em redações da UFSC — pense nisso como material de estudo e referência, não como avaliação ou nota.
- Não existe funcionalidade para enviar sua redação ao sistema; os exemplos e métricas são extraídos do corpus interno do projeto.

### 📚 Dados e fontes

- Os dados analisados neste projeto estão incluídos no repositório (veja `client/public/genres-by-year.json`). Eles representam o corpus usado para gerar as análises e visualizações.
- **Privacidade:** se estiver usando uma instância pública do projeto, verifique a política de privacidade antes de compartilhar textos sensíveis. Ao rodar localmente, os dados processados permanecem na sua máquina.

---

## 🚀 Tecnologias

- Frontend: React + Vite + TypeScript
- Backend: Node + Express + TypeScript
- Estilização: Tailwind
- Bundler / Ferramentas: Vite, esbuild
- Gerenciador de pacotes: pnpm

---

## 🗂️ Estrutura do repositório

- `client/` — aplicação frontend (Vite + React)
- `server/` — backend (TypeScript)
- `shared/` — constantes/valores compartilhados
- `patches/` — patches aplicados (se houver)
- `package.json` — scripts e dependências

---

## Pré-requisitos

- Node.js (recomendado >= 18)
- pnpm (recomendado, o projeto usa `pnpm` como packageManager)
- git (para versionamento e publicar no GitHub)

---

## Instalação

No diretório raiz do projeto, rode:

```bash
pnpm install
```

Isso irá instalar dependências para todo o projeto.

---

## Comandos úteis

- `pnpm dev` — roda o servidor de desenvolvimento do Vite (frontend) (`vite --host`).
- `pnpm build` — build da aplicação: gera build do frontend e bundle do `server/index.ts` (usa `esbuild`).
- `pnpm start` — para rodar a versão de produção (após o `build`): `node dist/index.js`.
- `pnpm preview` — preview da build do Vite.
- `pnpm check` — checa tipos com `tsc --noEmit`.
- `pnpm format` — formata o código com Prettier.
- `pnpm deploy` — faz build e deploy automático para o site (copia arquivos para repositório `site-gabrielhando` e faz push).

Observação: para rodar o servidor em modo dev sem build, você pode usar o `tsx` se quiser:

```bash
pnpm exec tsx server/index.ts
```

---

## Como rodar localmente (rápido)

1. Instale dependências: `pnpm install`
2. Em um terminal, rode: `pnpm dev`
3. Abra `http://localhost:5173` (ou a URL exibida pelo Vite)

Se precisar do backend em execução separadamente para desenvolvimento de APIs, rode (em outro terminal):

```bash
pnpm exec tsx server/index.ts
```

---

## Build & Deploy

### Build local

1. `pnpm build`
2. Após o build, o servidor fica bundlado em `dist/` (arquivo de entrada `dist/index.js`).
3. Rodar em produção: `pnpm start` (ou `NODE_ENV=production node dist/index.js`).

### Deploy automático para produção

Para fazer deploy da aplicação no site (gabrielhando.com/ufsc-redacao):

```bash
pnpm run deploy
```

Este comando automaticamente:
1. 🔨 Faz build do projeto
2. 📦 Copia os arquivos compilados para o repositório `site-gabrielhando/ufsc-redacao/`
3. 📤 Faz commit e push para o GitHub
4. ✅ Aguarde alguns minutos para a Hostinger atualizar

**Nota:** O comando `deploy` assume que o repositório `site-gabrielhando` está clonado em `../site-gabrielhando/`.

---

## Git & Publicar no GitHub ✅

Se ainda não inicializou um repositório git, um fluxo rápido:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

Criar e enviar para o GitHub (opções):

- Usando GitHub CLI (`gh`):
  ```bash
  gh auth login
  gh repo create <usuario>/<repo> --public --source=. --remote=origin --push
  ```

- Sem `gh` (crie o repositório no site GitHub e então):
  ```bash
  git remote add origin git@github.com:<usuario>/<repo>.git
  git push -u origin main
  ```

Dica rápida para checar se seu repositório local está atualizado com o remoto:

```bash
git fetch origin
git status -sb
# ou para ver counts: git rev-list --left-right --count origin/$(git branch --show-current)...HEAD
```

---

## Contribuição

- Abra uma issue para discutir mudanças importantes.
- Crie uma branch com nome descritivo: `git checkout -b feat/minha-coisa`.
- Abra um Pull Request quando pronto e descreva as mudanças.

---

## Licença

MIT — veja o arquivo `LICENSE` (se presente). Caso não exista, adicione um `LICENSE` com o texto MIT se quiser manter essa licença.

---

## Contato

Se quiser, crie uma issue ou me marque no GitHub: `@gabrielwalter`.
