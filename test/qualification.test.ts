import { describe, expect, it } from "vitest";
import { qualifyLead, recommendNextAction } from "../src/domain/qualification.js";

describe("qualification engine", () => {
  it("prioritizes a well-funded, urgent, well-described lead", () => {
    const qualification = qualifyLead({
      fullName: "Avery Singh",
      email: "avery.singh@example.test",
      company: "Northstar Advisory",
      teamSize: 22,
      monthlyBudgetUsd: 5000,
      urgencyDays: 10,
      interest: "automation",
      currentChallenge:
        "Lead follow-up, quoting, and handoffs are split across email and spreadsheets, so the team lacks visibility and spends too much time copying data.",
    });
    expect(qualification).toMatchObject({ tier: "priority" });
    expect(qualification.score).toBeGreaterThanOrEqual(75);
    expect(recommendNextAction(qualification).targetResponseHours).toBe(4);
  });
  it("routes low-context leads to a nurture path", () => {
    const qualification = qualifyLead({
      fullName: "Jamie Lee",
      email: "jamie.lee@example.test",
      company: "Harbor Studio",
      teamSize: 3,
      monthlyBudgetUsd: 500,
      urgencyDays: 90,
      interest: "crm",
      currentChallenge: "We need a better sales process for our small team.",
    });
    expect(qualification.tier).toBe("nurture");
    expect(recommendNextAction(qualification).targetResponseHours).toBe(72);
  });
});
