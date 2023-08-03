# Define a imagem base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos do projeto para o diretório de trabalho do container
COPY . .

# Instala as dependências do projeto
RUN npm install

# Comando para iniciar o aplicativo quando o container for executado
CMD ["npm", "start"]
