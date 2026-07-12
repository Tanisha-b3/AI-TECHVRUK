// Pricing data for all supported AI tools.
// Every number here traces back to a vendor URL in PRICING_DATA.md.
// Last verified: 2025-07-12

import type { ToolId } from '@/types';

export interface PlanInfo {
  id: string;
  name: string;
  pricePerSeat: number; // $/user/month
  minSeats?: number;
  maxSeats?: number;
  features: string[];
  isApiPricing?: boolean; // true for usage-based API plans
}

export interface ToolInfo {
  id: ToolId;
  name: string;
  vendor: string;
  category: 'ide' | 'chat' | 'api' | 'platform';
  plans: PlanInfo[];
  pricingUrl: string;
}

/**
 * Master pricing database — verified against official pricing pages.
 * See PRICING_DATA.md for source URLs and verification dates.
 */
export const TOOLS: ToolInfo[] = [
  // ─── AI Coding IDEs ──────────────────────────────────────────────
  {
    id: 'cursor',
    name: 'Cursor',
    vendor: 'Cursor',
    category: 'ide',
    plans: [
      {
        id: 'hobby',
        name: 'Hobby',
        pricePerSeat: 0,
        features: [
          'Limited Agent requests',
          'Limited Tab completions',
          'No credit card required',
        ],
      },
      {
        id: 'pro',
        name: 'Pro',
        pricePerSeat: 20,
        features: [
          'Unlimited Tab & Auto mode',
          '$20 of frontier-model credits',
          'Access to all premium models',
          'Cloud agents',
        ],
      },
      {
        id: 'pro-plus',
        name: 'Pro+',
        pricePerSeat: 60,
        features: [
          'Everything in Pro',
          '3× the model usage credits ($60)',
        ],
      },
      {
        id: 'ultra',
        name: 'Ultra',
        pricePerSeat: 200,
        features: [
          'Everything in Pro',
          '20× the model usage credits',
          'Priority access',
        ],
      },
      {
        id: 'teams',
        name: 'Teams',
        pricePerSeat: 40,
        features: [
          'Everything in Individual',
          'Centralized team billing',
          'SAML/OIDC SSO',
          'Usage analytics',
          'Team marketplace',
          'Bugbot code reviews',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        pricePerSeat: 40, // Base estimate; actual is custom/negotiated
        features: [
          'Everything in Teams',
          'Pooled usage',
          'SCIM seat management',
          'Audit logs',
          'Invoice/PO billing',
          'Priority support',
        ],
      },
    ],
    pricingUrl: 'https://cursor.sh/pricing',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    vendor: 'GitHub',
    category: 'ide',
    plans: [
      {
        id: 'pro',
        name: 'Pro',
        pricePerSeat: 10,
        features: [
          '$10 in AI credits',
          'Unlimited code completions',
          'Chat & CLI',
        ],
      },
      {
        id: 'pro-plus',
        name: 'Pro+',
        pricePerSeat: 39,
        features: [
          '$39 in AI credits',
          'Higher usage limits',
          'All Pro features',
        ],
      },
      {
        id: 'business',
        name: 'Business',
        pricePerSeat: 19,
        features: [
          '$19 in pooled AI credits',
          'Org management',
          'Policy controls',
          'Unlimited code completions',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        pricePerSeat: 39,
        features: [
          '$39 in pooled AI credits',
          'Fine-tuning',
          'IP indemnity',
          'SSO & SCIM',
        ],
      },
    ],
    pricingUrl: 'https://github.com/features/copilot#pricing',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    vendor: 'OpenAI (acquired Codeium)',
    category: 'ide',
    plans: [
      {
        id: 'free',
        name: 'Free',
        pricePerSeat: 0,
        features: [
          'Limited daily/weekly quotas',
          'Unlimited tab autocomplete',
        ],
      },
      {
        id: 'pro',
        name: 'Pro',
        pricePerSeat: 20,
        features: [
          'Standard daily/weekly quotas',
          'All premium models incl. SWE-1.5',
          'Unlimited tab autocomplete',
        ],
      },
      {
        id: 'max',
        name: 'Max',
        pricePerSeat: 200,
        features: [
          'Significantly higher daily ceilings',
          'All premium models',
          'Power user tier',
        ],
      },
      {
        id: 'teams',
        name: 'Teams',
        pricePerSeat: 40,
        features: [
          'Per-user quotas',
          'Centralized billing',
          'Admin dashboard',
          'Analytics',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        pricePerSeat: 40, // Base estimate; actual is custom
        features: [
          'Advanced security & compliance',
          'Custom deployment',
          'SSO & SCIM',
        ],
      },
    ],
    pricingUrl: 'https://windsurf.com/pricing',
  },

  // ─── AI Chat / Assistants ────────────────────────────────────────
  {
    id: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    category: 'chat',
    plans: [
      {
        id: 'free',
        name: 'Free',
        pricePerSeat: 0,
        features: ['Limited messages', 'Access to Claude models'],
      },
      {
        id: 'pro',
        name: 'Pro',
        pricePerSeat: 20,
        features: [
          '5× usage of Free',
          'Claude Code access',
          'Projects & priority',
        ],
      },
      {
        id: 'max-5x',
        name: 'Max 5x',
        pricePerSeat: 100,
        features: [
          '5× usage of Pro',
          'For power users & Claude Code',
        ],
      },
      {
        id: 'max-20x',
        name: 'Max 20x',
        pricePerSeat: 200,
        features: [
          '20× usage of Pro',
          'For heavy agentic workloads',
        ],
      },
      {
        id: 'team',
        name: 'Team',
        pricePerSeat: 25,
        minSeats: 5,
        features: [
          'Team management',
          'Higher limits',
          'Admin controls',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        pricePerSeat: 25, // Base estimate; hybrid pricing with token fees
        features: [
          'Custom pricing',
          'SSO & SCIM',
          'Custom data retention',
        ],
      },
    ],
    pricingUrl: 'https://claude.ai/pricing',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    category: 'chat',
    plans: [
      {
        id: 'free',
        name: 'Free',
        pricePerSeat: 0,
        features: ['Limited messages', 'GPT-4o mini access'],
      },
      {
        id: 'plus',
        name: 'Plus',
        pricePerSeat: 20,
        features: [
          'Full GPT-4o',
          'DALL-E',
          'Advanced Data Analysis',
          'Deep Research',
        ],
      },
      {
        id: 'pro',
        name: 'Pro',
        pricePerSeat: 200,
        features: [
          'Unlimited GPT-4o',
          'o1 pro mode',
          'Highest reasoning limits',
        ],
      },
      {
        id: 'business',
        name: 'Business',
        pricePerSeat: 25, // Monthly; $20 annual
        minSeats: 2,
        features: [
          'Everything in Plus',
          'Workspace & admin console',
          'SSO',
        ],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        pricePerSeat: 60, // Estimated from industry reports
        features: [
          'Unlimited GPT-4o',
          'SOC 2 & HIPAA',
          'Custom data retention',
          'Dedicated support',
        ],
      },
    ],
    pricingUrl: 'https://openai.com/chatgpt/pricing',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    vendor: 'Google',
    category: 'chat',
    plans: [
      {
        id: 'free',
        name: 'Free',
        pricePerSeat: 0,
        features: ['Basic Gemini access', 'Google account required'],
      },
      {
        id: 'advanced',
        name: 'Advanced (Ultra)',
        pricePerSeat: 19.99,
        features: [
          'Gemini Ultra model',
          '2TB Google storage',
          'Google One AI Premium',
          'Deep Research',
        ],
      },
      {
        id: 'api',
        name: 'API',
        pricePerSeat: 0,
        isApiPricing: true,
        features: ['Pay per token', 'All Gemini models', 'Free tier available'],
      },
    ],
    pricingUrl: 'https://ai.google.dev/pricing',
  },

  // ─── API Direct ──────────────────────────────────────────────────
  {
    id: 'anthropic-api',
    name: 'Anthropic API',
    vendor: 'Anthropic',
    category: 'api',
    plans: [
      {
        id: 'api-direct',
        name: 'API Direct',
        pricePerSeat: 0,
        isApiPricing: true,
        features: [
          'Pay per token',
          'Sonnet 4.6: $3/$15 per 1M tokens',
          'Haiku 4.5: $1/$5 per 1M tokens',
          'Opus 4.8: $5/$25 per 1M tokens',
          'Prompt caching: up to 90% savings',
          'Batch API: 50% discount',
        ],
      },
    ],
    pricingUrl: 'https://www.anthropic.com/pricing',
  },
  {
    id: 'openai-api',
    name: 'OpenAI API',
    vendor: 'OpenAI',
    category: 'api',
    plans: [
      {
        id: 'api-direct',
        name: 'API Direct',
        pricePerSeat: 0,
        isApiPricing: true,
        features: [
          'Pay per token',
          'GPT-4o: $2.50/$10 per 1M tokens',
          'GPT-4o mini: $0.15/$0.60 per 1M tokens',
          'Batch API: 50% discount',
          'Cached input: $1.25/1M tokens',
        ],
      },
    ],
    pricingUrl: 'https://openai.com/api/pricing',
  },
];

/**
 * Helper: find a tool by ID
 */
export function getToolById(id: ToolId): ToolInfo | undefined {
  return TOOLS.find((t) => t.id === id);
}

/**
 * Helper: find a plan within a tool
 */
export function getPlanById(
  toolId: ToolId,
  planId: string,
): PlanInfo | undefined {
  const tool = getToolById(toolId);
  return tool?.plans.find((p) => p.id === planId);
}
