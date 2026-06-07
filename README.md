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

## 🚢 Deploy & Publicação

### 1. Publicar o frontend

O deploy é gerenciado pelo Lovable (build Vite + CDN global + SSL automático).

1. Abra o editor: https://lovable.dev/projects/9bf25d8e-a382-4aab-96fd-f5da4ceebd30
2. Clique em **Publish** (canto superior direito) → **Publish** ou **Update**.
3. URL pública imediata: https://clickonepro.lovable.app
4. Alterações de **frontend** só vão ao ar após clicar **Update** no diálogo de publish.
5. Alterações de **backend** (edge functions, migrations SQL) são deployadas **automaticamente** ao salvar — não precisa republicar.

### 2. Domínio customizado (`clickonepro.com`)

Já configurado. Para reaplicar ou adicionar outro domínio:

1. **Project Settings → Domains → Connect Domain**
2. No seu registrador DNS, crie:
   - `A` · `@` → `185.158.133.1`
   - `A` · `www` → `185.158.133.1`
   - `TXT` · `_lovable` → valor fornecido na tela
3. Aguarde propagação (até 72h). SSL é provisionado automaticamente.
4. Defina o domínio **Primary** para que os demais redirecionem.

### 3. Configurar o ambiente Supabase para produção

O projeto roda em **Lovable Cloud** (Supabase gerenciado). Não há servidor para subir — toda configuração é declarativa.

#### 3.1 Migrations (schema do banco)

- Coloque cada alteração de schema em `supabase/migrations/<timestamp>_<descricao>.sql`.
- Toda `CREATE TABLE` em `public` **precisa** ter `GRANT` + `ENABLE ROW LEVEL SECURITY` + `CREATE POLICY` no mesmo arquivo.
- O Lovable aplica as migrations automaticamente ao salvar/commitar.

#### 3.2 Edge Functions

- Arquivos em `supabase/functions/<nome>/index.ts` são deployados automaticamente.
- Configure `verify_jwt` em `supabase/config.toml` (já feito para webhooks públicos).
- Logs em tempo real: Lovable Cloud → Functions → Logs.

#### 3.3 Secrets (variáveis sensíveis)

Gerencie em **Lovable Cloud → Secrets**. Já configurados:

| Secret | Uso |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Acesso admin em edge functions |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | Cliente Supabase em functions |
| `LOVABLE_API_KEY` | Lovable AI Gateway (Gemini/GPT) |
| `ELEVENLABS_API_KEY` | TTS da Bia |
| `RESEND_API_KEY` | Envio de e-mails / relatórios |

Para adicionar um novo: Cloud → Secrets → **Add new secret**. Disponível instantaneamente em todas as edge functions via `Deno.env.get('NOME')`.

#### 3.4 Storage buckets

Buckets públicos já provisionados: `demo-audio`, `blog-images`, `lp-images`. Para novos buckets, use Cloud → Storage → **New bucket** ou crie via migration.

#### 3.5 Auth

- Painel `/admin` usa autenticação por e-mail/senha (Supabase Auth).
- Roles administrativas via tabela `user_roles` + função `has_role` (SECURITY DEFINER).
- **Não habilite** auto-confirm em produção — usuários devem confirmar e-mail.

### 4. Checklist pré-produção

- [ ] Rodar o **Security Scan** no Lovable e resolver findings High/Critical.
- [ ] Conferir RLS habilitado em todas as tabelas (`Cloud → Database → Tables`).
- [ ] Validar edge functions com logs limpos (sem erros 500).
- [ ] Confirmar domínio com status **Active** e SSL ativo.
- [ ] Testar fluxo completo: visitante anônimo → formulário → webhook GHL → relatório.
- [ ] Backup do banco (Cloud → Database → Backups) antes de migrations grandes.

### 5. Rollback

- **Frontend:** abra o histórico de versões no Lovable e clique em **Restore** na versão desejada.
- **Backend:** migrations são versionadas no Git. Crie uma nova migration revertendo as mudanças (não edite migrations já aplicadas).

---

## 📄 Licença

Proprietário — ClickOnePro / Group Biones. Todos os direitos reservados.
