export type LeadStage = 'NEW' | 'CONTACTED' | 'PROPOSAL_SENT' | 'NEGOTIATION' | 'WON' | 'LOST';

export type TagColor = 'blue' | 'emerald' | 'amber' | 'rose' | 'purple';

export interface LeadTag {
  id: string;
  label: string;
  color: TagColor;
}

export type AiProposalStatus = 'NONE' | 'GENERATING' | 'READY' | 'SENT';

export interface LeadOpportunity {
  id: string;
  coupleNames: string;
  weddingDate: string;
  guestCount: number;
  budgetEstimated: number;
  stage: LeadStage;
  tags: LeadTag[];
  aiProposalStatus: AiProposalStatus;
  lastActivityAt: string;
  assignedToAvatar?: string;
  notesCount: number;
}

export interface KanbanColumnConfig {
  id: LeadStage;
  title: string;
  colorLine: string;
}