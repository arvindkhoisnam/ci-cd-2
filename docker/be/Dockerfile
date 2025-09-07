# ---- Build stage ----
FROM node:24-alpine AS builder
WORKDIR /app
ARG DATABASE_URL
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY apps/http ./apps/http

RUN pnpm install 
ENV DATABASE_URL=${DATABASE_URL}
RUN pnpm run prisma-migrate-gen
RUN pnpm run build 


# ---- Runtime stage ----
FROM node:24-alpine AS runtime
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/http/node_modules ./apps/http/node_modules

# COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/apps/http/dist ./apps/http/dist
COPY --from=builder /app/packages/db ./packages/db

EXPOSE 3001
CMD ["pnpm","run","http-start"]


