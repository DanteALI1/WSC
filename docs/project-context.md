# WSC — Project context

Краткий контекст проекта **Web Security Connect** для агентов и команды.

## Цель

Корпоративный шлюз безопасного доступа к WEB-приложениям: единый портал, изоляция браузера, WAF, запись сеансов и централизованное управление.

## Зафиксированные решения

| Тема | Решение |
|------|---------|
| Стек | TypeScript monorepo: pnpm, Turborepo, Next.js UI, NestJS API, PostgreSQL, Redis, MinIO, Docker Compose |
| Доступ к apps | Browser Isolation (remote Chromium на gateway) |
| UX | Sidebar + каталог; приложения **внутри** портала; app-idle не рвёт portal SSO |
| URL | Masking — пользователь видит только URL шлюза |
| WAF | ModSecurity 3 + OWASP CRS sidecar; правила из management; SQLi + XSS в scope |
| TLS | Per-app upload certs/CA/mTLS; HTTP/HTTPS по политике |
| Auth | Единый login + переключение ролей (Portal / Management / Analytics) |
| Дизайн | Общий `@wsc/ui` |

## Три сервиса

1. **wsc-gateway** — портал, isolation, стрим, idle app-session  
2. **wsc-management** — пользователи, apps, WAF, certs, интеграции  
3. **wsc-analytics** — сеансы, скриншоты, WAF timeline, отчёты  

## Репозиторий

Код: `/workspace` (Git). Документация и промпт: Context → `docs/`.

## Текущая фаза

Планирование завершено; идёт каркас monorepo + Docker и подготовка dev-окружения.

## Ссылки

- [Архитектура и мастер-промпт](wsc-architecture-prompt.md)

## Владелец

Vladislav Ayushin
