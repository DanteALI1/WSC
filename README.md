# WSC — Web Security Connect

**WSC** — корпоративная платформа безопасного доступа к внутренним веб-приложениям через единый портал. Пользователь работает с целевыми системами внутри WSC: интерфейс стримится с удалённого браузера на шлюзе (**Browser Isolation**), реальные URL скрыты (**URL masking**), а весь трафик к приложениям проходит через **WAF** (ModSecurity + OWASP CRS).

Администраторы управляют приложениями, политиками, сертификатами и правилами WAF; аналитики просматривают сеансы, скриншоты и инциденты. Вход единый, с переключением контуров Portal / Management / Analytics по правам.

## Архитектура

![Архитектура WSC](docs/ru/assets/wsc-architecture.svg)

Пользовательский трафик идёт через шлюз (**Browser Isolation**) и **WAF** к целевым приложениям; **Management** публикует правила и сертификаты на gateway; **Analytics** записывает сеансы, скриншоты и события WAF.

Исходник схемы (Mermaid): [docs/ru/assets/wsc-architecture.mmd](docs/ru/assets/wsc-architecture.mmd).

## Сервисы

- **wsc-gateway** — портал (sidebar, каталог), Browser Isolation, стрим UI, app-idle, URL masking
- **wsc-management** — пользователи, RBAC, приложения, TLS, правила WAF, интеграции
- **wsc-analytics** — сеансы, скриншоты, timeline WAF, отчёты
- **wsc-waf** — sidecar ModSecurity 3 + OWASP CRS (только из gateway)

## Документация

- **Основная (RU):** [docs/ru/](docs/ru/) — обзор, архитектура, мастер-промпт, окружение, решения
- Индекс всех материалов: [docs/](docs/)

## Быстрый старт

```bash
pnpm install
sudo docker compose -f docker/docker-compose.yml up -d
pnpm dev
```

Playwright (isolation на gateway): `cd apps/gateway && pnpm exec playwright install chromium`
