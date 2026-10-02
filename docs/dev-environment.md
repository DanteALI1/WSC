# WSC dev environment

Статус инструментов для разработки WSC (cloud VM).

| Инструмент | Назначение | Статус |
|------------|------------|--------|
| Node.js 22+ | monorepo | установлен (v22.14.0) |
| pnpm 9.x | workspaces | corepack activate |
| Go 1.22 | optional tooling | установлен |
| Python 3.12 | scripts | установлен |
| Docker Engine + Compose | 3 сервиса + WAF + deps | см. ниже |
| Playwright + Chromium | Browser Isolation / e2e | установлен в `/workspace/apps/gateway` |
| OpenResty/ModSecurity (CRS) | WAF | образ `owasp/modsecurity-crs:nginx` через Compose (pull на cloud VM может требовать другой runtime; в compose зафиксирован) |

## Cursor MCP

Отдельных MCP-плагинов для WSC не требуется. Доступны: cursor-cloud, cursor-subscriptions, computerUse subagent для UI.

## Команды после scaffold

```bash
cd /workspace
pnpm install
sudo docker compose -f docker/docker-compose.yml pull
sudo docker compose -f docker/docker-compose.yml up -d
```

## Playwright (gateway app)

```bash
cd /workspace/apps/gateway
pnpm exec playwright install chromium --with-deps
```

Требует sudo для системных libs при первой установке.

## Docker daemon (cloud VM)

Systemd недоступен: daemon запускается в tmux-сессии `docker-daemon`:

```bash
sudo dockerd > /tmp/dockerd.log 2>&1
```

Использовать `sudo docker` / `sudo docker compose`.

## Примечание

После `usermod -aG docker ubuntu` группа применится после нового login; до этого — sudo.
