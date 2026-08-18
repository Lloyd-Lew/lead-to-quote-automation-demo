import type { LeadInput, Qualification, Recommendation, QuoteBrief } from "./types.js";

const SERVICE_NAMES: Record<LeadInput["interest"], string> = {
  crm: "CRM Foundation",
  automation: "Workflow Automation System",
  integration: "Connected Operations System",
  "ai-operations": "AI-Enabled Operations Assessment",
};

export function qualifyLead(lead: LeadInput): Qualification {
  const rationale: string[] = [];
  let score = 0;
  if (lead.monthlyBudgetUsd >= 3000) {
    score += 30;
    rationale.push("Budget supports a focused systems engagement.");
  } else if (lead.monthlyBudgetUsd >= 1200) {
    score += 20;
    rationale.push("Budget supports a discovery-led or phased engagement.");
  } else {
    score += 8;
    rationale.push("Budget indicates a lighter discovery or nurture path.");
  }
  if (lead.urgencyDays <= 14) {
    score += 25;
    rationale.push("The stated timeline needs rapid qualification.");
  } else if (lead.urgencyDays <= 45) {
    score += 18;
    rationale.push("The timeline is suitable for planned discovery.");
  } else {
    score += 10;
    rationale.push("The timeline supports nurture and structured preparation.");
  }
  if (lead.teamSize >= 10) {
    score += 20;
    rationale.push("The team size suggests multi-person workflow impact.");
  } else {
    score += 12;
    rationale.push("The team size suggests a focused owner-led workflow.");
  }
  if (lead.currentChallenge.length >= 80) {
    score += 15;
    rationale.push("The problem statement contains useful discovery context.");
  } else {
    score += 7;
    rationale.push("The problem statement needs further discovery context.");
  }
  score += 10;
  rationale.push(`The requested area maps to ${SERVICE_NAMES[lead.interest]}.`);
  return {
    score,
    tier: score >= 75 ? "priority" : score >= 50 ? "qualified" : "nurture",
    rationale,
  };
}

export function recommendNextAction(qualification: Qualification): Recommendation {
  if (qualification.tier === "priority")
    return {
      nextAction:
        "Offer a strategy call with a solutions lead and prepare a scoped discovery agenda.",
      owner: "solutions",
      targetResponseHours: 4,
    };
  if (qualification.tier === "qualified")
    return {
      nextAction: "Send the Operational Bottleneck Brief and offer a strategy call after review.",
      owner: "sales",
      targetResponseHours: 24,
    };
  return {
    nextAction: "Send a relevant delivery pattern and invite stronger problem context.",
    owner: "sales",
    targetResponseHours: 72,
  };
}

export function buildQuoteBrief(lead: LeadInput, qualification: Qualification): QuoteBrief {
  return {
    engagement: SERVICE_NAMES[lead.interest],
    scopeSignals: [
      `Team size: ${lead.teamSize}`,
      `Urgency: ${lead.urgencyDays} days`,
      `Qualification tier: ${qualification.tier}`,
      `Requested area: ${lead.interest}`,
    ],
    discoveryQuestions: [
      "Which system currently owns the source of truth?",
      "Where does the handoff create delay, rework, or loss of visibility?",
      "Which business measure must improve for this work to be successful?",
    ],
  };
}
