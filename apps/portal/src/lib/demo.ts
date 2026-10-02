export const SESSION_COOKIE = 'wsc_portal_session';
export const DEMO_USER = {
  name: 'Demo User',
  email: 'demo@wsc.local',
  role: 'end_user' as const,
};

/** Opaque stub apps for M1 catalog — no real upstream URLs exposed to UI. */
export const STUB_APPS = [
  {
    id: 'app-crm',
    name: 'Internal CRM',
    description: 'Клиентские карточки и сделки через безопасный workspace.',
    opaqueId: 'a7k2m9xq',
    status: 'ready' as const,
  },
  {
    id: 'app-siem',
    name: 'SIEM Console',
    description: 'Мониторинг событий безопасности без раскрытия внутреннего URL.',
    opaqueId: 'b3n8p1yz',
    status: 'ready' as const,
  },
  {
    id: 'app-hr',
    name: 'HR Portal',
    description: 'Кадровые сервисы в изолированном сеансе браузера.',
    opaqueId: 'c5r4t0uv',
    status: 'ready' as const,
  },
] as const;

export function findAppByOpaqueId(opaqueId: string) {
  return STUB_APPS.find((app) => app.opaqueId === opaqueId);
}
