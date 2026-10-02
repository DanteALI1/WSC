function envInt(name: string, fallback: number): number {
  const v = process.env[name];
  if (v === undefined) return fallback;
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? fallback : n;
}

export const gatewayConfig = {
  port: envInt('GATEWAY_PORT', 3001),
  wafSidecarUrl: process.env.WAF_SIDECAR_URL ?? 'http://wsc-waf:8080',
  publicUrl: process.env.GATEWAY_PUBLIC_URL ?? 'http://localhost:3001',
};

export const managementConfig = {
  port: envInt('MANAGEMENT_PORT', 3002),
};

export const analyticsConfig = {
  port: envInt('ANALYTICS_PORT', 3003),
};
