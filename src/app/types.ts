export type SignalType = 'milestone' | 'blocker' | 'dependency' | 'change';
export type SignalPriority = 'high' | 'medium' | 'low';
export type StatusCategory = 'on-track' | 'at-risk' | 'blocked';
export type AudienceType = 'client' | 'internal' | 'team';
export type ToneType = 'executive' | 'operational';

export interface Signal {
  id: string;
  type: SignalType;
  priority: SignalPriority;
  title: string;
  description: string;
  source: string;
  sourceId: string;
  date: Date;
  category?: StatusCategory;
  daysOld?: number;
  changed?: boolean;
}

export interface BriefSection {
  id: string;
  title: string;
  bullets: BriefBullet[];
}

export interface BriefBullet {
  id: string;
  text: string;
  sourceSignals: string[];
  isNew?: boolean;
  changedFromLast?: boolean;
}

export interface StatusBrief {
  id: string;
  date: Date;
  audience: AudienceType;
  overallStatus: string;
  sections: BriefSection[];
}

export interface ReportComparison {
  added: string[];
  removed: string[];
  changed: string[];
}
