import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/api/app.js";

describe("Lead-to-Quote API smoke and API tests", () => {
  it("starts and reports healthy", async () => {
    const response = await request(createApp()).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok", service: "lead-to-quote-automation-demo" });
  });
  it("processes a valid synthetic lead through the primary workflow", async () => {
    const response = await request(createApp()).post("/v1/leads").send({
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
    expect(response.status).toBe(201);
    expect(response.body.record.id).toMatch(/^crm_/);
    expect(response.body.recommendation.owner).toBe("solutions");
    expect(response.body.quoteBrief.engagement).toBe("Workflow Automation System");
  });
  it("rejects invalid payloads without disclosing internal details", async () => {
    const response = await request(createApp()).post("/v1/leads").send({ fullName: "A" });
    expect(response.status).toBe(422);
    expect(response.body).toEqual({
      error: "validation_failed",
      message: "Lead payload is invalid.",
    });
  });
});
