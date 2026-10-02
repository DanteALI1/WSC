export interface HealthResponse {
  service: string;
  status: 'ok' | 'degraded' | 'down';
}
