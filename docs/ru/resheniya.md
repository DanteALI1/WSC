# Зафиксированные решения WSC

Краткая фиксация архитектурных и продуктовых решений. Менять только осознанно и с обновлением связанных docs.

## Стек

| Тема | Решение |
|------|---------|
| Monorepo | TypeScript: pnpm + Turborepo |
| UI | Next.js + React + TypeScript, общий пакет `@wsc/ui` |
| API | NestJS 11 + Fastify |
| Данные | PostgreSQL |
| Кэш / очереди | Redis + BullMQ |
| Объекты | MinIO (S3 API) |
| Deploy | Docker Compose (dev/stage); edge Traefik/Caddy |

## Browser Isolation — вариант A

- Удалённый Chromium на **wsc-gateway** (Playwright).
- Пользователь получает стрим UI; код target не выполняется в браузере пользователя.
- Cookie jar **изолирован** между приложениями.
- Весь HTTP(S) isolation → **только** через `wsc-waf` → allowlisted upstream.
- Нет адресной строки удалённого браузера у end-user.

## UX портала

- После login: **sidebar** + content (каталог приложений, активные сессии, профиль, пункты по RBAC).
- Приложения открываются **in-app** (workspace внутри портала), не в новом окне/вкладке.
- Единый login + переключатель контуров Portal / Management / Analytics по правам.
- Одинаковый дизайн во всех контурах (`@wsc/ui`).

## Idle: app vs portal

| Политика | Поведение |
|----------|-----------|
| **App-idle** | Бездействие в viewer завершает только `AppSession`; портал и SSO остаются; toast о завершении сессии приложения |
| **Portal-idle** | Отдельная глобальная политика logout с портала; обычно длиннее app-idle |

**Не делать:** рвать portal SSO только из-за app-idle.

## URL masking

- End-user видит только URL шлюза (`/workspace/<opaqueId>/...` или `/a/<slugHash>/...`).
- Реальный hostname/path target не в UI, title, clipboard (если запрещено), metadata загрузок.
- SSRF: upstream только из конфига app; блок link-local / metadata IP.
- Аналитик может видеть target URL; пользователь — нет.
- Запрещены redirect на origin target и bypass WAF.

## WAF

| Тема | Решение |
|------|---------|
| Движок | ModSecurity 3 + OWASP CRS (sidecar `wsc-waf`) |
| Доступ | Только из gateway; не публиковать наружу |
| Режимы per-app | `Off` \| `DetectionOnly` \| `Prevent` |
| Атаки в scope | SQLi, XSS (reflected/stored request; optional response), upload XSS, стандартные классы CRS |
| Управление | Правила из management; publish + hot-reload (API + Redis pub/sub) |
| UX при блоке | Branded safe-page внутри workspace |

DOM XSS покрывается не только WAF, а изоляцией браузера.

## TLS / сертификаты

- Per-app: `http` \| `https` \| `https+mtls`.
- Upload CA / client cert/key; SNI; мониторинг expiry.
- Edge-сертификат портала отделён от upstream certs приложений.
- Secrets encrypted-at-rest; в UI после save — fingerprint/expiry.

## Auth и интеграции

- Единый IdP-модуль, TOTP, AD/LDAP, OIDC/SAML.
- SMTP alerts; SIEM (syslog / webhooks); Management API + API keys.
- SCIM — фаза 2.
- Permissions: `waf.manage`, `certs.manage`, app-scoped policies.

## Три сервиса + WAF (напоминание)

1. **wsc-gateway** — портал, isolation, стрим, idle app-session, URL masking  
2. **wsc-management** — пользователи, apps, WAF, certs, интеграции  
3. **wsc-analytics** — сеансы, скриншоты, WAF timeline, отчёты  
4. **wsc-waf** — ModSecurity sidecar (внутренний)

## Non-goals (зафиксировано)

- Не открывать target в новом окне как основной UX.
- Не ставить клиентский spyware/extension для записи.
- Не рвать portal SSO только из-за app-idle.
- Не показывать target URL end-user.
- Не позволять isolation обходить WAF.

## См. также

- [Обзор](obzor.md)
- [Архитектура](arkhitektura.md)
- [Мастер-промпт](master-prompt.md)
