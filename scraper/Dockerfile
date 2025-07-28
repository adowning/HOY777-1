FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
 CMD ["bun", "run", "api-scraper.ts"]
# # --- Stage 1: Build ---
# # Use the official Bun image as a builder to install dependencies
# # FROM oven/bun:1.0 as builder
# FROM oven/bun:latest as builder
# WORKDIR /usr/app
# COPY package.json bun.lock ./
# # RUN bun install --frozen-lockfileendencies for schema generation if needed)
# RUN bun install --frozen-lockfile

# # --- Stage 2: Prune ---
# # Create a pruned production environment
# FROM oven/bun:1.0 as pruner

# WORKDIR /usr/app

# # Copy the installed dependencies and package files from the builder
# COPY --from=builder /usr/app/node_modules ./node_modules
# COPY package.json bun.lock ./

# # This command will remove all devDependencies, leaving only what's needed for production
# RUN bun install --production

# # --- Stage 3: Final ---
# # Use the lightweight slim image for the final, small container
# FROM oven/bun:1.0-slim

# WORKDIR /usr/app

# # Copy the pruned production dependencies from the pruner stage
# COPY --from=pruner /usr/app/node_modules ./node_modules

# # Copy only the essential source code files needed to run the scraper
# COPY db/index.ts ./db/
# COPY db/schema/gameplay.ts ./db/schema/
# COPY db/schema/games.ts ./db/schema/
# COPY env.ts ./
# COPY api-scraper.ts ./scripts/

# # The command to run the scraper when the container starts
# CMD ["bun", "run", "scripts/api-scraper.ts"]

# # # Use the official Bun image
# # FROM oven/bun:1.0

# # # Set the working directory inside the container
# # WORKDIR /usr/app

# # # Copy package.json and bun.lockb to the container.
# # # This assumes the build context is the 'backend' directory itself.
# # COPY package.json bun.lockb ./

# # # Install dependencies using the lockfile for reproducibility
# # RUN bun install --frozen-lockfile

# # # Copy the rest of the application source code
# # COPY . .

# # # The command to run the scraper when the container starts
# # CMD ["bun", "run", "scripts/api-scraper.ts"]# --- Stage 1: Build ---
# # Use the official Bun image as a builder to install dependencies
# # FROM oven/bun:1.0 as builder
# FROM oven/bun:latest as builder
# WORKDIR /app
# COPY package.json bun.lock ./
# # RUN bun install --frozen-lockfileendencies for schema generation if needed)
# RUN bun install --frozen-lockfile

# # --- Stage 2: Prune ---
# # Create a pruned production environment
# FROM oven/bun:1.0 as pruner

# WORKDIR /usr/app

# # Copy the installed dependencies and package files from the builder
# COPY --from=builder /usr/app/node_modules ./node_modules
# COPY package.json bun.lock ./

# # This command will remove all devDependencies, leaving only what's needed for production
# RUN bun install --production

# # --- Stage 3: Final ---
# # Use the lightweight slim image for the final, small container
# FROM oven/bun:1.0-slim

# WORKDIR /usr/app

# # Copy the pruned production dependencies from the pruner stage
# COPY --from=pruner /usr/app/node_modules ./node_modules

# # Copy only the essential source code files needed to run the scraper
# COPY db/index.ts ./db/
# COPY db/schema/gameplay.ts ./db/schema/
# COPY db/schema/games.ts ./db/schema/
# COPY env.ts ./
# COPY api-scraper.ts ./scripts/

# # The command to run the scraper when the container starts
# CMD ["bun", "run", "scripts/api-scraper.ts"]

# # # Use the official Bun image
# # FROM oven/bun:1.0

# # # Set the working directory inside the container
# # WORKDIR /usr/app

# # # Copy package.json and bun.lockb to the container.
# # # This assumes the build context is the 'backend' directory itself.
# # COPY package.json bun.lockb ./

# # # Install dependencies using the lockfile for reproducibility
# # RUN bun install --frozen-lockfile

# # # Copy the rest of the application source code
# # COPY . .

# # # The command to run the scraper when the container starts
# # CMD ["bun", "run", "scripts/api-scraper.ts"]