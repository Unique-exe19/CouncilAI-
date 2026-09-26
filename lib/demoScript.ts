import { ExecutiveReport } from "./schema";

export interface DemoScriptMessage {
  agentId: "CEO" | "CFO" | "CTO" | "CMO";
  round: 1 | 2 | 3;
  text: string;
}

export interface DemoScript {
  decision: string;
  messages: DemoScriptMessage[];
  report: ExecutiveReport;
}

export const DEMO_SCRIPTS: Record<string, DemoScript> = {
  default: {
    decision: "Should we transition our B2B SaaS from a freemium model to a 14-day free trial with mandatory credit card upfront?",
    messages: [
      // Round 1
      {
        agentId: "CEO",
        round: 1,
        text: "Team, free tier users consume 60% (assumption) of infrastructure while contributing zero ARR. Transitioning to a 14-day trial with mandatory upfront credit card captures high-intent buyers and accelerates our Series B metrics. We must filter out tire-kickers now.",
      },
      {
        agentId: "CFO",
        round: 1,
        text: "Victoria, financially this is risky. 10,000 signups (assumption) × 2.1% conversion (assumption) × $100 price (assumption) = $21,000 ARR (assumption). Under mandatory cards, signups drop by 75% (assumption) to 2,500 × 12% conversion × $100 price = $30,000 ARR, but CAC spikes to $350 (assumption) stretching payback to 14 months (assumption).",
      },
      {
        agentId: "CTO",
        round: 1,
        text: "From engineering, eliminating free tier reduces DB read load by 40% (assumption). However, building Stripe credit card pre-authorization and automated trial expiration workflows will consume 3 engineering sprints (assumption).",
      },
      {
        agentId: "CMO",
        round: 1,
        text: "I strongly oppose mandatory credit cards upfront, Victoria! Our organic acquisition depends on product virality. Mandatory upfront cards destroy referral loops and hand market share to competitors.",
      },

      // Round 2
      {
        agentId: "CEO",
        round: 2,
        text: "Marcus, market share without revenue is a vanity metric. Arthur, your CAC fears assume marketing stays static — we can reallocate $15,000/month (assumption) in server savings directly into targeted LinkedIn acquisition campaigns.",
      },
      {
        agentId: "CFO",
        round: 2,
        text: "Victoria, reallocating $15,000 (assumption) server savings only buys 50 qualified leads (assumption). My math: 50 leads × 10% conversion × $100 price = $500 ARR (assumption) — insufficient. Elena, can we instead gate premium AI features while preserving basic free tier?",
      },
      {
        agentId: "CTO",
        round: 2,
        text: "Arthur, feature-gating is easier to build. 10,000 users (assumption) × 5% feature upgrade (assumption) × $100 price = $50,000 ARR (assumption). We can deploy role-based rate limits in 1 sprint (assumption) with zero billing bugs.",
      },
      {
        agentId: "CMO",
        round: 2,
        text: "Exactly, Elena! Because Elena introduced the 1-sprint rate-limiting data point (assumption), I agree that feature-gating keeps top-of-funnel intact while driving 3x higher (assumption) feature engagement.",
      },

      // Round 3
      {
        agentId: "CEO",
        round: 3,
        text: "Conditional on original proposal: I prefer mandatory upfront cards for maximum ARR speed, but because Arthur proved CAC payback extends to 14 months (assumption), I accept a compromise: keep free tier but enforce 14-day card-free Pro trial.",
      },
      {
        agentId: "CFO",
        round: 3,
        text: "Conditional on original proposal: I oppose mandatory upfront cards due to cash burn. My math: 10,000 signups (assumption) × 5% conversion (assumption) × $100 price (assumption) = $50,000 ARR (assumption). I support the hybrid compromise only if CAC payback stays under 6 months (assumption).",
      },
      {
        agentId: "CTO",
        round: 3,
        text: "Support on original proposal: Engineering can build card pre-auth, but because Arthur showed payback risks, shipping feature-gating in Sprint 14 (assumption) is far safer for system stability.",
      },
      {
        agentId: "CMO",
        round: 3,
        text: "Oppose on original proposal: Mandatory credit card upfront destroys top-of-funnel acquisition. I advocate for the 14-day credit-card-free Pro trial alternative to preserve viral growth loops.",
      },
    ],
    report: {
      decisionSummary: "Transition from permanent free tier to a hybrid model with a 14-day friction-free Pro trial and usage-based caps.",
      verdict: "Conditional Go",
      confidenceScore: 88,
      consensusSummary: "The executive team unanimously agreed on a hybrid compromise: avoid upfront credit cards to safeguard organic viral acquisition (CMO concern), while capping free-tier infrastructure consumption and gating high-value AI features behind a 14-day trial (CFO & CTO alignment).",
      pros: [
        "Preserves top-of-funnel user signup velocity and organic viral growth loops",
        "Reduces infrastructure server costs by ~35% via feature usage limits",
        "Fast 1-sprint implementation timeline without complex Stripe pre-auth logic",
        "Creates a clear value-based upgrade trigger for high-intent B2B accounts",
      ],
      cons: [
        "Requires ongoing automated email nurturing to convert trial users",
        "Does not completely eliminate free-tier support overhead",
      ],
      risks: [
        {
          risk: "User friction if free tier caps are set too aggressively",
          severity: "Medium",
          mitigation: "Set soft usage warnings at 80% usage with 1-click trial activation",
        },
        {
          risk: "Competitors capitalizing on paid trial confusion",
          severity: "Low",
          mitigation: "Transparent pricing table highlighting no-credit-card requirement",
        },
      ],
      agentStances: [
        { agent: "CEO", stance: "Conditional", keyPoint: "Agreed to compromise on no credit card upfront if ARR converts within 60 days." },
        { agent: "CFO", stance: "Support", keyPoint: "Protects gross margin and keeps customer payback period under 6 months." },
        { agent: "CTO", stance: "Support", keyPoint: "Can ship feature-gated trial architecture in 1 sprint with zero tech debt." },
        { agent: "CMO", stance: "Support", keyPoint: "Maintains high top-of-funnel acquisition while introducing natural Pro upgrade triggers." },
      ],
      actionItems: [
        { task: "Design Pro trial gating UI & upgrade banners", owner: "CMO", timeline: "3 Days", priority: "High" },
        { task: "Implement feature-rate-limiting in API gateway", owner: "CTO", timeline: "1 Week", priority: "High" },
        { task: "Setup conversion tracking analytics & Stripe trial hooks", owner: "CFO", timeline: "5 Days", priority: "Medium" },
        { task: "Review 60-day ARR lift and cohort conversion numbers", owner: "CEO", timeline: "60 Days", priority: "Medium" },
      ],
      nextStep: "Kick off Sprint 14 to build the friction-free 14-day Pro trial gating with soft usage caps.",
    },
  },
};
