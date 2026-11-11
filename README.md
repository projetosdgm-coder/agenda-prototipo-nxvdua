# Pente Fino (protótipo)

Protótipo **só visual** de um painel de agenda para barbeiro autônomo, com assistente de IA no WhatsApp. Nada se conecta de verdade: WhatsApp, Google Agenda, IA e pagamentos são simulados no navegador. Todos os nomes, números e valores são inventados.

Abra `index.html` (ou a página publicada). Funciona no celular e no computador. Pode ser salvo na tela de início do iPhone (Safari > Compartilhar > Adicionar à Tela de Início).

## Telas

- **Assistente:** conexão do WhatsApp (por código de 8 caracteres, com QR Code como alternativa) e chat com a IA, que entende ordens como "fecha a agenda sexta", "cancela meus compromissos da manhã" ou "avisa os clientes de amanhã que vou atrasar 30 min" (respostas prontas em JavaScript).
- **Agenda:** dia em linha do tempo e semana, status de cada horário, horários livres, bloqueio de horário, lista de espera e conexão com o Google Agenda.
- **Conversas:** exemplos de atendimento da IA no WhatsApp (oferece outro horário, segunda tentativa, uma mensagem de retorno no dia seguinte, passa para o barbeiro o que não sabe).
- **Clientes:** frequência de corte, último corte, aniversário, quem está no tempo, quem sumiu e quem mais gasta.
- **Mensagens automáticas:** aniversário, "tá no tempo do corte", encher dia vazio, lembrete, retorno e mimo para cliente fiel.
- **Minha página:** página pública de agendamento (link de exemplo) e QR Code.
- **Financeiro:** resumo do mês com números fictícios e registro de pagamento.
- **Ajustes:** horários, serviços e preços de exemplo, regras da IA e reinício da demonstração.

## Estrutura

HTML, CSS e JavaScript puros, sem build: `index.html`, `estilo.css`, `dados.js` (dados de exemplo) e `app.js` (telas e simulação). O estado da demonstração fica só no navegador de quem abre (localStorage).

## Como funciona a conexão do WhatsApp por código

O WhatsApp tem uma opção oficial para conectar um aparelho sem ler QR Code: o aparelho novo pede o número e mostra um código de 8 caracteres; no celular, a pessoa vai em **Dispositivos conectados > Conectar dispositivo > Conectar com número de telefone** e digita o código. Também pode chegar uma notificação "Insira o código". Até 4 aparelhos conectados; é preciso abrir o WhatsApp no celular pelo menos uma vez a cada 14 dias.

## Fontes da pesquisa

- WhatsApp, Central de Ajuda, conectar aparelho com número de telefone: https://faq.whatsapp.com/1324084875126592
- Olhar Digital, WhatsApp Web permite logar sem QR Code (2023): https://olhardigital.com.br/2023/07/10/internet-e-redes-sociais/whatsapp-web-permite-logar-conta-sem-qr-code/
- Canaltech, WhatsApp Web permite conectar usando o número do telefone: https://canaltech.com.br/apps/whatsapp-web-agora-permite-se-conectar-usando-o-numero-do-telefone-255406/
- Baileys (biblioteca não oficial de WhatsApp Web), código de pareamento: https://www.mintlify.com/whiskeysockets/Baileys/guides/connecting-pairing-code
- Booksy, recursos (lista de espera, avaliações, agendamento online): https://biz.booksy.com/pt-br/recursos e preços: https://biz.booksy.com/pt-br/precos
- Trinks, sistema para barbearias: https://negocios.trinks.com/negocios/barbearias/ , Trinks IA: https://ajuda.trinks.com/trinks-ia-agendamento-automatico-pelo-whatsapp , clientes que não retornaram: https://ajuda.trinks.com/relatorio-de-clientes-que-nao-retornaram
- AppBarber, funções e preços: https://www.appbarber.com.br/#precos
- Avec, planos: https://negocios.avec.app/avec-planos
- CashBarber: https://sistemacashbarber.com.br/
- BestBarbers, agente de IA no WhatsApp: https://www.bestbarbers.app/agente-ia-whatsapp
