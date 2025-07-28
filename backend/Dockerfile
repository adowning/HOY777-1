# --- Stage 1: Build ---
# Use the official Bun image as a builder to install dependencies
FROM oven/bun:1.0 as builder

WORKDIR /usr/src/app

# Copy only the necessary package files
COPY package.json bun.lockb ./

# Install all dependencies (including devDependencies for schema generation if needed)
RUN bun install --frozen-lockfile

# --- Stage 2: Prune ---
# Create a pruned production environment
FROM oven/bun:1.0 as pruner

WORKDIR /usr/src/app

# Copy the installed dependencies and package files from the builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package.json bun.lockb ./

# This command will remove all devDependencies, leaving only what's needed for production
RUN bun install --production

# --- Stage 3: Final ---
# Use the lightweight slim image for the final, small container
FROM oven/bun:1.0-slim

WORKDIR /usr/src/app

# Copy the pruned production dependencies from the pruner stage
COPY --from=pruner /usr/src/app/node_modules ./node_modules

# Copy only the essential source code files needed to run the scraper
COPY backend/src/db/index.ts ./src/db/
COPY backend/src/db/schema/gameplay.ts ./src/db/schema/
COPY backend/src/db/schema/games.ts ./src/db/schema/
COPY backend/src/env.ts ./src/
COPY backend/scripts/api-scraper.ts ./scripts/

# The command to run the scraper when the container starts
CMD ["bun", "run", "scripts/api-scraper.ts"]
