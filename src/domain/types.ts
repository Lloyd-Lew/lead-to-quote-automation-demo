export type InterestArea = "crm" | "automation" | "integration" | "ai-operations";

export interface LeadInput {
  fullName: string;
  email: string;
  company: string;
  teamSize: number;
  monthlyBudgetUsd: number;
  urgencyDays: number;
  interest: InterestArea;
  currentChallenge: string;
}
export type LeadTier = "priority" | "qualified" | "nurture";
export interface Qualification {
  score: number;
  tier: LeadTier;
  rationale: string[];
}
export interface CrmRecord {
  id: string;
  createdAt: string;
  lead: LeadInput;
  qualification: Qualification;
}
export interface Recommendation {
  nextAction: string;
  owner: "sales" | "solutions";
  targetResponseHours: number;
}
export interface QuoteBrief {
  engagement: string;
  scopeSignals: string[];
  discoveryQuestions: string[];
}
export interface LeadWorkflowResult {
  record: CrmRecord;
  recommendation: Recommendation;
  quoteBrief: QuoteBrief;
  auditEventId: string;
}
