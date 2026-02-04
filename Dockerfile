#1. Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY src/infraestructure/prisma ./src/infraestructure/prisma/

RUN npm install

RUN npx prisma generate

# 5. copy the rest of the code
COPY . .

# 6. Compile to TS
RUN npm run build

# 2. Production
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