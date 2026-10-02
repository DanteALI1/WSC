# Окружение разработки WSC

Статус инструментов и команды для локальной/cloud-разработки платформы.

## Инструменты

| Инструмент | Назначение | Статус |
|------------|------------|--------|
| Node.js 22+ | monorepo | установлен (v22.14.0) |
| pnpm 9.x | workspaces | corepack activate |
| Go 1.22 | optional tooling | установлен |
| Python 3.12 | scripts | установлен |
| Docker Engine + Compose | 3 сервиса + WAF + deps | см. ниже |
| Playwright + Chromium | Browser Isolation / e2e | в `/workspace/apps/gateway` |
| OpenResty/ModSecurity (CRS) | WAF | образ `owasp/modsecurity-crs:nginx` через Compose |

## Cursor MCP

Отдельных MCP-плагинов для WSC не требуется. Доступны: cursor-cloud, cursor-subscriptions, computerUse subagent для UI.

## Быстрый старт после scaffold

```bash
cd /workspace
pnpm install
sudo docker compose -f docker/docker-compose.yml pull
sudo docker compose -f docker/docker-compose.yml up -d
```

Типичный dev-цикл:

```bash
pnpm install
pnpm build

# Инфраструктура
sudo docker compose -f docker/docker-compose.yml up -d postgres redis minio

# Dev API / UI
pnpm dev
```

Порты по умолчанию: Gateway `3001`, Management `3002`, Analytics `3003`, PostgreSQL `5432`, Redis `6379`, MinIO `9000` / `9001`.

## Playwright (gateway)

Нужен для Browser Isolation и e2e:

```bash
cd /workspace/apps/gateway
pnpm exec playwright install chromium --with-deps
```

Первая установка системных библиотек может потребовать sudo.

## Docker daemon (cloud VM)

На cloud VM systemd часто недоступен: daemon запускают в фоне (например tmux-сессия `docker-daemon`):

```bash
sudo dockerd > /tmp/dockerd.log 2>&1
```

Используйте `sudo docker` / `sudo docker compose`. После `usermod -aG docker ubuntu` группа применится только после нового login.

## Структура monorepo

- `apps/gateway`, `apps/management`, `apps/analytics`
- `packages/ui`, `packages/auth`, `packages/api-types`, `packages/config`, `packages/waf-schema`
- `docker/` — Compose, Dockerfile’ы, конфиг WAF

## См. также

- [Обзор](obzor.md)
- [Архитектура](arkhitektura.md)
- Исходный статус (EN/mixed): [../dev-environment.md](../dev-environment.md)
