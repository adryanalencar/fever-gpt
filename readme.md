# Fever-GPT

## Descrição
O Fever-GPT é um aplicativo Node.js que utiliza o poderoso modelo de linguagem GPT3.5 da OpenAI para fornecer respostas automáticas às mensagens de chat contendo dúvidas pertinentes ao evento "Startups Fever."

O modelo foi treinado previamente com as informações disponíveis no site oficial do evento: https://www.startupsfever.com/. Todas as informações relevantes para o evento estão contidas no arquivo context.md ou connection.js, e o modelo utiliza esses dados para gerar respostas precisas e relevantes.

As informações que o modelo é capaz de fornecer incluem:

1. Detalhes do Evento:
   - Data e local do evento (03 de agosto de 2023 em São Paulo, SP).
   - Duração do evento (10 horas de conteúdo).
   - Número estimado de participantes (+1000).

2. Palestrantes:
   - Lista completa dos palestrantes, incluindo seus nomes e títulos/profissões.
   - Descrição das trilhas abordadas no evento, como Macroeconomia, Venture Capital, Growth e Tendências.

3. Ingressos:
   - Tipos de ingressos disponíveis (Lote Promocional e Primeiro Lote).
   - Preços e descontos aplicáveis a cada lote.
   - Formas de pagamento e parcelamento disponíveis para a compra dos ingressos.

4. Depoimentos:
   - Testemunhos de participantes de edições anteriores sobre a qualidade do evento e a relevância das conexões feitas.

5. Patrocinadores e Apoio:
   - Lista de empresas e entidades que patrocinam e apoiam o evento.

6. Realização e Correalização:
   - Informações sobre as empresas responsáveis pela realização e correalização do evento.

O Fever-GPT é capaz de extrair essas informações do treinamento prévio e usá-las para responder adequadamente a perguntas e dúvidas relacionadas ao evento "Startups Fever". O aplicativo visa oferecer uma experiência interativa e informativa para os usuários que buscam informações sobre o evento de startups no Brasil.

## Instalação
1. Clone o repositório do projeto:
   ```
   git clone https://github.com/adryanalencar/fever-gpt.git
   ```

2. Navegue para o diretório do projeto:
   ```
   cd fever-gpt
   ```

3. Instale as dependências usando npm:
   ```
   npm install
   ```

### Via Docker

1. Certifique-se de ter o Docker instalado em sua máquina.

2. Clone o repositório do projeto:
   ```
   git clone https://github.com/adryanalencar/fever-gpt.git
   ```

3. Navegue para o diretório do projeto:
   ```
   cd fever-gpt
   ```

4. Crie a imagem Docker usando o Dockerfile fornecido:
   ```
   docker build -t fever-gpt .
   ```

5. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   email=seu_email
   password=sua_senha
   OPENAI_API_KEY=sua_chave_da_API_do_OpenAI
   ```

6. Execute o container com a imagem criada:
   ```
   docker run -d --restart=always --env-file .env fever-gpt
   ```

Com estas instruções, você poderá executar o projeto Fever-GPT tanto diretamente pelo Node.js quanto via Docker.

## Via Node.js
1. Antes de executar o aplicativo, você precisará configurar as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:
   ```
   email=seu_email
   password=sua_senha
   OPENAI_API_KEY=sua_chave_da_API_do_OpenAI
   ```

2. Instale as dependências e incie o aplicativo usando npm:
   ```
   npm i
   npm start
   ```

3. O aplicativo se conectará automaticamente ao servidor WebSocket do evento.

4. Os participantes poderão enviar mensagens no chat do usuário logado.

5. O GPT3.5 da OpenAI responderá automaticamente às mensagens dos participantes, fornecendo respostas relevantes e úteis.

## Contribuição
Contribuições para melhorar e expandir o projeto são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Dependências
O projeto utiliza as seguintes dependências:
- dotenv: ^16.3.1
- openai: ^3.3.0
- ws: ^8.13.0

## Autor
Adryan Alencar
Email: adryan.alencar@mq-link.net

## Licença
Este projeto está licenciado sob a Licença ISC. Veja o arquivo LICENSE para mais detalhes.

## Bugs e Sugestões
Para relatar bugs ou fazer sugestões, por favor, abra uma issue em [https://github.com/adryanalencar/fever-gpt/issues](https://github.com/adryanalencar/fever-gpt/issues)

## Mais informações
Para mais informações sobre o projeto, visite a página [https://github.com/adryanalencar/fever-gpt#readme](https://github.com/adryanalencar/fever-gpt#readme)

---