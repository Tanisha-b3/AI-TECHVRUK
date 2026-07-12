// Type definitions for AI tools, plans, pricing tiers, and audit results.
// Central source of truth for all data shapes used across the app.

/** Supported AI tools */
export type ToolId =
  | 'cursor'
  | 'github-copilot'
  | 'claude'
  | 'chatgpt'
  | 'anthropic-api'
  | 'openai-api'
  | 'gemini'
  | 'windsurf';

/** Primary use case for the team */
export type UseCase = 'coding' | 'writing' | 'data' | 'research' | 'mixed';

/** A single tool entry in the spend form */
export interface ToolEntry {
  toolId: ToolId;
  planId: string;
  monthlyCost: number;
  seats: number;
}

/** The full spend form input */
export interface SpendInput {
  tools: ToolEntry[];
  teamSize: number;
  useCase: UseCase;
}

/** Recommendation type for each tool */
export type RecommendationType =
  | 'downgrade' // Same vendor, cheaper plan
  | 'switch' // Different vendor, cheaper alternative
  | 'optimal' // Already on the best plan
  | 'credits'; // Switch from subscription to API credits

/** Audit result for a single tool */
export interface ToolAuditResult {
  toolId: ToolId;
  currentPlan: string;
  currentMonthlyCost: number;
  recommendationType: RecommendationType;
  recommendedAction: string;
  recommendedPlan?: string;
  recommendedTool?: ToolId;
  monthlySavings: number;
  reason: string;
}

/** Full audit result */
export interface AuditResult {
  id: string;
  createdAt: string;
  input: SpendInput;
  toolResults: ToolAuditResult[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  aiSummary?: string;
}

/** Lead capture data */
export interface LeadData {
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  auditId: string;
}
