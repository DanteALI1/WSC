# WSC — Web Security Connect

**WSC** — control plane безопасного доступа к внутренним веб-приложениям. Платформа выносит чувствительные системы за единый шлюз: пользователь работает через корпоративный портал, целевые origin не публикуются наружу, а политики доступа, изоляции сеанса и WAF задаются централизованно.

Доступ идёт по цепочке **портал → Browser Isolation → WAF → target**. Пользователь видит только URL шлюза (**URL masking**); код целевого приложения исполняется в удалённом Chromium на gateway, а не в браузере клиента. Администраторы управляют приложениями, TLS и правилами WAF; аналитики получают timeline сеансов, скриншоты и события блокировок. Вход единый, с переключением контуров Portal / Management / Analytics по ролям.

Полное продуктовое описание — в [docs/ru/produkt.md](docs/ru/produkt.md).

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

- **Основная (RU):** [docs/ru/](docs/ru/) — [продукт](docs/ru/produkt.md), обзор, архитектура, мастер-промпт, окружение, решения
- Индекс всех материалов: [docs/](docs/)

## Быстрый старт

```bash
pnpm install
sudo docker compose -f docker/docker-compose.yml up -d
pnpm dev
```

Playwright (isolation на gateway): `cd apps/gateway && pnpm exec playwright install chromium`
