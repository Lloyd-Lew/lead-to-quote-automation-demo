import { describe, expect, it, vi } from "vitest";
import { InMemoryCrmAdapter } from "../src/adapters/crmAdapter.js";
import { LeadWorkflow } from "../src/application/leadWorkflow.js";
import type { AuditWriter } from "../src/logging/auditLogger.js";

describe("lead workflow integration", () => {
  it("creates a CRM-style record, recommendation, quote brief, and audit event", async () => {
    const audit: AuditWriter = { write: vi.fn(() => "audit_test_123") };
    const result = await new LeadWorkflow(new InMemoryCrmAdapter(), audit).run({
      fullName: "Morgan Taylor",
      email: "morgan.taylor@example.test",
      company: "Signalworks Services",
      teamSize: 14,
      monthlyBudgetUsd: 2500,
      urgencyDays: 30,
      interest: "integration",
      currentChallenge:
        "Customer details and delivery updates are repeatedly copied between systems, creating errors and delayed management reporting.",
    });
    expect(result.record.id).toMatch(/^crm_/);
    expect(result.quoteBrief.engagement).toBe("Connected Operations System");
    expect(result.auditEventId).toBe("audit_test_123");
    expect(audit.write).toHaveBeenCalledWith(
      "lead.qualified",
      expect.objectContaining({ containsCustomerData: false, requestedArea: "integration" }),
    );
  });
});
