# FROM node:24-alpine

# WORKDIR /app

# COPY package.json ./package.json

# COPY pnpm-lock.yaml ./pnpm-lock.yaml

# COPY pnpm-workspace.yaml ./pnpm-workspace.yaml

# COPY turbo.json ./turbo.json

# COPY packages ./packages

# COPY apps/ws ./apps/ws

# RUN npm install -g pnpm 

# # RUN pnpm install

# RUN pnpm install --ignore-scripts

# RUN pnpm run prisma-migrate-gen

# EXPOSE 3002

# CMD ["pnpm", "run", "ws-start"]


FROM node:24-alpine as builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps/ws ./apps/ws
COPY packages ./packages

RUN pnpm install --ignore-scripts
RUN pnpm run prisma-migrate-gen 
RUN pnpm run build

FROM node:24-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/ws/node_modules ./apps/ws/node_modules
COPY --from=builder /app/apps/ws/dist ./apps/ws/dist
COPY --from=builder /app/packages/db ./packages/db

EXPOSE 3002

CMD ["pnpm", "run", "ws-start"]