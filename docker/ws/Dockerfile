FROM node:24-alpine

WORKDIR /app

COPY package.json ./package.json

COPY pnpm-lock.yaml ./pnpm-lock.yaml

COPY pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY turbo.json ./turbo.json

COPY packages ./packages

COPY apps/ws ./apps/ws

RUN npm install -g pnpm 

# RUN pnpm install

RUN pnpm install --ignore-scripts

RUN pnpm run prisma-migrate-gen

EXPOSE 3002

CMD ["pnpm", "run", "ws-start"]