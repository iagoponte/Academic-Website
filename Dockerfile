# ----------------------------------------------------------------------------
# ESTÁGIO 1: BUILD (A Fábrica)
# Aqui instalamos tudo, rodamos o Prisma e compilamos o TypeScript
# ----------------------------------------------------------------------------
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# 1. Copia apenas os arquivos de dependência (para aproveitar o cache do Docker)
COPY package*.json ./
COPY prisma ./prisma/

# 2. Instala TODAS as dependências (incluindo devDependencies como typescript)
RUN npm install

# 3. Gera o Prisma Client (Crucial: sem isso o banco não funciona)
RUN npx prisma generate

# 4. Copia o resto do código fonte
COPY . .

# 5. Compila o TypeScript para JavaScript (pasta dist)
RUN npm run build

# ----------------------------------------------------------------------------
# ESTÁGIO 2: PRODUÇÃO (O Produto Final)
# Aqui copiamos apenas o necessário da "Fábrica". Imagem leve e segura.
# ----------------------------------------------------------------------------
FROM node:20-alpine

WORKDIR /app

# Instala apenas dependências leves de produção
COPY package*.json ./
RUN npm install --only=production

# Copia os artefatos construídos no estágio anterior (builder)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# IMPORTANTE: Copia o Prisma Client gerado no estágio anterior
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Define usuário não-root por segurança (Best Practice)
USER node

# Expõe a porta que sua API usa
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/server.js"]