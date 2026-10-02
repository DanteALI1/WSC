# WSC — Web Security Connect

Enterprise secure web access: portal, Browser Isolation, WAF (ModSecurity + OWASP CRS), session analytics, centralized management.

## Architecture

- **wsc-gateway** — portal, isolation workers, URL masking
- **wsc-waf** — ModSecurity sidecar (internal only)
- **wsc-management** — users, apps, TLS, WAF rules
- **wsc-analytics** — sessions, screenshots, WAF timeline

Detailed architecture and master prompt: Project Context → `docs/wsc-architecture-prompt.md`.

## Monorepo

pnpm + Turborepo:

- `apps/gateway`, `apps/management`, `apps/analytics`
- `packages/ui`, `packages/auth`, `packages/api-types`, `packages/config`, `packages/waf-schema`

## Quick start

```bash
pnpm install
pnpm build

# Infrastructure (requires Docker daemon)
sudo docker compose -f docker/docker-compose.yml up -d postgres redis minio

# Dev APIs
pnpm dev
```

Gateway Playwright (Browser Isolation):

```bash
cd apps/gateway && pnpm exec playwright install chromium
```

## Ports (default)

| Service | Port |
|---------|------|
| Gateway | 3001 |
| Management | 3002 |
| Analytics | 3003 |
| PostgreSQL | 5432 |
| Redis | 6379 |
| MinIO | 9000 / 9001 |
