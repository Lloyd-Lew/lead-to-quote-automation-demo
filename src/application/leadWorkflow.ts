import type { CrmAdapter } from "../adapters/crmAdapter.js";
import { buildQuoteBrief, qualifyLead, recommendNextAction } from "../domain/qualification.js";
import type { LeadInput, LeadWorkflowResult } from "../domain/types.js";
import type { AuditWriter } from "../logging/auditLogger.js";

export class LeadWorkflow {
  constructor(
    private readonly crm: CrmAdapter,
    private readonly audit: AuditWriter,
  ) {}
  async run(lead: LeadInput): Promise<LeadWorkflowResult> {
    const qualification = qualifyLead(lead);
    const record = await this.crm.createLead(lead, qualification);
    const recommendation = recommendNextAction(qualification);
    const quoteBrief = buildQuoteBrief(lead, qualification);
    const auditEventId = this.audit.write("lead.qualified", {
      crmRecordId: record.id,
      qualificationTier: qualification.tier,
      score: qualification.score,
      requestedArea: lead.interest,
      containsCustomerData: false,
    });
    return { record, recommendation, quoteBrief, auditEventId };
  }
}
