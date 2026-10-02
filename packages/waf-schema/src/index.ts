export type WafMode = 'off' | 'detection_only' | 'prevent';

export interface WafProfile {
  id: string;
  crsVersion: string;
  paranoiaLevel: 1 | 2 | 3 | 4;
  mode: WafMode;
  anomalyThreshold: number;
}

export interface WafEvent {
  id: string;
  appId: string;
  sessionId: string;
  ruleId: string;
  severity: number;
  action: 'allow' | 'block';
  payloadHash: string;
  createdAt: string;
}
