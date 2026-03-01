import { Signal, StatusBrief } from '../types';

export const mockSignals: Signal[] = [
  {
    id: 'sig-1',
    type: 'milestone',
    priority: 'high',
    title: 'Phase 2 Design Review completed 2 days ahead',
    description: 'User interface designs approved by client stakeholders',
    source: 'PROJ-245',
    sourceId: 'PROJ-245',
    date: new Date('2026-02-26'),
    category: 'on-track',
    changed: true,
  },
  {
    id: 'sig-2',
    type: 'blocker',
    priority: 'high',
    title: 'Security clearance delays for 3 engineers',
    description: 'Awaiting final approval from gov security office',
    source: 'RISK-128',
    sourceId: 'RISK-128',
    date: new Date('2026-02-15'),
    category: 'blocked',
    daysOld: 14,
  },
  {
    id: 'sig-3',
    type: 'dependency',
    priority: 'medium',
    title: 'API integration with legacy system delayed',
    description: 'Vendor missed delivery date, new ETA March 15',
    source: 'DEP-089',
    sourceId: 'DEP-089',
    date: new Date('2026-02-28'),
    category: 'at-risk',
    changed: true,
  },
  {
    id: 'sig-4',
    type: 'change',
    priority: 'medium',
    title: 'Added 4 new accessibility requirements',
    description: 'Section 508 compliance scope expanded per client request',
    source: 'REQ-334',
    sourceId: 'REQ-334',
    date: new Date('2026-02-27'),
    category: 'at-risk',
    changed: true,
  },
  {
    id: 'sig-5',
    type: 'milestone',
    priority: 'high',
    title: 'Sprint 8 velocity increased to 42 points',
    description: 'Team delivered 15% above planned capacity',
    source: 'SPRINT-008',
    sourceId: 'SPRINT-008',
    date: new Date('2026-02-28'),
    category: 'on-track',
    changed: true,
  },
  {
    id: 'sig-6',
    type: 'blocker',
    priority: 'high',
    title: 'Budget approval needed for cloud infrastructure',
    description: 'Additional $45K required for Q2 AWS costs',
    source: 'FIN-092',
    sourceId: 'FIN-092',
    date: new Date('2026-02-20'),
    category: 'blocked',
    daysOld: 9,
  },
  {
    id: 'sig-7',
    type: 'change',
    priority: 'low',
    title: 'Team onboarded 2 new QA contractors',
    description: 'Testing capacity expanded for Phase 3',
    source: 'HR-156',
    sourceId: 'HR-156',
    date: new Date('2026-02-25'),
    category: 'on-track',
  },
  {
    id: 'sig-8',
    type: 'dependency',
    priority: 'medium',
    title: 'Client UAT environment not yet available',
    description: 'Waiting on network configuration from IT',
    source: 'DEP-091',
    sourceId: 'DEP-091',
    date: new Date('2026-02-24'),
    category: 'at-risk',
    daysOld: 5,
  },
];

export const currentBrief: StatusBrief = {
  id: 'brief-current',
  date: new Date('2026-03-01'),
  audience: 'client',
  overallStatus: 'Overall project status is YELLOW. Phase 2 design work completed ahead of schedule, but security clearance delays and vendor dependencies present risks to Phase 3 timeline.',
  sections: [
    {
      id: 'on-track',
      title: 'On Track',
      bullets: [
        {
          id: 'b1',
          text: 'Phase 2 Design Review completed 2 days ahead of schedule with client approval',
          sourceSignals: ['sig-1'],
          isNew: true,
        },
        {
          id: 'b2',
          text: 'Sprint velocity increased 15% - team delivered 42 story points',
          sourceSignals: ['sig-5'],
          isNew: true,
        },
        {
          id: 'b3',
          text: 'Expanded QA capacity with 2 additional contractors for Phase 3 testing',
          sourceSignals: ['sig-7'],
        },
      ],
    },
    {
      id: 'at-risk',
      title: 'At Risk',
      bullets: [
        {
          id: 'b4',
          text: 'Legacy API integration delayed - vendor revised ETA to March 15 (2-week slip)',
          sourceSignals: ['sig-3'],
          changedFromLast: true,
        },
        {
          id: 'b5',
          text: 'New Section 508 accessibility requirements added mid-sprint - may impact Phase 3 scope',
          sourceSignals: ['sig-4'],
          isNew: true,
        },
        {
          id: 'b6',
          text: 'Client UAT environment delayed 5 days awaiting network configuration',
          sourceSignals: ['sig-8'],
        },
      ],
    },
    {
      id: 'blocked',
      title: 'Blocked',
      bullets: [
        {
          id: 'b7',
          text: '3 engineers awaiting security clearance (14 days) - impacting staffing plan',
          sourceSignals: ['sig-2'],
          changedFromLast: true,
        },
        {
          id: 'b8',
          text: 'Q2 cloud infrastructure budget requires $45K approval before March 10',
          sourceSignals: ['sig-6'],
        },
      ],
    },
    {
      id: 'decisions',
      title: 'Decisions/Escalations',
      bullets: [
        {
          id: 'b9',
          text: 'Decision needed: Adjust Phase 3 timeline by 2 weeks OR descope non-critical features',
          sourceSignals: ['sig-2', 'sig-3'],
        },
        {
          id: 'b10',
          text: 'Escalation: Expedite security clearance processing through program office',
          sourceSignals: ['sig-2'],
        },
      ],
    },
    {
      id: 'next-week',
      title: 'Next Week Plan',
      bullets: [
        {
          id: 'b11',
          text: 'Begin Phase 3 development sprint planning',
          sourceSignals: [],
        },
        {
          id: 'b12',
          text: 'Conduct accessibility audit with new requirements',
          sourceSignals: ['sig-4'],
        },
        {
          id: 'b13',
          text: 'Finalize budget amendment request for infrastructure',
          sourceSignals: ['sig-6'],
        },
      ],
    },
  ],
};

export const previousBrief: StatusBrief = {
  id: 'brief-previous',
  date: new Date('2026-02-22'),
  audience: 'client',
  overallStatus: 'Overall project status is GREEN. Phase 2 design work on track. Some minor resource adjustments in progress.',
  sections: [
    {
      id: 'on-track',
      title: 'On Track',
      bullets: [
        {
          id: 'bp1',
          text: 'Phase 2 Design Review scheduled for Feb 28',
          sourceSignals: [],
        },
        {
          id: 'bp2',
          text: 'Sprint velocity stable at 38 story points',
          sourceSignals: [],
        },
      ],
    },
    {
      id: 'at-risk',
      title: 'At Risk',
      bullets: [
        {
          id: 'bp3',
          text: 'Legacy API integration on schedule with vendor',
          sourceSignals: [],
        },
      ],
    },
    {
      id: 'blocked',
      title: 'Blocked',
      bullets: [
        {
          id: 'bp4',
          text: '3 engineers awaiting security clearance (7 days)',
          sourceSignals: [],
        },
      ],
    },
    {
      id: 'decisions',
      title: 'Decisions/Escalations',
      bullets: [],
    },
    {
      id: 'next-week',
      title: 'Next Week Plan',
      bullets: [
        {
          id: 'bp5',
          text: 'Complete Phase 2 design review',
          sourceSignals: [],
        },
        {
          id: 'bp6',
          text: 'Begin Phase 3 planning',
          sourceSignals: [],
        },
      ],
    },
  ],
};
