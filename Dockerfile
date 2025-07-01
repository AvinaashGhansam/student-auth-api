# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# 1) Enable corepack & activate pnpm
RUN corepack enable \
  && corepack prepare pnpm@latest --activate

# 2) Copy only the pnpm lockfile and manifest, then install deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 3) Copy your source and build
COPY tsconfig.json ./
COPY src ./src
RUN pnpm run build



# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app

# 1) Enable corepack & pnpm again
RUN corepack enable \
  && corepack prepare pnpm@latest --activate

# 2) Copy lockfile & manifest, install only prod deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# 3) Bring in your compiled code
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]
