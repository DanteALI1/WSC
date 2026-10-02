# Мастер-промпт WSC

Полный мастер-промпт для генерации кода и разработки агентами. Основная версия — на русском; английская копия из исходника — в приложении в конце.

Скопируйте нужный блок как системный/проектный промпт.

---

## Мастер-промпт (русский)

```markdown
Ты разрабатываешь WSC (Web Security Connect) — корпоративную платформу безопасного доступа к веб-приложениям.

Архитектура:
- Три прикладных сервиса в Docker: wsc-gateway (портал + Browser Isolation через Playwright/Chromium), wsc-management (admin API/UI), wsc-analytics (запись сеансов API/UI).
- Sidecar wsc-waf: OpenResty/Nginx + ModSecurity 3 + OWASP CRS. ВЕСЬ трафик из isolation-браузеров к upstream-приложениям ОБЯЗАН проходить через wsc-waf без обхода.
- Общая инфраструктура: PostgreSQL, Redis (+ BullMQ), MinIO. TypeScript monorepo: pnpm, Turborepo, Next.js UI в @wsc/ui, NestJS API.
- Единый вход с переключателем ролей между Portal / Management / Analytics. Единый дизайн-система во всех контурах.

UX портала:
- После login: sidebar + каталог приложений. Открытие приложения — in-app workspace (встроенный стрим удалённого браузера), НИКОГДА не новое окно браузера.
- Sidebar: Приложения, Активные сессии, Профиль и пункты по RBAC. Кнопка «Назад к каталогу» из workspace.
- Пользовательский URL — ТОЛЬКО URL шлюза с opaque-путём (/workspace/{opaqueId}/...). Никогда не показывать upstream hostname (например внутренний URL Wazuh).
- App idle timeout отключает ТОЛЬКО app-сессию; portal-сессия остаётся. Отдельный опциональный portal idle logout (длиннее app-idle).
- При блоке WAF: брендированная safe-page внутри workspace, без ухода с портала.

Browser Isolation (вариант A):
- Удалённый Chromium на gateway; стрим UI клиенту. Cookie jar изолирован между приложениями.
- Скриншоты на сервере по политике (периодические, navigation/click, WAF block) без деградации UX и без заметного клиентского агента.
- Весь HTTP(S) из isolation → wsc-waf → allowlisted upstream. SSRF guard: только hosts из конфига app; блок link-local / metadata IP.

WAF (ModSecurity 3 + OWASP CRS):
- Режимы per-app: Off, DetectionOnly, Prevent. Paranoia 1–4, custom SecLang, exclusions, publish из management с hot-reload (API + Redis pub/sub).
- Блокировать SQLi, XSS (reflected/stored на request; опционально response inspection), upload XSS (multipart + policy) и стандартные классы CRS до достижения upstream.
- События WAF коррелируются в analytics с timeline сеанса и скриншотами.

Management per-app:
- Internal upstream URL, opaque public route, TLS (http/https/mtls) с загружаемыми CA/client certs, WAF profile, idle/screenshot/clipboard/download политики, launch ACL, интеграции.

Безопасность и интеграции:
- RBAC, TOTP, AD/LDAP, OIDC/SAML, SMTP, append-only audit, encrypted secrets/certs, SIEM (syslog/webhooks), Management API.
- Permissions: waf.manage, certs.manage, app-scoped policies.

Реализуй поэтапно по фазам M1–M6. Следуй существующей структуре monorepo apps/ и packages/. Не нарушай явные non-goals:
- не открывать target в новом окне как основной UX;
- не ставить клиентский spyware/extension для записи;
- не рвать portal SSO только из-за app-idle;
- не показывать target URL end-user;
- не позволять isolation обходить WAF.
```

---

## Приложение: English master prompt

Исходный английский мастер-промпт из `docs/wsc-architecture-prompt.md` (сохранён для совместимости с англоязычными агентами).

```markdown
You are building WSC (Web Security Connect), an enterprise secure web access platform.

Architecture:
- Three application services in Docker: wsc-gateway (portal + Browser Isolation via Playwright/Chromium), wsc-management (admin API/UI), wsc-analytics (session recording API/UI).
- Sidecar wsc-waf: OpenResty/Nginx + ModSecurity 3 + OWASP CRS. ALL traffic from isolation browsers to upstream apps MUST pass through wsc-waf with no bypass.
- Shared infra: PostgreSQL, Redis (+ BullMQ), MinIO. TypeScript monorepo: pnpm, Turborepo, Next.js UI in @wsc/ui, NestJS APIs.
- Single sign-on with role switcher across Portal / Management / Analytics. Same design system everywhere.

Portal UX:
- After login: sidebar + app catalog. Opening an app uses in-app workspace (embedded remote browser stream), NEVER a new browser window.
- User-visible URL is ONLY the gateway URL with opaque path (/workspace/{opaqueId}/...). Never show upstream hostname (e.g. Wazuh internal URL).
- App idle timeout disconnects ONLY the app session; portal session remains. Optional separate portal idle logout.
- On WAF block: show branded safe page inside workspace.

Browser Isolation:
- Remote Chromium on gateway; stream UI to client. Screenshots on server per policy without degrading UX or obvious surveillance.

WAF:
- Per-app modes: Off, DetectionOnly, Prevent. OWASP CRS paranoia 1-4, custom SecLang rules, exclusions, publish from management with hot-reload.
- Block SQLi, XSS (reflected/stored on request; optional response inspection), and standard CRS attack classes before they reach upstream.
- WAF events correlated in analytics with session timeline and screenshots.

Management per-app:
- Internal upstream URL, opaque public route, TLS (http/https/mtls) with uploaded CA/client certs, WAF profile, idle/screenshot/clipboard/download policies, launch ACL, integrations.

Security:
- RBAC, TOTP, AD/LDAP, audit append-only, encrypted secrets/certs, SSRF allowlist on upstream.

Implement incrementally per phases M1-M6. Follow existing monorepo layout under apps/ and packages/. Do not violate the explicit non-goals list.
```
