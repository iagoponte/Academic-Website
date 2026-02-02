# ----------------------------------------------------------------------------
# ESTÁGIO 1: BUILD
# ----------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copia package.json
COPY package*.json ./

# 2. MUDANÇA AQUI: Copia a pasta prisma mantendo a estrutura original
# O Docker vai criar as pastas src/infraestructure/prisma automaticamente
COPY src/infraestructure/prisma ./src/infraestructure/prisma/

# 3. Instala dependências
RUN npm install

# 4. Gera o Prisma Client
# Se o seu package.json tiver a configuração do caminho do schema, ele vai achar.
# Se não, o comando vai procurar no padrão. Se der erro aqui, me avise.
RUN npx prisma generate

# 5. Copia o resto do código
COPY . .

# 6. Compila o TypeScript
RUN npm run build

# ----------------------------------------------------------------------------
# ESTÁGIO 2: PRODUÇÃO
# ----------------------------------------------------------------------------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

# 7. Copia o código compilado (JS)
COPY --from=builder /app/dist ./dist

# 8. MUDANÇA AQUI: Copia o schema prisma para a produção também (mantendo estrutura)
# Isso é importante caso você rode migrations em produção
COPY --from=builder /app/src/infraestructure/prisma ./src/infraestructure/prisma

# 9. Copia o Prisma Client gerado (Isso é crucial)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER node

EXPOSE 3000

CMD ["node", "dist/server.js"]