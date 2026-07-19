# QA Checklist — Fluxo "Agendar Demo → Widget GHL → GHL CRM"

**Objetivo:** validar que todo clique em "Agendar Demo" abre o widget correto do GoHighLevel, o horário é marcado com sucesso e o contato + oportunidade aparecem no CRM do GHL (pipeline correto, estágio correto, com UTMs preservadas).

**URL do widget:** `https://links.clickonepro.com/widget/bookings/clickoneus`
**Fonte única:** `src/lib/external-urls.ts` → `GHL_BOOKING`

---

## 1. Pré-requisitos

- [ ] Login no painel do GHL disponível (sub-conta ClickOne US)
- [ ] Calendário `clickoneus` ativo, com pelo menos 1 slot disponível nos próximos 3 dias
- [ ] Pipeline de vendas identificado (ex.: "Inbound Demos") e estágio de entrada confirmado
- [ ] Automação/workflow que cria a oportunidade ao agendar está **Publicada** (Automation → Workflows)
- [ ] E-mail de teste real acessível (não usar `+alias` na primeira rodada — alguns filtros do GHL escondem)
- [ ] Preview e produção acessíveis: `https://clickonepro.com` e preview do Lovable

---

## 2. Cobertura de CTAs (todos devem apontar para `GHL_BOOKING` e abrir em nova aba)

Testar em desktop e mobile:

| Local | Arquivo | OK? |
|---|---|---|
| Header público — botão "Agendar Demo" | `src/components/layout/Header.tsx` | [ ] |
| Header das LPs — botão "Agendar Demo" | `src/components/layout/LPHeader.tsx` | [ ] |
| CTA flutuante das LPs | `src/components/LPFloatingCTA.tsx` | [ ] |
| Home — CTAs (hero, meio, final) | `src/pages/Index.tsx` | [ ] |
| Página `/agendar-demo` | `src/pages/AgendarDemo.tsx` | [ ] |
| Página `/contato` | `src/pages/Contato.tsx` | [ ] |
| Página `/sobre` | `src/pages/Sobre.tsx` | [ ] |
| CTA dentro do BlogPost | `src/pages/BlogPost.tsx` | [ ] |
| Página `/empresas/media-empresa` | `src/pages/empresas/MediaEmpresa.tsx` | [ ] |

**Como validar cada um:**
1. Clicar no CTA
2. Confirmar que abre **em nova aba** (`target="_blank"`)
3. URL da nova aba começa com `https://links.clickonepro.com/widget/bookings/clickoneus`
4. UTMs presentes na URL (`utm_source`, `utm_medium`, `utm_campaign`) quando aplicável

---

## 3. Teste de agendamento (happy path)

1. [ ] Abrir aba anônima em `https://clickonepro.com/?utm_source=qa&utm_medium=checklist&utm_campaign=demo_flow_test`
2. [ ] Clicar em "Agendar Demo" no header
3. [ ] Widget carrega sem erro no console (F12 → Console)
4. [ ] Selecionar data + horário disponível
5. [ ] Preencher: Nome "QA Test [timestamp]", Email real de teste, Telefone válido US (+1)
6. [ ] Submeter e confirmar tela de sucesso do GHL
7. [ ] Recebeu e-mail de confirmação em até 2 min? [ ]
8. [ ] Recebeu SMS de confirmação (se ativo)? [ ]

---

## 4. Validação no GHL CRM

### 4.1 Contato
- [ ] Contacts → buscar pelo nome "QA Test [timestamp]" ou e-mail
- [ ] Contato existe com nome, e-mail e telefone corretos
- [ ] Campo **Source** preenchido (Calendar / clickoneus)
- [ ] **Tags** esperadas aplicadas (ex.: `demo-scheduled`, `website`)
- [ ] UTMs armazenadas nos custom fields (`utm_source=qa`, etc.)

### 4.2 Appointment
- [ ] Calendar → visão do calendário `clickoneus` mostra o slot marcado
- [ ] Status = `Confirmed` (ou `Booked`)
- [ ] Atribuído ao usuário correto (round-robin ou fixo, conforme config)

### 4.3 Opportunity
- [ ] Opportunities → pipeline "Inbound Demos" (ou configurado)
- [ ] Nova oportunidade criada, vinculada ao contato acima
- [ ] Estágio inicial correto (ex.: "Demo Scheduled")
- [ ] Valor/monetário se aplicável
- [ ] Owner atribuído

### 4.4 Automação
- [ ] Automation → Workflow History mostra o workflow disparado
- [ ] Todas as ações do workflow executaram sem erro (checkmarks verdes)

---

## 5. Casos de falha a testar

| Cenário | Esperado |
|---|---|
| Fechar widget sem preencher | Nenhum contato/opp criado no GHL |
| E-mail inválido | Widget bloqueia envio, sem registro no GHL |
| Slot indisponível (concorrência) | Widget informa erro e permite escolher outro |
| Bloqueador de pop-up ativo | CTA ainda abre (usa `target="_blank"` direto, não `window.open`) |
| Modo mobile (viewport < 768px) | Widget renderiza responsivo, botão de submit acessível |

---

## 6. Regressão pós-deploy

Após qualquer mudança em `src/lib/external-urls.ts`, `Header.tsx`, `LPHeader.tsx` ou `LPFloatingCTA.tsx`:

- [ ] `rg "widget/bookings" src/` retorna apenas `external-urls.ts` (sem URLs hardcoded)
- [ ] Preview do Lovable + produção: fazer 1 agendamento real de sanity check
- [ ] Verificar Workflow History do GHL para confirmar sem falhas nas últimas 24h

---

## 7. Registro do teste

Ao concluir, anotar:

- Data/hora do teste:
- Testador:
- Contato criado (ID no GHL):
- Opportunity criada (ID no GHL):
- Screenshot da tela de sucesso: [anexar]
- Screenshot do contato no GHL: [anexar]
- Screenshot da opportunity no GHL: [anexar]
- Issues encontrados:
