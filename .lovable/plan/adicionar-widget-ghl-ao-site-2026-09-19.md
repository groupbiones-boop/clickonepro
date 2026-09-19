# Adicionar widget GHL ao site

## Objetivo
Adicionar o widget oficial da GHL informado pelo usuário nas páginas públicas do ClickOne.

## Implementação
- Criar um carregador dedicado para inserir o container e o script oficial apenas uma vez.
- Exibir o widget em todas as páginas públicas, incluindo landing pages.
- Impedir que o widget apareça no painel administrativo e na tela de autorização.
- Remover o script e o container quando o componente sair da página, evitando duplicações durante a navegação.

## Validação
- Confirmar que o widget é carregado na página inicial.
- Confirmar que não é carregado em `/admin/*`.
- Verificar o resultado do build e erros do navegador.

## Detalhes técnicos
- Widget ID: `6958160ae056feed599822d0`
- Location ID: `yUk5li3I0wg4YGcbKlSF`
- Loader oficial: `https://widgets.leadconnectorhq.com/loader.js`
