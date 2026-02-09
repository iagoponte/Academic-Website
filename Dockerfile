# Builder
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=src/infraestructure/prisma/schema.prisma

RUN npm run build

# Production
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/src/infraestructure/prisma ./src/infraestructure/prisma

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER node

EXPOSE 3000

CMD ["node", "dist/server.js"]