# ClickOnePro

Plataforma de IA conversacional para negócios de serviços nos EUA — atendente virtual Bia, follow-up automático e infraestrutura vertical.

🌐 **Produção:** https://clickonepro.com
🛠️ **Editor Lovable:** https://lovable.dev/projects/9bf25d8e-a382-4aab-96fd-f5da4ceebd30

---

## 📁 Estrutura do Repositório

O código está **totalmente separado** entre frontend e backend, em pastas independentes:

```
clickonepro/
├── src/                    # 🎨 FRONTEND (React + Vite + TS + Tailwind)
│   ├── components/         # Componentes reutilizáveis (UI, layout, admin)
│   ├── pages/              # Rotas públicas, /admin, /lp, /setores, /legal
│   ├── hooks/              # React hooks (analytics, realtime, dashboard)
│   ├── contexts/           # AdminAuthContext
│   ├── i18n/               # Traduções pt-BR, en-US, es
│   ├── lib/                # Utils, geolocation, external-urls
│   ├── integrations/       # Cliente Supabase (auto-gerado, NÃO editar)
│   ├── assets/             # Logos e imagens estáticas
│   ├── data/               # Conteúdo estático (audioDemo)
│   ├── App.tsx             # Rotas
│   ├── main.tsx            # Entry point
│   └── index.css           # Design system (HSL tokens)
│
├── supabase/               # ⚙️ BACKEND (Lovable Cloud / Supabase)
│   ├── functions/          # Edge functions (Deno)
│   │   ├── elevenlabs-tts/         # TTS via ElevenLabs
│   │   ├── generate-blog-image/    # Geração de capas via Lovable AI
│   │   ├── generate-demo-audio/    # Áudio demo
│   │   ├── generate-lp-images/     # Imagens de landing pages
│   │   ├── ghl-webhook/            # Webhook GoHighLevel
│   │   └── send-scheduled-reports/ # Relatórios agendados
│   ├── migrations/         # Schema SQL versionado (RLS, políticas, funções)
│   └── config.toml         # Config de edge functions (verify_jwt etc.)
│
├── public/                 # Assets estáticos servidos pelo Vite
├── index.html              # HTML raiz (SEO, fontes, scripts)
├── tailwind.config.ts      # Configuração Tailwind + tokens
├── vite.config.ts          # Build config
└── package.json            # Dependências
```

### Separação clara

| Camada | Pasta | Responsabilidade |
|---|---|---|
| **Frontend** | `src/` + `public/` + `index.html` | UI, rotas, design system, chamadas ao backend |
| **Backend** | `supabase/` | Banco (Postgres + RLS), edge functions, storage, auth |

Não há mistura: o frontend **consome** o backend via `@/integrations/supabase/client` (cliente auto-gerado), e o backend é totalmente declarativo em SQL + funções Deno.

---

## 🚀 Desenvolvimento Local

```bash
# Pré-requisitos: Node.js 18+ (use nvm)
git clone https://github.com/groupbiones-boop/clickonepro.git
cd clickonepro
npm install
npm run dev
```

Acesse http://localhost:8080.

### Sincronização Lovable ↔ GitHub

A sincronização é **bidirecional e automática**:
- Push no GitHub → aparece no Lovable em segundos
- Alteração no Lovable → commit automático no GitHub

Edite onde for mais confortável (IDE local, GitHub web, Codespaces ou Lovable) — os três ficam sempre alinhados.

---

## ⚙️ Backend (Lovable Cloud)

O backend roda em **Lovable Cloud** (Postgres + Edge Functions gerenciados). Não é necessário rodar Supabase localmente; toda alteração de schema vai em `supabase/migrations/*.sql` e é aplicada automaticamente.

### Edge Functions

Deploy automático ao salvar arquivo em `supabase/functions/<nome>/index.ts`.
Configuração de JWT em `supabase/config.toml`.

### Secrets

Gerenciados via Lovable Cloud → Secrets (nunca commitados). Variáveis padrão:
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` (frontend)
- `SUPABASE_SERVICE_ROLE_KEY`, `LOVABLE_API_KEY`, `ELEVENLABS_API_KEY` etc. (edge functions)

### Segurança

- **RLS habilitado** em todas as tabelas de `public`
- Roles em tabela separada (`user_roles`) + função `has_role` SECURITY DEFINER
- Auth via `AdminAuthContext` para o painel `/admin`

---

## 🧰 Stack

**Frontend:** React 18 · Vite 5 · TypeScript 5 · Tailwind CSS 3 · shadcn/ui · React Router · TanStack Query · i18next
**Backend:** Postgres 15 · Supabase Edge Functions (Deno) · Lovable AI Gateway (Gemini/GPT) · ElevenLabs

---

## 📦 Publicação

Publique pelo botão **Publish** no editor Lovable. Domínio customizado configurado em Project Settings → Domains (`clickonepro.com`).

---

## 📄 Licença

Proprietário — ClickOnePro / Group Biones. Todos os direitos reservados.
