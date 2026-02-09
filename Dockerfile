# Builder
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# DATABASE_URL fake só para o Prisma gerar os tipos
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db"

RUN npx prisma generate --schema=src/infraestructure/prisma/schema.prisma

RUN npm run build

# Production

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER node

EXPOSE 3000

CMD ["node", "dist/server.js"]