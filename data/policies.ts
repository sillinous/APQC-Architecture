export interface Policy {
  id: string;
  category: 'privacy' | 'ethics' | 'cost' | 'safety';
  name: string;
  description: string;
  severity: 'critical' | 'high' | 'medium';
  enabled: boolean;
}

export const enterprisePolicies: Policy[] = [
  {
    id: 'POL-001',
    category: 'privacy',
    name: 'Zero-Leak PII Protocol',
    description: 'Autonomous agents must redact PII before cross-cluster transmission.',
    severity: 'critical',
    enabled: true
  },
  {
    id: 'POL-002',
    category: 'ethics',
    name: 'Bias Reconciliation',
    description: 'Agents performing HR or Financial routing must pass quarterly bias audits.',
    severity: 'high',
    enabled: true
  },
  {
    id: 'POL-003',
    category: 'cost',
    name: 'Token Burn Ceiling',
    description: 'Prevent agent runaway. Auto-suspend nodes consuming >$50/hr without human approval.',
    severity: 'critical',
    enabled: true
  },
  {
    id: 'POL-004',
    category: 'safety',
    name: 'Human-in-the-Loop Override',
    description: 'Strategic modifications to Level 1.0 architecture require explicit human sign-off.',
    severity: 'critical',
    enabled: true
  },
  {
    id: 'POL-005',
    category: 'safety',
    name: 'Swarm Containment',
    description: 'Non-production agents are prohibited from accessing live customer databases.',
    severity: 'high',
    enabled: true
  }
];
